import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dispatch, useSelector } from 'reducers';
import { FETCH_TABLE_CHANGE_ITEMS_BY_PAGE } from 'reducers/table';
import tableService from 'services/api/models/table';
import style from './style.module.scss';

export interface IPaginationProps {}

const Pagination: FC<IPaginationProps> = () => {
  const { tableName = '' } = useParams<any>();
  const [numbersPagination, setNumbersPagination] = useState<any>([]);
  const [page, setPage] = useState(0);
  const { tableConfig, itemsByPage } = useSelector((state) => {
    return {
      tableConfig: state.tables.find((table) => table.name === tableName),
      itemsByPage: state.itemsByPage,
    };
  });

  useEffect(() => {
    if (tableConfig?.properties) {
      tableService.getAllItemsNumber(tableConfig).then((items) => {
        const itemsPagination = items / itemsByPage;
        let pagination = [];
        for (let i = 0; i < itemsPagination; i++) {
          pagination.push(i);
        }
        setNumbersPagination(pagination);
      });
    }
  }, [itemsByPage, tableConfig]);

  const updateTable = useCallback(
    (take, p) => {
      const newSkip = p === 0 ? 0 : itemsByPage * p;
      if (tableConfig?.properties) {
        tableService.getTableData(tableConfig, {
          skip: newSkip,
          take: take,
        });
      }
    },
    [itemsByPage, tableConfig]
  );

  const handleChangeItemsShown = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch({
        type: FETCH_TABLE_CHANGE_ITEMS_BY_PAGE,
        payload: parseInt(value),
      });
      updateTable(value, page);
    },
    [page, updateTable]
  );

  const handleChangePage = useCallback(
    (p: number) => () => {
      setPage(p);
      updateTable(itemsByPage, p);
    },
    [itemsByPage, updateTable]
  );

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
        {numbersPagination.map((index: number) => (
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
            numbersPagination[numbersPagination.length - 1]
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
