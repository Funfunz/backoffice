import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dispatch, useSelector } from 'reducers';
import { SET_QUANTITY_ITEMS_BY_PAGE } from 'reducers/table';
import tableService from 'services/api/models/table';
import style from './style.module.scss';

export interface IPaginationProps {}

const Pagination: FC<IPaginationProps> = () => {
  const { tableName = '' } = useParams<any>();
  const [page, setPage] = useState(0);
  const { tableConfig, itemsByPage, pagination } = useSelector((state) => {
    return {
      tableConfig: state.tables.find((table) => table.name === tableName),
      itemsByPage: state.itemsByPage,
      pagination: state.pagination
    };
  });

  useEffect(() => {
    if (tableConfig?.properties) {
      tableService.getEntityItemsCount(tableConfig, itemsByPage)
    }
  }, [itemsByPage, tableConfig]);



  const updateTable = (take: number, p: number) => {
    if (tableConfig?.properties) {
      tableService.getTableData(tableConfig, {
        skip: itemsByPage * p,
        take: take,
      });
    }
  }

  const handleChangeItemsShown = (e: any) => {
    const value = e.target.value;
    dispatch({
      type: SET_QUANTITY_ITEMS_BY_PAGE,
      payload: parseInt(value),
    });
    updateTable(value, page);
  };

  const handleChangePage = (p: number) => () => {
    setPage(p);
    updateTable(itemsByPage, p);
  };

  const isActive = useCallback((selectedPage, currentPage) => {
    return selectedPage === currentPage ? style.active : '';
  }, []);

  return (
    <div className={style.pagination}>
      <div className={style.pages}>
        <div className={style.item} onClick={handleChangePage(0)}>
          &#8810;
        </div>
        <div className={style.item} onClick={handleChangePage(page - 1)}>
          &#60;
        </div>
        {pagination.map((index: number) => (
          <div
            className={[style.item, isActive(index, page)].join(' ')}
            key={index}
            onClick={handleChangePage(index)}
          >
            {index + 1}
          </div>
        ))}
        <div className={style.item} onClick={handleChangePage(page + 1)}>
          &#62;
        </div>
        <div
          className={style.item}
          onClick={handleChangePage(
            pagination[pagination.length - 1]
          )}
        >
          &#8811;
        </div>
      </div>
      <div className={style.itemsByPage}>
        <span>Show</span>
        <select
          name="itemsShown"
          onChange={handleChangeItemsShown}
          value={itemsByPage}
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default memo(Pagination);
