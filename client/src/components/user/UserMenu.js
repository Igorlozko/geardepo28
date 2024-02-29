import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { storeGear } from '../../actions/gear';
import { logout } from '../../actions/user';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const { dispatch, state: {currentUser, location, details, images, updatedGear, deletedImages, addedImages} } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  // using hook 
  const navigate = useNavigate();

  const handleLogout =()=>{
    storeGear(location, details, images, updatedGear, deletedImages, addedImages, currentUser.id)
    logout(dispatch)
  }

  useEffect(()=>{
    const storeBeforeLeave = (e)=>{
      if(storeGear(location, details, images, updatedGear, deletedImages, addedImages, currentUser.id)){
        e.preventDefault()
        e.returnValue=true
      }
    }
    window.addEventListener('beforeunload', storeBeforeLeave)
    return ()=>window.removeEventListener('beforeunload', storeBeforeLeave)
  },[location, details, images])

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google &&(
        <MenuItem onClick={()=> 
          dispatch(
            {
              type:'UPDATE_PROFILE', 
              payload:{open:true, 
              file: null, 
              photoURL: currentUser?.photoURL,}
              })}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        )}
        <MenuItem
          onClick={() => navigate('admin')}
        >
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Admin
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile/>
    </>
  );
};

export default UserMenu;
