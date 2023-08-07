// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError: {},
  user: null,
};

export default function loginReducer(state = userState, action = {}) {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        loginError: action.payload,
      };
    case 'setUserData':
      return {
        ...state,
        user: action.payload,
      };


    default:
      return state;
  }
}
