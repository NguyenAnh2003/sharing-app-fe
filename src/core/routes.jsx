import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '../libs/utils/ProtectedRoute';

const lazyLoading = (pageName) => {
  const LazyPage = lazy(() => import(`../pages/${pageName}.jsx`));

  return (
    <Suspense fallback="Loading...">
      <LazyPage />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: lazyLoading('404'),
    children: [
      {
        index: true,
        element: <ProtectedRoute isAuth={true}>{lazyLoading('HomePage')}</ProtectedRoute>,
      },
      {
        path: 'signin',
        element: lazyLoading('LoginPage'),
      },
      {
        path: 'signup',
        element: lazyLoading('SignUpPage'),
      },
      {
        path: 'test-upload',
        element: lazyLoading('UploadFile'),
      },
    ],
  },
]);

//

const AppRoutes = ({ isAuth }) => {
  return <RouterProvider router={router}/>;
};

export default AppRoutes;
