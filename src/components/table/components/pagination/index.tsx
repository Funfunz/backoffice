import React, { FC, memo, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'reducers'
import { SET_QUANTITY_ITEMS_BY_PAGE, SET_CURRENT_PAGE } from 'reducers/table'
import tableService from 'services/api/models/table'
import { paginationConfig } from 'utils/tableConfig'
import style from './style.module.scss'

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

  const pageNumberButton = useCallback((index) => {
    return (
      <div
          className={[style.item, style.clickable, isActive(index, page) ].join(' ')}
          key={index}
          onClick={handleChangePage(index)}
        >
          {index + 1}
        </div>
    )
  },[page])

  const pageDotButton = useCallback((index) => {
    return (
      <div className={style.item} key={index}>
        ...
      </div>
    )
  },[])

  const drawPaginationNumbers = useCallback(() => {
    if (pagination.length <= MAX_PAGE_NUMBERS) {
      return pagination.map((index: number) => pageNumberButton(index))
    }  

    const pageNumbers = []

    let startIndex = page - MAX_DISTANCE_FROM_CURRENT
    if (startIndex <= 0) {
      startIndex = 1
    }

    let lastIndex = page + MAX_DISTANCE_FROM_CURRENT
    if (lastIndex >= pagination.length - 1) {
      lastIndex = pagination.length - 2
    }

    pageNumbers.push(pageNumberButton(0))

    if (startIndex > 1) {
      pageNumbers.push(pageDotButton('dot-before'))
    }

    for (let i = startIndex ; i <= lastIndex; i++) {
      pageNumbers.push(pageNumberButton(i))
    }

    if ((pagination.length - 1) - lastIndex > 1) {
      pageNumbers.push(pageDotButton('dot-after'))
    }

    pageNumbers.push(pageNumberButton(pagination.length - 1))

    return pageNumbers

  }, [pagination, page])

  return (
    <div className={style.pagination}>
      <div className={style.pages}>
        <div className={[style.item, style.clickable].join(' ')} onClick={handleChangePage(0)}>
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div 
          className={[style.item, style.clickable].join(' ')} 
          onClick={handleChangePage(page - 1)}>
          <i className="fas fa-chevron-left"></i>
        </div>

        {drawPaginationNumbers()}

        <div className={[style.item, style.clickable].join(' ')} onClick={handleChangePage(page + 1)}>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div
          className={[style.item, style.clickable].join(' ')}
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
