import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Page404 from './pages/404';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { lazy, Suspense } from 'react';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

//

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
