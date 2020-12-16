const INTIAL_STATE = {
  category: "",
 
};
const filterReducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case "TOGGLE_FILTER":
      return {
        ...state,
        category: filterCategories(actions.payload, state.category),
      };
   
  
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

export default filterReducer;
