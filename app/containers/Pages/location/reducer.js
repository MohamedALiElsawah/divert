// import { Record } from 'immutable';
// import {

// } from '../constants/authConstants';

export const userState = {
  loading: false,
  loginError:{},
  governorates:[],
  governorateData:{},
  areas:[],
  blocks:[],
};

export default function locationReducer(state = userState, action = {}) {
  switch (action.type) {

    case "GOVERNORATES_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
      
    case "GOVERNORATES_ERROR":
      return {
        ...state,
        loginError: action.payload,
      };
      case "STORE_GOVERNORATES":
        return {
          ...state,
          governorates: action.payload.data,
        };
        case "STORE_GOVERNORATET_DATA":
        return {
          ...state,
          governorateData: action.payload.data,
        };
        
        case "STORE_AREAS":
        return {
          ...state,
          areas: action.payload.data,
        };  

        case "STORE_BLOCKS":
          return {
            ...state,
            blocks: action.payload.data,
          };  

          
    default:
      return state;
  }
}
