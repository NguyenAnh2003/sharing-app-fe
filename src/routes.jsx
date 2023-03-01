import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { AboutPage, HomePage, Page404 } from './pages';

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
