import React, { FC, memo, useState } from "react";
import { useParams } from 'react-router-dom';
import Table from 'components/table';
import style from './style.module.scss';
import useTableConfig from 'hooks/useTableConfig';
import Message from 'components/message';
import Toolbar from 'components/toolbar';
import Filters from 'components/filters';
import useTableData from 'hooks/useTableData';

export interface ITableProps {}

const TableView: FC<ITableProps> = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () =>{
    setShowFilters(!showFilters);
  }

  const { tableName = '' } = useParams<any>();

  const { table, loadingTableConfig } = useTableConfig(tableName);
  const { tableData, loadingTableData, errorTableData } = useTableData(
    tableName
  );
  return (
    <div className={style.tableContainer}>
      <div className={style.titleToolbar}>
        <h1>{table.title()}</h1>
        <Toolbar toggleFilters={toggleFilters}/>
      </div>
      {showFilters && <Filters />}
      
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
  );
};

export default memo(TableView);
