import { useGetSubjects } from 'services/api/subjects/subjects.service';
import { authStore } from 'store/auth.store';

export const useCustomersProps = () => {
  const userId = 'userId';
  const access_token = localStorage.getItem('access_token');
  const subjects = useGetSubjects({ enabled: Boolean(userId) });
  const getSubjectsApi = subjects.data?.map((subject) => subject) || [];
  const handleLogout = () => {
    authStore.logout();
  };
  return {
    subjects,
    getSubjectsApi,
    access_token,
    handleLogout,
  };
};
