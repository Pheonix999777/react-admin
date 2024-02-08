import { authStore } from 'store/auth.store';
import cls from './styles.module.scss';

export const Profile = () => {
  const handleLogout = () => {
    authStore.logout();
  };
  return (
    <div>
      <button className={cls.button5} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
