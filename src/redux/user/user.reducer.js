import actionTypes from "./user.actionTypes";
import { floor } from "react-native-reanimated";

const INITIAL_STATE = {
  loading: false,
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch(actions.type) {
    case actionTypes.SIGN_IN_SUCCESS: 
      return {
        ...state,
        currentUser: actions.payload
      }
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: actions.payload
      }  
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
};

export default userReducer;


// switch (actions.type) {
//   case actionTypes.SIGN_UP_START:
//   case actionTypes.SIGN_OUT_START:
//   case actionTypes.SIGN_IN_START:
//   case actionTypes.UPDATE_USER_START:
//   case actionTypes.UPDATE_USER_FAVORITE_START:
//     return {
//       ...state,
//       loading: true,
//       error: null,
//     };
//   case actionTypes.SIGN_UP_SUCCESS:
//     return {
//       ...state,
//       loading: false,
//       error: null,
//       currentUser: null,
//     };
//   case actionTypes.SIGN_IN_SUCCESS:
//   case actionTypes.UPDATE_USER_SUCCESS:
//   case actionTypes.UPDATE_USER_FAVORITE_SUCCESS:
//     return {
//       ...state,
//       loading: false,
//       currentUser: actions.payload,
//       error: null,
//     };
//   case actionTypes.SIGN_OUT_SUCCESS:
//     return {
//       ...state,
//       loading: false,
//       currentUser: null,
//       error: null,
//     };
//   case actionTypes.SIGN_UP_FAILURE:
//   case actionTypes.SIGN_IN_FAILURE:
//   case actionTypes.SIGN_OUT_FAILURE:
//   case actionTypes.UPDATE_USER_FAILURE:
//   case actionTypes.UPDATE_USER_FAVORITE_FAILURE:
//     return {
//       ...state,
//       loading: false,
//       error: actions.payload,
//     };

//   default:
//     return state;
// }