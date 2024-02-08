export const useSidebarProps = () => {
  const navList = [
    {
      path: '/users',
      name: 'Users',
    },
    {
      path: '/subjects',
      name: 'Subjects',
    },
    {
      path: '/test',
      name: 'Tests',
    },
    {
      path: '/profile',
      name: 'Profile',
      isBottom: true,
    },
  ];

  return { navList };
};
