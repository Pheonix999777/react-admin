import cls from "./styles.module.scss";
import { useMainProps } from "./useMainProps";

export const Main = () => {

  const { mainText } = useMainProps();

  return <h1 className={cls.title}>MAIN: {mainText}</h1>;
};
