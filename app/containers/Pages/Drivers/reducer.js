// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError: {},
  orders: [],
  orderDetails: {},
  orderStatuses: [],
  drivers: []
};

export default function clientsReducer(state = userState, action = {}) {
  switch (action.type) {
    case 'ORDER_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'ORDER_ERROR':
      return {
        ...state,
        loginError: action.payload,
      };
    case 'STORE_ORDERS':
      return {
        ...state,
        orders: action.payload.data,
      };
    case 'STORE_ORDERS_DETAILS':
      return {
        ...state,
        orderDetails: action.payload.data,
      };
    case 'STORE_ORDERS_STATUSES':
      return {
        ...state,
        orderStatuses: action.payload.data,
      };
    case 'STORE_DRIVERS':
      return {
        ...state,
        drivers: action.payload.data,
      };


    default:
      return state;
  }
}
