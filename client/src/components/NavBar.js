import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import FilterSearch from './filtersearch/FilterSearch';
import Logo2 from './Logo2.png'; 
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton size="large" color="primary" onClick={()=>setIsOpen(true)}>
              <Menu />
            </IconButton>
            <Link to="/">
              <img src={Logo2} alt="Logo2" style={{ height: 50, marginRight: 10 }} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {!currentUser ? (
              <Button
                color="primary"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <FilterSearch {...{isOpen, setIsOpen}}/>
    </>
  );
};

export default NavBar;
