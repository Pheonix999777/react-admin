import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Header2 } from '../Header2/Header2';
import { Sidebar2 } from '../Sidebar2/Sidebar';

export const MainLayout2 = () => {
  return (
    <>
      <Header2 />
      <Box display="flex">
        <Sidebar2 />
        <Box width="100%">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
