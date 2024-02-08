import { Link } from 'react-router-dom';
import cls from './styles.module.scss';
import { useSidebarProps } from './useSidebarProps';

export const Sidebar = () => {
  const { navList } = useSidebarProps();

  return (
    <div className={cls.sidebar}>
      <nav className={cls.navbar}>
        <ul className={cls.navList}>
          {navList.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
