import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './layouts';
import Home from './pages/Home/Home';
import Onboarding from './pages/Onboarding/Onboarding';
import Groups from './pages/Groups/Groups';

import '@styles/App.scss';
import '@styles/normalize.scss';
import '@twa-dev/sdk';
import './App.css';
import CreateGroup from './pages/Groups/CreateGroup';
import DetailGroup from './pages/Groups/DetailGroup';

const themeConfig = {
  token: {
    colorPrimary: '#FFA500',
    colorSuccess: '#32D07B',
    colorWarning: '#F1C40F',
    colorError: '#FE3D2E',
    fontFamily: 'Inter',
    fontSize: 16,
  },
};

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
          element: <Groups />,
        },
        {
          path: 'create-group',
          element: <CreateGroup />,
        },
        {
          path: 'detail-group',
          element: <DetailGroup />,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? '/duckling/' : '/',
  },
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
