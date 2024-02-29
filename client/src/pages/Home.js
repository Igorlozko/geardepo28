import React from 'react';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import Login from '../components/user/Login';
import BottomNav from '../components/BottomNav';
import GearPage from '../components/gear/GearPage';

const Home = () => {
  return (
    <>
      {/*<Loading /> */}
     {/* <Notification />*/}
      <Login />
      <NavBar />
      <BottomNav/>
     {/* <GearPage/>*/}
    </>
  );
};

export default Home;
