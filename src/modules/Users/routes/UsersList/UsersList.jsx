import cls from "./styles.module.scss";
import { useMainProps } from "./useMainProps";
import { CustomTable } from "components/CustomTable";

export const UsersList = () => {

  const { columns, data } = useMainProps();

  return <>
    <h1 className={cls.title}>Users</h1>
    <CustomTable className="table" columns={columns} data={data} />
  </>;
};
