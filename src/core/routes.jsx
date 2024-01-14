import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import { lazy, Suspense, useEffect } from 'react';

const lazyLoading = (pageName) => {
  const LazyPage = lazy(() => import(`../pages/${pageName}.jsx`));

  return (
    <Suspense fallback="Loading...">
      <LazyPage />
    </Suspense>
  );
};

const router = createBrowserRouter([
  /** separate Sign in route */
  {
    path: 'signin',
    element: lazyLoading('LoginPage'),
  },
  /** separate Sign up route */
  {
    path: 'signup',
    element: lazyLoading('SignUpPage'),
  },
  /** test */
  {
    path: 'components',
    element: lazyLoading('Components'),
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: lazyLoading('404'),
    children: [
      {
        index: true,
        element: lazyLoading('HomePage'),
      },
      {
        path: 'create-post',
        element: lazyLoading('CreatePostPage'),
      },
      {
        path: 'test-upload',
        element: lazyLoading('UploadFile'),
      },
    ],
  },
]);

//

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
