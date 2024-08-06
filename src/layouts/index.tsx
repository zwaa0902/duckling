import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';

import '@styles/App.scss';
import '@styles/common.scss';
import Breadcrumbs from './Breadcrumbs';

function AppLayout() {
  console.log(location.pathname);
  return (
    <Layout>
      <AppHeader />
      <Content className='ant-content'>
        <Breadcrumbs />
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
