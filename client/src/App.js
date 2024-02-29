import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Home from './pages/Home';
import Loading from './components/Loading';
import Notification from './components/Notification';
import GearPage from './components/gear/GearPage';

const App = () => {
  return (
    <>
    <Loading/>
    <Notification/>
    <BrowserRouter>
    <Routes>
      <Route path='admin/*' element={<Admin/>}/>
      <Route path ='*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    <GearPage/>
    </>
  );
};

export default App;
