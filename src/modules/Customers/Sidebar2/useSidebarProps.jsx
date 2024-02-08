export const useSidebar2Props = () => {
  const navList = [
    {
      path: '/customers',
      name: 'Customers',
    },
    {
      path: '/profile',
      name: 'Profile',
      isBottom: true,
    },
  ];

  return { navList };
};
