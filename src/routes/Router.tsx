import Home from "@components/pages/Home";
import Layout from "@components/templates/Layout";
import { Route, Routes } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Router;
