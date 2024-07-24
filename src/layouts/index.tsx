import '@styles/App.scss';
import '@styles/common.scss';
import { Input, Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <Layout>
      <Content className='ant-content'>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
