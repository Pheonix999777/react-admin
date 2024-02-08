import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Sidebar } from "components/Sidebar";
import { Box } from "@chakra-ui/react";

export const MainLayout = () => {

  return <>
    <Header />
    <Box display="flex">
      <Sidebar />
      <Box width="100%">
        <Outlet />
      </Box>
    </Box>
    <Footer />
  </>;
};
