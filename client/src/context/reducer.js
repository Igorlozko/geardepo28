const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
        return {...state, images:[...state.images, ...action.payload]};

    case 'DELETE_IMAGE':
        return {...state, images: state.images.filter(image=>image !== action.payload)};    

    case 'UPDATE_DETAILS':
        return {...state, details:{...state.details, ...action.payload}};

    case 'UPDATE_LOCATION':
        return {...state, location: action.payload};

    case 'UPDATE_UPDATED_GEAR':
      return{...state, updatedGear: action.payload};

    case 'UPDATE_DELETED_IMAGES':
      return {...state, deletedImages:[...state.deletedImages, ...action.payload]};

      case 'UPDATE_ADDED_IMAGES':
        return {...state, addedImages:[...state.addedImages, ...action.payload]};

    case 'RESET_GEAR':
      return{...state, images:[], details:{title:'', description:'', price:0}, location:{lng:0, lat:0},updatedGear:null }; 
      
    case 'UPDATE_GEARS':
      return{...state, gears: action.payload, addressFilter: null, priceFilter: 100, filteredGears: action.payload, deletedImages:[], addedImages:[]};  // resetting location and price to default values
      
    case 'FILTER_PRICE':
        return {...state, priceFilter: action.payload, filteredGears: applyFilter(
          state.gears,
          state.addressFilter,
          action.payload
        )};  

    case 'FILTER_ADDRESS':
      return{...state, addressFilter: action.payload, filteredGears: applyFilter(
        state.gears,
        action.payload,
        state.priceFilter
      )};

    case 'CLEAR_ADDRESS':
      return{...state, addressFilter: null, priceFilter: 100, filteredGears: state.gears};
      
    case 'UPDATE_GEAR':
      return{...state, gear: action.payload};

    case 'UPDATE_USERS':
      return{...state, users:action.payload};  

    case 'DELETE_GEAR':
      return{...state, gears:state.gears.filter((gear) => gear._id !== action.payload),};

    case 'UPDATE_SECTION':
      return{...state, section: action.payload};

    case 'RES_DETAILS':
        return {...state, resDetails:{...state.resDetails, ...action.payload}}; // return same state and old state and add payload as an object
    //case 'UPDATE_START_DATE':
    //  return{...state, startDate:{...state.startDate, ...action.payload}};
    //case 'UPDATE_END_DATE':
    //  return{...state, endDate:{...state.endDate, ...action.payload}};
    case 'UPDATE_DATE_RANGE':
      return{...state, dateRange:action.payload,};
      case 'UPDATE_RESERVATION':
      return{...state, reservtion: action.payload};

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;

const applyFilter = (gears, address, price) =>{
  let filteredGears = gears
  if(address){
    const {
      lng, 
      lat
    } = address
    filteredGears = filteredGears.filter(gear => {
      const lngDif = lng > gear.lng ? lng - gear.lng : gear.lng - lng
      const latDif = lat > gear.lat ? lat - gear.lat : gear.lat - lat

      return lngDif <= 1 && latDif <= 1 

    });
  }

  if(price < 100){
    filteredGears = filteredGears.filter(gear => gear.price <= price)
  }

  return filteredGears

}
