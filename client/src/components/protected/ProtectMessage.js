import { Lock } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Container } from '@mui/material'
import React from 'react'
import { useValue } from '../../context/ContextProvider'

const ProtectMessage = () => {
  const {dispatch} = useValue();
  return (
    <Container
      sx={{py:10}}
    >
        <Alert
          severity ='error'
          variant = 'outlined'
        >
            <AlertTitle>No access allowed</AlertTitle>
            Login or Register to publish a listing
            <Button
              variant ='outlined'
              sx = {{ml:2}}
              startIcon={<Lock/>}
              onClick={()=> dispatch({type:'OPEN_LOGIN'})}
            >
              login
            </Button>
        </Alert>
    </Container>
  )
}

export default ProtectMessage