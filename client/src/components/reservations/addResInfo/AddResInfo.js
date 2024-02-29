import { FormControl, RadioGroup, Stack } from '@mui/material'
import React from 'react'
import { useValue } from '../../../context/ContextProvider'
import ResInfoField from './ResInfoField.js'
//import ResInfoField from 'client/src/components/reservations/addResInfo/ResInfoField.js'
//import ResInfoField from './resInfoField'

// This componment is responsible for user reservation details 
// add infor email, phone 
// purpose of the reservation 
// aditional info 

const AddResInfo = () => {

  const{state:{resDetails:{phone,purpose,addinfo},},dispatch} = useValue() // importing the state here, extracting from state and extrating from object reDetails
  // also a disptch to disptach change 

  return (
    <Stack
      sx={{
        alignItems:'center',
        "&.MuiTextField-root":{width:'100', maxWidth:500, m:1} // chagne the class of material ui to text field 
      }}
    >
      <ResInfoField
        mainProps={{name:'phone', label:'Phone', value:phone}}
        minLength={6}
      />
      <ResInfoField
        mainProps={{name:'purpose', label:'Purpose', value:purpose}}
        minLength={5}
        optionalProps={{multiline:true, rows:4}}
      />
      <ResInfoField
        mainProps={{name:'addinfo', label:'Additional Info', value:addinfo}}
        minLength={5}
        optionalProps={{multiline:true, rows:4}}
      />
    </Stack>
  )
}

export default AddResInfo