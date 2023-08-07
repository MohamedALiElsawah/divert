// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError: {},
  clients: [],
  branches: [],
  addresses:[],
  plans:[],
  clientData: {}
};

export default function clientsReducer(state = userState, action = {}) {
  switch (action.type) {

    case "CLIENTS_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLIENTS_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
    case "STORE_CLIENTS":
      return {
        ...state,
        clients: action.payload.data,
      };
    case "STORE_BRANCH_DATA":
      return {
        ...state,
        branches: action.payload.data,
      };
      case "STORE_ADDRESS_DATA":
        return {
          ...state,
          addresses: action.payload.data,
        };
      
        case "STORE_PLANS":
          return {
            ...state,
            plans: action.payload.data,
          };      

    case "STORE_CLIENT_DATA":
      return {
        ...state,
        clientData: action.payload.data,
      };

    default:
      return state;
  }
}
