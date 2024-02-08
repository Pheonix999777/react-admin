import { Heading } from '@chakra-ui/react';
import cls from './styles.module.scss';

export const Header = () => {
  return (
    <header className={cls.header}>
      <Heading>Admin</Heading>
    </header>
  );
};
