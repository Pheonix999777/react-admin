import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Detail } from "./Detail";

export const HomeRoutes = () => {
  return <Routes>
    <Route path="" element={<Main />} />
    <Route path=":id" element={<Detail />} />
  </Routes>;
};
