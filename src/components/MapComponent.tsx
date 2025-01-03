import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shield, Clock, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

// Replace with your OpenRouteService API key
const API_KEY = "5b3ce3597851110001cf6248087ac78e101c4b1187a924a3a28f5bcd";

interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <Shield className="h-8 w-8" />,
        title: "Safety first",
        description: "Your safety is important to us. That's why we have multiple safety features in place for riders and drivers."
    },
    {
        icon: <Clock className="h-8 w-8" />,
        title: "Always on time",
        description: "Need to be somewhere? Count on Uber to pick you up in minutes, any time of day."
    },
    {
        icon: <MapPin className="h-8 w-8" />,
        title: "Go anywhere",
        description: "Tap a button, get a ride. Available worldwide in 10,000+ cities."
    }
];

interface MapComponentProps { }

const MapComponent: React.FC<MapComponentProps> = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<L.Map | null>(null);
    const [selectedStartSuggestion, setSelectedStartSuggestion] = useState<string | null>(null);
    const [selectedEndSuggestion, setSelectedEndSuggestion] = useState<string | null>(null);
    const [startMarker, setStartMarker] = useState<L.Marker | null>(null);
    const [endMarker, setEndMarker] = useState<L.Marker | null>(null);
    const mapInitialized = useRef(false);

      const handleMapClick = useCallback (async (e: L.LeafletMouseEvent) => {
        if(!map) return;
          const latlng = e.latlng;
            try {
              const geocodeUrl = `https://api.openrouteservice.org/geocode/reverse?api_key=${API_KEY}&point.lon=${latlng.lng}&point.lat=${latlng.lat}`;
                const response = await fetch(geocodeUrl);
                 if(!response.ok){
                      throw new Error(`HTTP error! status: ${response.status}`)
                    }
                  const data = await response.json();
                  if (data.features && data.features.length > 0) {
                   const locationLabel = data.features[0].properties.label;
                      const startInput = document.getElementById('start') as HTMLInputElement;
                      const endInput = document.getElementById('end')as HTMLInputElement;

                      if (!startInput.value) {
                            startInput.value = locationLabel;
                          setSelectedStartSuggestion(locationLabel);
                          } else if(!endInput.value){
                                endInput.value = locationLabel;
                            setSelectedEndSuggestion(locationLabel);
                            }
                    }

                } catch (error) {
                console.error("Error reverse geocoding:", error);
             }
        },[map]);



    useEffect(() => {

            if (mapContainerRef.current && !mapInitialized.current) {

                const newMap = L.map(mapContainerRef.current, { preferCanvas: true }).setView([0, 0], 2); // Initialize the map once
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(newMap);


                  setMap(newMap);

              mapInitialized.current = true;
                 newMap.on('click',handleMapClick)
         }

         return () => {
            if (map) {
               map.off('click',handleMapClick);
                map.remove();
               setMap(null)
               mapInitialized.current = false;


            }

          }
      // eslint-disable-next-line
      },[handleMapClick]);


    const findRoute = async () => {
        const startInput = document.getElementById('start') as HTMLInputElement;
        const endInput = document.getElementById('end') as HTMLInputElement;
        const start = selectedStartSuggestion || startInput.value;
        const end = selectedEndSuggestion || endInput.value;
        const transport = document.getElementById('transport') as HTMLSelectElement;
        const errorDisplay = document.getElementById('errorDisplay') as HTMLDivElement;
        const routeDetails = document.getElementById('route-details') as HTMLDivElement;
        const co2EmissionDisplay = document.getElementById('co2-emission') as HTMLDivElement;

        errorDisplay.textContent = '';
        routeDetails.classList.add('hidden');
        co2EmissionDisplay.classList.add('hidden');

        if (!start || !end) {
            errorDisplay.textContent = "Please enter both start and end locations.";
            return;
        }

        try {
            const startCoords = await getCoordinates(start);
            const endCoords = await getCoordinates(end);

            const url = `https://api.openrouteservice.org/v2/directions/${transport.value}?api_key=${API_KEY}&start=${startCoords[0]},${startCoords[1]}&end=${endCoords[0]},${endCoords[1]}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                displayRoute(data, transport.value);
                displayRouteDetails(data, transport.value);
                calculateAndDisplayCo2Emission(data, transport.value);
                routeDetails.classList.remove('hidden');
                co2EmissionDisplay.classList.remove('hidden');
            }
            else {
                errorDisplay.textContent = "Could not find route between locations.";
            }
        } catch (error) {
            console.error("Error fetching route:", error);
            errorDisplay.textContent = "An error occurred while fetching the route.";
        }
        setSelectedStartSuggestion(null);
        setSelectedEndSuggestion(null);
    }


    const getCoordinates = async (location: string): Promise<number[]> => {
        const geocodingUrl = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${location}`;
        const response = await fetch(geocodingUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            return coordinates;
        } else {
            throw new Error("Location not found!");
        }
    }


    const displayRoute = useCallback( (data: any, transport: string) => {
          if (!map) return;
            const routeCoords = data.features[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
               map.eachLayer(layer => {
                   if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                   map.removeLayer(layer);
             }
          });
       L.polyline(routeCoords, { color: 'blue' }).addTo(map);
        map.fitBounds(L.polyline(routeCoords).getBounds(), { padding: [50, 50] });

            const start = routeCoords[0];
            const end = routeCoords[routeCoords.length - 1];


             if (startMarker) {
                  map.removeLayer(startMarker);
               }
             if (endMarker) {
                map.removeLayer(endMarker);
            }
      setStartMarker(L.marker(start).addTo(map).bindPopup('<b>Start Location</b>').openPopup());
       setEndMarker(L.marker(end).addTo(map).bindPopup('<b>End Location</b>').openPopup());
         }, [map, startMarker, endMarker]
      );



    const formatDistance = (distanceInMeters: number): string => {
        const distanceInKm = distanceInMeters / 1000;
        return `${distanceInKm.toFixed(2)} km`;
    }

    const formatDuration = (durationInSeconds: number): string => {
        const durationInMinutes = Math.round(durationInSeconds / 60);
        return `${durationInMinutes} minutes`;
    }


    const displayRouteDetails = (data: any, transport: string) => {
        const routeDetailsDiv = document.getElementById('route-details') as HTMLDivElement;
        const distance = data.features[0].properties.summary.distance;
        const duration = data.features[0].properties.summary.duration;

        routeDetailsDiv.innerHTML = `
            <h3>Route Details:</h3>
            <p><strong>Distance:</strong> ${formatDistance(distance)}</p>
            <p><strong>Duration:</strong> ${formatDuration(duration)}</p>
            <p><strong>Mode:</strong> ${transport}</p>
        `;
    }

    const calculateAndDisplayCo2Emission = (data: any, transport: string) => {
        const co2EmissionDiv = document.getElementById('co2-emission') as HTMLDivElement;
        const distance = data.features[0].properties.summary.distance;
        const emissionFactor = getEmissionFactor(transport);
        const emission = (distance / 1000) * emissionFactor;
        co2EmissionDiv.innerHTML = `
            <h3>Co2 Emission:</h3>
            <p><strong>Estimated CO2 Emission:</strong> ${emission.toFixed(2)} kg</p>
        `;
    }

    const getEmissionFactor = (transport: string): number => {
        switch (transport) {
            case "driving-car":
                return 0.2;
            case "cycling-regular":
                return 0.00;
            case "foot-walking":
                return 0.0;
            default:
                return 0.0;
        }
    }


     const autocomplete = useCallback( async (inputElement: HTMLInputElement, type: string) => {
        const inputValue = inputElement.value;
           const datalistId = `${type}-suggestions`;
           const datalist = document.getElementById(datalistId) as HTMLDataListElement;


            if (!inputValue) {
               datalist.innerHTML = '';
              return;
              }
            try {
            const geocodingUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${API_KEY}&text=${inputValue}`;
                const response = await fetch(geocodingUrl);
              if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                 }
               const data = await response.json();
            datalist.innerHTML = '';
           if (data.features) {
               data.features.forEach((feature: any) => {
                   const option = document.createElement('option');
                     option.value = feature.properties.label;
                   option.textContent = feature.properties.label;
                     option.addEventListener('click', () => {
                      if (type === 'start') {
                          setSelectedStartSuggestion(feature.properties.label);
                     } else if (type === 'end') {
                       setSelectedEndSuggestion(feature.properties.label);
                            }
                   inputElement.value = feature.properties.label;
                 datalist.innerHTML = '';
                       })
                datalist.appendChild(option)
                   });
              }
        } catch(error){
                console.error("Error fetching autocomplete suggestions:", error);
         }
        },[])

    const handleEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>, type: string) => {
        if (event.key === "Enter") {
            const datalistId = `${type}-suggestions`;
             const datalist = document.getElementById(datalistId) as HTMLDataListElement;
                const inputElement = document.getElementById(type) as HTMLInputElement;
             const firstOption = datalist?.querySelector('option');

                if (firstOption) {
                   firstOption.click();
                     event.preventDefault();
               }
            }
          },[])



    return (
        
        <div className="container">
            <br>
            </br>
              <div className="header">
                    <h1>Fastest Route Finder</h1>
                   
                <div className="input-container">
                  <div className="input-group">
                    <label htmlFor="start">Start Location:</label>
                        <input type="text" id="start" placeholder="Enter start location" list="start-suggestions" onInput={(e) => autocomplete(e.target as HTMLInputElement, 'start')} onKeyDown={(e) => handleEnter(e, 'start')} />
                        <datalist id="start-suggestions"></datalist>
                  </div>
                   <div className="input-group">
                     <label htmlFor="end">End Location:</label>
                        <input type="text" id="end" placeholder="Enter end location" list="end-suggestions" onInput={(e) => autocomplete(e.target as HTMLInputElement, 'end')} onKeyDown={(e) => handleEnter(e, 'end')} />
                        <datalist id="end-suggestions"></datalist>
                    </div>
                   <div className="input-group">
                     <label htmlFor="transport">Mode of Transport:</label>
                        <select id="transport">
                         <option value="driving-car">Car</option>
                           <option value="foot-walking">Walking</option>
                       <option value="cycling-regular">Cycling</option>
                         </select>
                    </div>
                      <button onClick={findRoute}>Find Route</button>
                  </div>
           </div>

                 <div className="map-results">
                 <div id="map" ref={mapContainerRef} style={{ height: "500px" }} ></div>
                 <div className="results">
                      <div className="error" id="errorDisplay"></div>
                   <div id="route-details" className="hidden"></div>
                        <div id="co2-emission" className="hidden"></div>
                  </div>
                </div>
       </div>
    );
};

export default MapComponent;