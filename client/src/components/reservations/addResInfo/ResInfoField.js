import { Avatar, Input, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../../../context/ContextProvider'
import pendingIcon11 from './resicons/progress11.svg'
import {Check} from '@mui/icons-material'

let timer

const ResInfoField = ({mainProps, optionalProps={}, minLength}) => {
    const {dispatch} = useValue()
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = (e) =>{ // recieves the event and dspatches the state change 
        dispatch({
            type: 'RES_DETAILS',
            payload:{[e.target.name]:e.target.value} // update the fields set in Context provider and sets value 
        })
        if(!editing) setEditing(true) // if state of editing is false make it true 
        clearTimeout(timer)
        timer = setTimeout(()=>{ // clears the timer and sets a new one 
            setEditing(false)
            if(e.target.value.length < minLength){ // checks the fields and the lenght 
                if(!error) setError(true) // if less then the desired lenght sets the states 
                if(success) setSuccess(false)
            }else{
                if(error) setError(false)
                if(!success) setSuccess(true)
            }
        }, 1000) // delay before checking 
    }

  return (
    <TextField
        {...mainProps}
        {...optionalProps}
        error = {error}
        helperText={error && `This field must be ${minLength} characters or more`}
        color={success ? 'success':'primary'}
        variant='outlined'
        onChange={handleChange}
        required
        sx={{ width: '100%', maxWidth: 500, m: 1 }} 
        InputProps={{
            endAdornment:(
                <InputAdornment position='end'>
                    {editing?(
                        <Avatar src={pendingIcon11} sx={{height:70}}/>
                    ):(
                        success && <Check color ='success' />
                    )}
                </InputAdornment>
            )
        }}
    />
  )
}

export default ResInfoField;