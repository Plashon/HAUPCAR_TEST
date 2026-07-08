import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import CarList from '../pages/CarList';
import CarCreate from '../pages/CarCreate';
import CarEdit from '../pages/CarEdit';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <CarList /> },
      { path: 'cars/create', element: <CarCreate /> },
      { path: 'cars/:id/edit', element: <CarEdit /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;