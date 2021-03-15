import React, { FC, memo, useCallback, useMemo } from 'react'
import PageItem from './PageItem'
import PaginationSelect from './PaginationSelect'
import style from './style.module.scss'

const MAX_PAGE_NUMBERS = 6

export interface IPaginationProps {
  skip?: number
  take?: number
  setTake: (take: number) => void
  total?: number
  setSkip: (page: number) => void
}

const Pagination: FC<IPaginationProps> = ({ take = 10, setTake, total = 1, skip = 0, setSkip }) => {
  
  const currentPage = useMemo(() => Math.floor(skip / take), [skip, take])

  const lastPage = useMemo(() => Math.ceil(total/take) - 1, [total, take])
  
  const firstPage = useMemo(() => {
    return Math.min(
      Math.max(currentPage - Math.ceil(MAX_PAGE_NUMBERS/2), 0), 
      Math.max(lastPage - MAX_PAGE_NUMBERS, 0)
    )
  }, [currentPage, lastPage])

  const setPage = useCallback((page: number) => {
    setSkip(page <= 0
      ? 0
      : page > lastPage
        ? lastPage*take
        : page*take
    )
  }, [setSkip, lastPage, take])

  return (
    <div className={style.pagination}>
      <div className={style.pages}>

        <PageItem onClick={setPage.bind(null, 0)}>
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-left"></i>
        </PageItem>
        
        <PageItem onClick={setPage.bind(null, currentPage - 1)}>
          <i className="fas fa-chevron-left"></i>
        </PageItem>

        {[...Array(MAX_PAGE_NUMBERS)].map(
          (_, index) => {
            const pageNum = firstPage + index
            return pageNum <= lastPage && (
              <PageItem
                active={currentPage === pageNum}
                key={index}
                onClick={setPage.bind(null, firstPage + index)}
              >
                {pageNum + 1}
              </PageItem>
            )
          }
        )}

        <PageItem onClick={setPage.bind(null, currentPage + 1)}>
          <i className="fas fa-chevron-right"></i>
        </PageItem>

        <PageItem onClick={setPage.bind(null, lastPage)}>
          <i className="fas fa-chevron-right"></i>
          <i className="fas fa-chevron-right"></i>
        </PageItem>
      </div>

      <PaginationSelect
        itemsByPage={take}
        setItemsByPage={setTake}
      />
      
    </div>
  )
}

export default memo(Pagination)