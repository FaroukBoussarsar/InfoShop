const INTIAL_STATE = {
    
    livraison: false,
    emporter: false,
    opened: false,
  };
  const toggleReducer = (state = INTIAL_STATE, actions) => {
    switch (actions.type) {
      case "TOGGLE_OPTIONS":
        return actions.payload;
     
    
      default:
        return state;
    }
  };
  
  
  const filterCategories = (category, previousCategory) => {
    if (previousCategory.livraison != category.livraison) {
      return category;
    }
    else if (previousCategory.emporter != category.emporter) {
      return category;
    }
    else if (previousCategory.opened != category.opened) {
      return category;
    }
    else  previousCategory;
  };
  
  export default toggleReducer;
  