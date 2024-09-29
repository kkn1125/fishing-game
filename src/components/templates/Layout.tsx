import { Stack } from "@mui/material";
import Footer from "@organisms/Footer";
import Header from "@organisms/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Stack height='inherit'>
      <Header />
      <Outlet />
      <Footer />
    </Stack>
  );
}

export default Layout;
