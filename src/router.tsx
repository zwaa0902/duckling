import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './layouts';
import Onboarding from './pages/Onboarding/Onboarding';
import Home from './pages/Home/Home';
import Groups from './pages/Groups/Groups';
import CreateGroup from './pages/Groups/CreateGroup';
import DetailGroup from './pages/Groups/DetailGroup';

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: '',
          element: <Onboarding />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'groups',
          element: <Groups />,
          children: [
            {
              path: 'create',
              element: <CreateGroup />,
            },
            {
              path: 'detail',
              element: <DetailGroup />,
            },
          ],
        },

        {
          path: '*',
          element: <Navigate to='/' />,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? '/duckling/' : '/',
  },
);

export default router;
