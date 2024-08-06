export const menuItems = [
  {
    key: 1,
    label: 'Home',
    path: '/home',
    hasNestedMenu: false,
  },
  {
    key: 2,
    label: 'Groups',
    path: '/groups',
    hasNestedMenu: true,
    children: [
      {
        key: 2.1,
        label: 'Create Group',
        path: '/groups/create',
        hasNestedMenu: false,
      },
    ],
  },
  {
    key: 3,
    label: 'Profile',
    path: '/profile',
  },
];
