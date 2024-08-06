export const menuItems = [
  {
    id: 1,
    displayText: 'Trang chủ',
    path: '/home',
    hasNestedMenu: false,
  },
  {
    id: 2,
    displayText: 'Groups',
    path: '/groups',
    hasNestedMenu: true,
    nestedMenu: [
      {
        id: 2.1,
        displayText: 'Create Group',
        path: '/groups/create',
        hasNestedMenu: false,
      },
      {
        id: 2.2,
        displayText: 'Detail Group',
        path: '/groups/detail',
        hasNestedMenu: false,
      },
    ],
  },

  {
    id: 3,
    displayText: 'Tài khoản',
    path: '/profile',
  },
];
