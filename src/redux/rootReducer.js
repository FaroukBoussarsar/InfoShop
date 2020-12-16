import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import AsyncStorage from "@react-native-community/async-storage";
import toggleReducer from './toggle/toggle.reducer'
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
import filterReducer from "./filter/filter.reducer";
import locationReducer from "./location/location.reducer";
import onBoardingReducer from "./onBoarding/onBoarding.reducer";
const persitConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  filter: filterReducer,
  toggle: toggleReducer,
  location:locationReducer,
  onBoarding:onBoardingReducer
});

export default persistReducer(persitConfig, rootReducer);

// export default rootReducer
