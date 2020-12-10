import React, { FC, memo } from 'react';
import Message from 'components/message';
import { TEntry } from 'reducers/entry';
import TableHead from './components/table-head';
import TableRow from './components/table-row';
import Pagination from './components/pagination';
import style from './style.module.scss';

export interface ITableProps {
  columns?: Array<{ name: string; label?: string } | string>;
  tableData: TEntry[];
  loadingTableData: boolean;
}

const Table: FC<ITableProps> = ({
  columns = [],
  tableData,
  loadingTableData,
}) => {
  const actions = {
    edit: () => undefined,
    delete: () => undefined,
  };
  const fields = columns.map((column) => {
    return typeof column === 'string' ? column : column.name;
  });

  return (
    <>
      <table className={style.table}>
        <TableHead actions={true} columns={columns} />
        <tbody>
          {(loadingTableData && (
            <tr>
              <td colSpan={columns.length}>
                <Message loading />
              </td>
            </tr>
          )) ||
            (!loadingTableData &&
              tableData.map((data, index) => (
                <TableRow
                  key={index}
                  actions={actions}
                  fields={fields}
                  data={data}
                />
              )))}
        </tbody>
      </table>
      <Pagination />
    </>
  );
};

export default memo(Table);
