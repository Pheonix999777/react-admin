import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsersRoutes } from '../modules/Users/routes';
import { MainLayout } from '../Layouts/MainLayout';
import { authStore } from 'store/auth.store';
import { observer } from 'mobx-react-lite';
import { AuthRoutes } from 'modules/Auth/routes';
import { SubjectsRoutes } from 'modules/Subjects/routes';
import { TestsRoutes } from 'modules/Tests/routes';
import { Customers } from 'modules/Customers/Customers';
import { Profile } from 'modules/Customers/profile';
import { MainLayout2 } from 'modules/Customers/MainLayout';

export const Router = observer(() => {
  let role = localStorage.getItem('role');
  let permission = localStorage.getItem('has_permission');
  let access_token = localStorage.getItem('access_token');
  useEffect(() => {
    authStore.checkAuthentication();
  }, []);

  if (role == 'admin' && permission == 'true' && access_token) {
    return (
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route index path="/users/*" element={<UsersRoutes />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/users/*" element={<UsersRoutes />} />
          <Route path="/subjects/*" element={<SubjectsRoutes />} />
          <Route path="/test/*" element={<TestsRoutes />} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Route>
      </Routes>
    );
  } else if (access_token && permission == 'true') {
    return (
      <Routes>
        <Route path="" element={<MainLayout2 />}>
          <Route path="/customers/*" element={<Customers />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="*" element={<Navigate to="/customers" />} />
        </Route>
      </Routes>
    );
  } else if (authStore.isAuth === false) {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }
});
