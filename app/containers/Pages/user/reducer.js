// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError: {},
  users: [],
  userData: {}
};

export default function usersReducer(state = userState, action = {}) {
  switch (action.type) {
    case 'USERS_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'USERS_ERROR':
      return {
        ...state,
        loginError: action.payload,
      };
    case 'STORE_USERS':
      return {
        ...state,
        users: action.payload.data,
      };
    case 'STORE_USER_DATA':
      return {
        ...state,
        userData: action.payload.data,
      };


    default:
      return state;
  }
}
