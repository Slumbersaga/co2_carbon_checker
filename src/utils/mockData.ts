export const mockRideData = {
  categories: [
    {
      id: "mini",
      display_name: "Mini",
      estimate_fare_range: { minimum: 350, maximum: 400 },
      eta: 4,
      distance: 12.5,
      surge_multiplier: 1,
      image_url: "mini"
    },
    {
      id: "sedan",
      display_name: "Prime Sedan",
      estimate_fare_range: { minimum: 450, maximum: 500 },
      eta: 6,
      distance: 12.5,
      surge_multiplier: 1.2,
      image_url: "sedan"
    },
    {
      id: "suv",
      display_name: "Prime SUV",
      estimate_fare_range: { minimum: 650, maximum: 700 },
      eta: 8,
      distance: 12.5,
      surge_multiplier: 1,
      image_url: "suv"
    }
  ],
  status: "success"
};