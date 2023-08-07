// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  governorates: [],
  areas: [],
  reasons: [],
  clients: [],
  roles: [],
  clientsDetails: [],
  addressDetails: []
};

export default function lookupsReducer(state = userState, action = {}) {
  switch (action.type) {


    case "STORE_GOVERNORATES_LOOKUPS":
      return {
        ...state,
        governorates: action.payload.data,
      };
    case "STORE_AREAS_LOOKUPS":
      return {
        ...state,
        areas: action.payload.data,
      };
    case "STORE_REASONS_LOOKUPS":
      return {
        ...state,
        reasons: action.payload.data,
      };
    case "STORE_CLIENTS_LOOKUPS":
      return {
        ...state,
        clients: action.payload.data,
      };
    case "STORE_ROLES_LOOKUPS":
      return {
        ...state,
        roles: action.payload.data,
      };
    case "STORE_CLIENTS_Details_LOOKUPS":
      return {
        ...state,
        clientsDetails: action.payload.data,
      };
    case "STORE_ADDRESS_LOOKUPS":
      return {
        ...state,
        addressDetails: action.payload.data,
      };




    default:
      return state;
  }
}
