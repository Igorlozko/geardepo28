import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import reducer from './reducer';

const initialState = { // defines the initail state of the application 
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile:{open:false, file:null, photoURL:''},
  images:[],
  details:{title:'',description:'', price:0},
  location:{lng:0, lat:0}, 
  updatedGear:null,
  deletedImages:[],
  addedImages:[],
  gears: [],
  priceFilter: 500,
  addressFilter: null,
  filteredGears: [],
  gear:null,
  users:[],
  section:0,
  reservation:[],
  reservations :[], // inital tate of reservations 
  resDetails:{phone:'',purpose:'', addinfo:''},
  dateRange: [new Date(), new Date()], // Single array to store both start and end dates
  paymentMethodId: null

};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const searchRef = useRef();

  const updateDateRange =(dateRange) =>{
    dispatch({type: 'UPDATE_DATE_RANGE', payload:dateRange});
  }

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      dispatch({type:'UPDATE_USER', payload: currentUser});
    }
  },[]);

  useEffect(()=>{
    if(state.currentUser){
      const gear = JSON.parse(localStorage.getItem(state.currentUser.id))
      if(gear){
        dispatch({type:'UPDATE_LOCATION', payload:gear.location})
        dispatch({type:'UPDATE_DETAILS', payload:gear.details})
        dispatch({type:'UPDATE_IMAGES', payload:gear.images})
        dispatch({type:'UPDATE_UPDATED_GEAR', payload:gear.updatedGear})
        dispatch({type:'UPDATE_DELETED_IMAGES', payload:gear.deletedImages})
        dispatch({type:'UPDATE_ADDED_IMAGES', payload:gear.addedImages})
      }
    }
  },[state.currentUser])
  return (
    <Context.Provider value={{ state, dispatch, mapRef, searchRef, updateDateRange }}>{children}</Context.Provider> // componments made access able to child componments 
  );
};

export default ContextProvider;
