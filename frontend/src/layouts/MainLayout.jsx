import { Outlet, Link } from 'react-router';

const MainLayout = () => (
  <div>
    <nav className="navbar bg-base-200 px-6 shadow-sm">
      <Link to="/" className="text-xl font-bold">🚗 ระบบจัดการรถ HAUPCAR</Link>
    </nav>
    <Outlet />
  </div>
);

export default MainLayout;