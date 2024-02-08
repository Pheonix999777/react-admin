import { Route, Routes } from 'react-router-dom';
import { UsersList } from './UsersList';
import { Detail } from './Detail';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<UsersList />} />
      <Route path=":id" element={<Detail />} />
    </Routes>
  );
};
