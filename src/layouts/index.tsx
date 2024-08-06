import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import AppHeader from './Header';

import '@styles/App.scss';
import '@styles/common.scss';
import Breadcrumbs from './Breadcrumbs';
import { routes } from '@/constants/routes';

interface BreadcrumbsWrapperProps {
  hasBreadcrumbs: boolean;
  children: React.ReactNode;
}

const BreadcrumbsWrapper: React.FC<BreadcrumbsWrapperProps> = ({ hasBreadcrumbs, children }) => {
  const classNames = `breadcrumbs-wrapper ${hasBreadcrumbs ? 'has-breadcrumbs' : ''}`;
  return <div className={classNames}>{children}</div>;
};

function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <Content className='ant-content'>
        <BreadcrumbsWrapper hasBreadcrumbs={location.pathname !== routes.home}>
          {location.pathname !== routes.home && (
            <div>
              <Breadcrumbs pathname={location.pathname} />
            </div>
          )}
        </BreadcrumbsWrapper>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
