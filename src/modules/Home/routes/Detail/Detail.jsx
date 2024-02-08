import cls from "./styles.module.scss";
import { useDetailProps } from "./useDetailProps";


export const Detail = () => {

  const { text } = useDetailProps();

  return <h1 className={cls.title}>Detail: {text}</h1>;
};
