import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const AuthRoutes = () => {
  return <Routes>
    <Route path="" index element={<Login />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Routes>;
};
