import '@styles/App.scss';
import '@styles/normalize.scss';
import '@twa-dev/sdk';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import { ConfigProvider } from 'antd';
import AppLayout from './layouts';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';

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

const router = createBrowserRouter([
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
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, dont you think?</p>
      </main>
      {/* <nav>
        <Link to='/'>Home</Link>
      </nav> */}
    </>
  );
}

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
