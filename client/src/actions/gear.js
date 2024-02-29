import deleteImages from "./utils/deleteImages";
import fetchData from "./utils/fetchData"

const url = process.env.REACT_APP_SERVER_URL + '/gear' // constructs the url for the api end point where the gear creation request if being sent to 

export const createGear = async(gear, currentUser, dispatch) =>{ //async function which means it can perfom http requests gear and current user being created
    dispatch({type: 'START_LOADING'})

    const result = await fetchData({ // calls the fetchdata function respnsible for passing the object containing url the gear (body and token)
        url,
        body:gear,
        token:currentUser?.token
    }, dispatch)

    if(result){ // function responsible for creating the room
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'success', message:'Gear has been added successfully'}});
        clearGear(dispatch, currentUser);
        dispatch({type: 'UPDATE_SECTION', payload:0});
        dispatch({type: 'UPDATE_GEAR', payload:result});
    }

    dispatch({type: 'END_LOADING'});
};

// function or action responsibe from bring the gear from te server this will e similar to reservations 
export const getGears = async(dispatch)=>{
    const result = await fetchData({url, method:'GET'}, dispatch)
    if(result){
        dispatch({type:'UPDATE_GEARS', payload: result});
    }
    console.log("Printing the result :" , result)
};

export const deleteGear = async(gear, currentUser, dispatch) =>{
    dispatch({type: 'START_LOADING'})

    const result = await fetchData({
        url:`${url}/${gear._id}`,
        method:'DELETE',
        token:currentUser?.token
    }, dispatch)

    if(result){ // function responsible for creating the room
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'success', message:'Gear has been deleted successfully'}});
        dispatch({type: 'DELETE_GEAR', payload:result._id});
        deleteImages(gear.images, gear.uid);
    }

    dispatch({type: 'END_LOADING'});
};

export const updateGear = async(gear, currentUser, dispatch, updatedGear, deletedImages) =>{
    dispatch({type: 'START_LOADING'})

    const result = await fetchData({
        url:`${url}/${updatedGear._id}`,
        method:'PATCH',
        body:gear,
        token:currentUser?.token
    }, dispatch)

    if(result){ // function responsible for creating the room
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'success', message:'Gear has been updated successfully'}});
        clearGear(dispatch, currentUser, deletedImages, updatedGear);
        dispatch({type: 'UPDATE_SECTION', payload:0});
        dispatch({type: 'UPDATE_GEAR', payload:result});
    }

    dispatch({type: 'END_LOADING'});
};

export const clearGear = (dispatch, currentUser, images=[], updatedGear=null)=>{
    dispatch({type:'RESET_GEAR'});
    localStorage.removeItem(currentUser.id)
    if(updatedGear){
        deleteImages(images, updatedGear.uid)
    }else{
        deleteImages(images, currentUser.id)
    }
};

export const storeGear = (location, details, images, updatedGear, deletedImages, addedImages, userId)=>{
    if(location.lng || location.lat || details.price || details.description || images.length){
        localStorage.setItem(userId, JSON.stringify({location,details, images, updatedGear, deletedImages, addedImages, userId }))
        return true
    }else{
        return false
    }
}