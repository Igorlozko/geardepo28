import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useValue } from '../../../context/ContextProvider'
import { clearGear, deleteGear } from '../../../actions/gear'
import { useNavigate } from 'react-router-dom'

const GearsActions = ({params}) => {
    const {_id, lng,lat, price, title, description, images, uid} = params.row
    const {dispatch, state:{currentUser, updatedGear, addedImages, images: newImages}} = useValue();
    const navigate = useNavigate();
    const handleEdit = () =>{
        if(updatedGear){
            clearGear(dispatch, currentUser, addedImages, updatedGear);
        }else{
            clearGear(dispatch, currentUser, newImages);
        }
        
        dispatch({type: 'UPDATE_LOCATION', payload:{lng, lat}})
        dispatch({type: 'UPDATE_DETAILS', payload:{price, title, description}})
        dispatch({type: 'UPDATE_IMAGES', payload:images})
        dispatch({type: 'UPDATE_UPDATED_GEAR', payload:{_id, uid}})
        dispatch({type: 'UPDATE_SECTION', payload:2})
        navigate('/');
    }
  return (
    <Box>
        <Tooltip title='View gear details'>
            <IconButton onClick={()=>dispatch({type:'UPDATE_GEAR', payload:params.row})}>
                <Preview/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit the gear'>
            <IconButton onClick={handleEdit}>
                <Edit/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Delete gear'>
            <IconButton onClick={()=>deleteGear(params.row, currentUser, dispatch )}>
                <Delete/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default GearsActions