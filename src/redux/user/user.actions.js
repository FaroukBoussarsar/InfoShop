import actionTypes from "./user.actionTypes";
import firebase from "../../firebase/firebase";

import "firebase/firestore";
const updateUserFavoriteStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START,
  };
};
const updateUserFavoriteSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: user,
  };
};
const updateUserFavoriteFailure = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAILURE,
    payload: error.message,
  };
};
const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START,
  };
};
const updateUserSuccess = (user) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: user,
  };
};
const updateUserFailure = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAILURE,
    payload: error.message,
  };
};
const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};

const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};

const signOutStart = () => {
  return {
    type: actionTypes.SIGN_OUT_START,
  };
};

export const signUpSuccess = (user) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user
  };
};

export const signInSuccess = (user) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signOutSuccess = () => {
  return {
    type: actionTypes.SIGN_OUT_SUCCESS,
  };
};

const signUpFailure = (error) => {
  return {
    type: actionTypes.SIGN_OUT_FAILURE,
    payload: error.message,
  };
};

const signInFailure = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    payload: error.message,
  };
};

const signOutFailure = (error) => {
  return {
    type: actionTypes.SIGN_OUT_FAILURE,
    payload: error.message,
  };
};

export const signUp = ({ name, familyName, email, password, navigation }) => {
  return async (dispatch) => {
    dispatch(signUpStart());

    try {
      const userAuth = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const userRef = firebase.firestore().doc(`users/${userAuth.user.uid}`);
      const userSnapshot = await userRef.get();
      if (!userSnapshot.exists) {
        await userRef.set({
          name: name,
          familyName: familyName,
          email: email,
          fullAddress: "",
          phoneNumber: "",
          img: "",
          favoriteRestaurants: [],
        });
      }
      dispatch(signUpSuccess());
    } catch (error) {
     
      dispatch(signUpFailure(error));
    }
  };
};

export const signIn = ({ email, password }) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const userRef = firebase.firestore().doc(`users/${user.uid}`);
    const userSnapShot = await userRef.get();

    dispatch(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {

    dispatch(signInFailure(error));
  }
};
export const updateUser = ({ userId, data }) => {
  return async (dispatch) => {
    dispatch(updateUserStart());
    try {
      const userRef = firebase.firestore().doc(`users/${userId}`);
      const userSnapShot = await userRef.get();
      await userRef.set(data);
      dispatch(updateUserSuccess({ id: userId, ...data }));
    } catch (error) {
      dispatch(updateUserFailure(error));
 
    }
  };
};
export const updateUserFavorite = (data, userId) => {
  return async (dispatch) => {
    dispatch(updateUserFavoriteStart());
    try {
let newFavoriteRestaurant
      const userRef = firebase.firestore().doc(`users/${userId}`);
      const userSnapShot = await userRef.get();
      
      const restaurantIdExist = userSnapShot.data().favoriteRestaurants.find(i=> i.id===data.id)
      if(restaurantIdExist){

        newFavoriteRestaurant =userSnapShot.data().favoriteRestaurants.filter((i)=>i.id!==data.id)
      }
      else{
        newFavoriteRestaurant=[
          ...userSnapShot.data().favoriteRestaurants,
          data,
        ]
      }
      
      
      const newUser = {
        ...userSnapShot.data(),
        favoriteRestaurants: newFavoriteRestaurant,
      };
      await userRef.set(newUser);
      dispatch(updateUserFavoriteSuccess({...newUser, id:userId}))
    } catch (error) {
      dispatch(updateUserFavoriteFailure(error));

    }
  };
};

export const signOut = () => async (dispatch) => {
  dispatch(signOutStart());
  try {
    await firebase.auth().signOut();
    dispatch(signOutSuccess());

  } catch (error) {

    dispatch(signOutFailure(error));
  }
};
