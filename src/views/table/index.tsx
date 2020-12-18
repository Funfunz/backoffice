import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'components/table';
import style from './style.module.scss';
import useTableConfig from 'hooks/useTableConfig';
import { Message } from 'components/message';
import useTableData from 'hooks/useTableData';

export interface ITableProps {}

const TableView: FC<ITableProps> = () => {
  const { tableName = '' } = useParams<any>();

  const { table, loadingTableConfig } = useTableConfig(tableName);
  const { tableData, loadingTableData, errorTableData } = useTableData(
    tableName
  );
  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <h1>{table.title()}</h1>
      </div>
      <div className={style.tableContainer}>
      {!errorTableData &&
        (loadingTableConfig ? (
          <Message loading />
        ) : (
          table &&
          tableData && (
            <Table
              tableData={tableData}
              loadingTableData={loadingTableData}
              columns={table.columns()}
            />
          )
        ))}
      {errorTableData && (
        <Message error={!!errorTableData} text={errorTableData} />
      )}
      </div>
    </div>
  );
};

export default memo(TableView);
