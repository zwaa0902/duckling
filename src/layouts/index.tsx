import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';

import '@styles/App.scss';
import '@styles/common.scss';

function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <Content className='ant-content'>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
