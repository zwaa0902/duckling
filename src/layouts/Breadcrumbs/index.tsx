/* eslint-disable */
import React, { memo, useMemo } from 'react';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { menuItems } from '@/constants/app';
import { routes } from '@/constants/routes';

const { Text } = Typography;

interface BreadcrumbsProps {
  pathname: string;
}


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathname }) => {
  const BreadcrumbList = useMemo(() => {
    const breadcrumbs = [
      {
        displayText: 'Trang chủ',
        hasNestedMenu: false,
        id: 1,
        path: routes.home,
      },
    ];

    for (let item of menuItems) {
      if (pathname.includes(item.path)) {
        breadcrumbs.push(item as { displayText: string; hasNestedMenu: boolean; id: number; path: string });
        if (item.hasNestedMenu) {
          if (item.nestedMenu) {
            item.nestedMenu.forEach((nestedItem) => {
              if (pathname.includes(nestedItem.path)) {
                breadcrumbs.push(nestedItem);
              }
            });
          }
          break;
        }
      }
    }
    return breadcrumbs.map((breadcrumb, index) => {
      const last = index === breadcrumbs.length - 1;

      if (breadcrumb.path === routes.home) {
        return (
          <Breadcrumb.Item key={breadcrumb.path}>
            <Link to={breadcrumb.path}>{breadcrumb.displayText}</Link>
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={breadcrumb.path}>
          {last ? <Text>{breadcrumb.displayText}</Text> : <Link to={breadcrumb.path}>{breadcrumb.displayText}</Link>}
        </Breadcrumb.Item>
      );
    });
  }, [pathname]);

  return <Breadcrumb>{BreadcrumbList}</Breadcrumb>;
};


export default memo(Breadcrumbs);
