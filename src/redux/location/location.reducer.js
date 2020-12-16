const INTIAL_STATE = {
  geolocation: {
    city: "Sfax",
    country: "Tunisia",
    isoCountryCode: "TN",
    name: "Immeuble ibn kholdoun",
    postalCode: "3027",
    region: "Sfax",
    street: "Avenue de la liberté",
  },
  location: { latitude: 34.740368, longitude: 10.74305 },
};
const locationReducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case "LOCATION_FILTER":
      return actions.payload;

    default:
      return state;
  }
};

const filterCategories = (category, previousCategory) => {
  if (previousCategory != category) {
    return category;
  }
  return "";
};

export default locationReducer;
