
interface VehicleTypeOption {
    value: string;
    label: string;
    emissionFactor: number; // kg of CO2 per km
  }
  
  
   const vehicleTypes:VehicleTypeOption[] = [
     {
     value:"petrol-car",
       label:"Petrol Car",
        emissionFactor:0.23
     },
   {
      value:"cng-car",
     label: "CNG Car",
       emissionFactor: 0.19
   },
  {
     value:"diesel-car",
       label:"Diesel Car",
      emissionFactor:0.26,
    },
   {
       value:"electric-car",
    label:"Electric Car",
      emissionFactor:0.05
   }
  ]
  
  
  export { vehicleTypes, type VehicleTypeOption};