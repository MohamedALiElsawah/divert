// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError:{},
  statuses:[],
  reasons:[],
  reasonsItems:[],
  
};

export default function statusReducer(state = userState, action = {}) {
  switch (action.type) {

    case "ORDER_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
      
    case "ORDER_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
      case "STORE_STATUS":
        return {
          ...state,
          statuses: action.payload.data,
        };
        case "STORE_REASONS":
          return {
            ...state,
            reasons: action.payload.data,
          };  

          case "STORE_REASONS_ITEMS":
            return {
              ...state,
              reasonsItems: action.payload.data,
            };  
        
            
          
    default:
      return state;
  }
}
