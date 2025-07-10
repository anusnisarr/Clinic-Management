import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

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
          <Outlet /> {/* This will render the current route's page */}
      </div>
    </div>
  );
};

export default Layout;
