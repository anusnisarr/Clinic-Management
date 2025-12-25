import { useContext } from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';
// import UnauthorizedPage from '../pages/Unauthorized';


const Layout = () => {

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
    }}>
        <Navigation />
      <div style={{
          flex: 1,
          overflowY: 'auto'
      }}>
       <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
