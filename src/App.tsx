import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './layouts';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Groups from './pages/Groups';

import '@styles/App.scss';
import '@styles/normalize.scss';
import '@twa-dev/sdk';
import './App.css';

const themeConfig = {
  token: {
    colorPrimary: '#222020',
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
      {/* //   <PersistGate loading={null} persistor={persistor}> */}
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
      {/* //   </PersistGate> */}
    </Provider>
  );
}

export default App;
