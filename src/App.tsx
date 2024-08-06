import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@redux/store';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import router from './router';

import '@styles/App.scss';
import '@styles/normalize.scss';
import '@twa-dev/sdk';
import './App.css';

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
