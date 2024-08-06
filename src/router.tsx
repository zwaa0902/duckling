import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './layouts';
import Onboarding from './pages/Onboarding/Onboarding';
import Home from './pages/Home/Home';
import Groups from './pages/Groups/Groups';
import CreateGroup from './pages/Groups/CreateGroup';
import DetailGroup from './pages/Groups/DetailGroup';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter(
  [
    {
      path: '',
      element: <Onboarding />,
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'groups',
          children: [
            {
              path: '',
              element: <Groups />,
            },
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
          path: 'profile',
          element: <Profile />,
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
