import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'reducers'
import { SET_QUANTITY_ITEMS_BY_PAGE, SET_CURRENT_PAGE } from 'reducers/table'
import tableService from 'services/api/models/table'
import { paginationConfig } from 'utils/tableConfig'
import style from './style.module.scss'

export interface IPaginationProps {}

const Pagination: FC<IPaginationProps> = () => {
  const { tableName = '' } = useParams<any>()
  const { tableConfig, itemsByPage, pagination, page } = useSelector((state) => {
    return {
      tableConfig: state.tables.find((table) => table.name === tableName),
      itemsByPage: state.itemsByPage,
      page: state.page,
      pagination: state.pagination
    }
  })

  useEffect(() => {
    if (tableConfig?.properties) {
      tableService.getEntityItemsCount(tableConfig, itemsByPage)
    }
  }, [itemsByPage, tableConfig])

  const handleChangeItemsShown = useCallback(
    (event) => {
      const value = event.target.value
      dispatch({
        type: SET_QUANTITY_ITEMS_BY_PAGE,
        payload: parseInt(value),
      })
    },
    []
  )

  const handleChangePage = useCallback(
    (pageNumber: number) => () => {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: pageNumber
      })
    },
    []
  )

  const isActive = useCallback((selectedPage, currentPage) => {
    return selectedPage === currentPage ? style.active : ''
  }, [])

  return (
    <div className={style.pagination}>
      <div className={style.pages}>
        <div className={style.item} onClick={handleChangePage(0)}>
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className={style.item} onClick={handleChangePage(page - 1)}>
          <i className="fas fa-chevron-left"></i>
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
          <i className="fas fa-chevron-right"></i>
        </div>
        <div
          className={style.item}
          onClick={handleChangePage(
            pagination[pagination.length - 1]
          )}
        >
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className={style.itemsByPage}>
        <span>Show</span>
        <select
          name="itemsShown"
          onChange={handleChangeItemsShown}
          value={itemsByPage}
        >
          {paginationConfig.itemsPerPage.options.map((option: number, index: number) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default memo(Pagination)
