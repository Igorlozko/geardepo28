import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import {jwtDecode} from 'jwt-decode';

const GoogleOneTapLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      console.log('Google One Tap library is available.');
    } else {
      console.error('Google One Tap library not available.');//
    }
  }, []);

  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const {sub: id, email, name, picture:photoURL } = decodedToken
    dispatch({type:'UPDATE_USER', payload:{id, email,name,photoURL, token, google:true, role:'basic'}})
    dispatch({type:'CLOSE_LOGIN'})
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleResponse,
        });
  
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {  // Check for isNotDisplayed property
            throw new Error('Try to clear the cookies and try again');
          }
          if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
            setDisabled(false);
          }
        });
    } catch (error) {
      dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message },
     });
      console.error(error);
    }
  };

  return (
    <Button variant="outlined" startIcon={<Google />} disabled={disabled} onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;
