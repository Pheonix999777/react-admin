import clsx from "clsx";
import cls from "./styles.module.scss";
import Table from "rc-table";

export const CustomTable = ({ columns = [], data = [], className, ...props }) => {

  return <Table className={clsx(cls.table, className)} columns={columns} data={data} {...props} />;
};
