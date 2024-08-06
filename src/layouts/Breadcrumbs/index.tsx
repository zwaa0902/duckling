import { memo, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { routes } from '@constants/routes'; // Ensure the import path is correct
import '@styles/common/breadcrumb.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;

  const BreadcrumbList = useMemo(() => {
    const pathnames = pathname.split('/').filter((x) => x);

    if (pathname === routes.home || pathname === routes.onboarding) return null; // Hide breadcrumb for homepage and onboarding

    const breadcrumbs = [
      {
        displayText: 'Home',
        path: routes.home,
      },
    ];

    const pathMap = {
      groups: 'Groups',
      create: 'Create',
      detail: 'Detail',
      // Add other paths here as needed
    };

    pathnames.forEach((path, index) => {
      const url = `/${pathnames.slice(0, index + 1).join('/')}`;
      let displayText = pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);

      if (url !== routes.onboarding && url !== routes.home) {
        // Exclude onboarding and handle correct paths
        breadcrumbs.push({
          displayText,
          path: url,
        });
      }
    });

    return breadcrumbs.map((breadcrumb, index) => {
      const last = index === breadcrumbs.length - 1;
      return last ? (
        <Breadcrumb.Item key={breadcrumb.path}>{breadcrumb.displayText}</Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={breadcrumb.path}>
          <Link to={breadcrumb.path}>{breadcrumb.displayText}</Link>
        </Breadcrumb.Item>
      );
    });
  }, [pathname]);

  if (!BreadcrumbList) return null;

  return <Breadcrumb>{BreadcrumbList}</Breadcrumb>;
};

export default memo(Breadcrumbs);
