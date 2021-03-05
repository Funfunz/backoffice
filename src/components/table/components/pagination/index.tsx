import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'reducers'
import { SET_QUANTITY_ITEMS_BY_PAGE, SET_CURRENT_PAGE } from 'reducers/entity'
import tableService from 'services/table'
import { paginationConfig } from 'utils/tableConfig'
import style from './style.module.scss'
import PaginationNumber from 'components/table/components/pagination-number'

export interface IPaginationProps {}

const MAX_PAGE_NUMBERS = 3
const MAX_DISTANCE_FROM_CURRENT = 1

const Pagination: FC<IPaginationProps> = () => {
  const { tableName = '' } = useParams<any>()
  const { tableConfig, itemsByPage, pagination, page, selectedFilters } = useSelector((state) => {
    return {
      tableConfig: state.tables.find((table) => table.name === tableName),
      itemsByPage: state.itemsByPage,
      page: state.page,
      pagination: state.pagination,
      selectedFilters: state.selectedFilters
    }
  })

  useEffect(() => {
    if (tableConfig?.properties) {
      tableService.getEntityItemsCount(tableConfig, itemsByPage, selectedFilters)
    }
  }, [itemsByPage, tableConfig, selectedFilters])

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
    (pageNumber: number) =>  {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: pageNumber
      })
    },
    []
  )

  const drawPaginationNumbers = useCallback(() => {
    if (pagination.length <= MAX_PAGE_NUMBERS) {
      return pagination.map((index: number) => (
        <PaginationNumber 
          index={index} 
          currentPage={page} 
          isClickable
          onChangePage={handleChangePage}
        />
      )
    )}  

    const pageNumbers = []

    let startIndex = page - MAX_DISTANCE_FROM_CURRENT
    if (startIndex <= 0 || startIndex - 1 === 1) {
      startIndex = 1
    }

    let lastIndex = page + MAX_DISTANCE_FROM_CURRENT
    if (lastIndex >= pagination.length - 1 || (pagination.length - 2) - lastIndex === 1) {
      lastIndex = pagination.length - 2
    }

    pageNumbers.push(
    <PaginationNumber 
      key={0}
      index={0} 
      currentPage={page} 
      isClickable 
      onChangePage={handleChangePage}
    /> 
    )

    if (startIndex > 1) {
      pageNumbers.push(<PaginationNumber key={-1} index={-1} />)
    }

    for (let i = startIndex ; i <= lastIndex; i++) {
      pageNumbers.push(
        <PaginationNumber 
          key={i}
          index={i} 
          currentPage={page} 
          isClickable
          onChangePage={handleChangePage}
        />
      )
    }

    if ((pagination.length - 1) - lastIndex > 1) {
      pageNumbers.push(<PaginationNumber  key={-2} index={-2} />)
    }

    pageNumbers.push(
      <PaginationNumber 
        key={pagination.length - 1}
        index={pagination.length - 1} 
        currentPage={page} 
        isClickable 
        onChangePage={handleChangePage}
      /> 
    )

    return pageNumbers

  }, [pagination, page, handleChangePage])

  return (
    <div className={style.pagination}>
      <div className={style.pages}>
        <div className={style.item} onClick={() => handleChangePage(0)}>
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div 
          className={style.item} 
          onClick={() => handleChangePage(page - 1)}>
          <i className="fas fa-chevron-left"></i>
        </div>

        {drawPaginationNumbers()}

        <div className={style.item} onClick={() => handleChangePage(page + 1)}>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div
          className={style.item}
          onClick={() => handleChangePage(
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
