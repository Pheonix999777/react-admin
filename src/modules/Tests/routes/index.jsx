import { Route, Routes } from "react-router-dom";
import { Tests } from "./Tests";
import { Test } from "./Test";

export const TestsRoutes = () => {

  return <Routes>
    <Route path="" element={<Tests />} />
    <Route path=":id" element={<Test />} />
  </Routes>;
};
