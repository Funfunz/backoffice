
import React, { FC, memo, useCallback } from 'react'
import style from './style.module.scss'

const ITEMS_PER_PAGE = [10, 15, 20, 25, 30]

export interface IPaginationSelectProps {
  itemsByPage: number
  setItemsByPage: (value: number) => void
}

const PaginationSelect: FC<IPaginationSelectProps> = ({ itemsByPage, setItemsByPage }) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsByPage(Number(event.currentTarget.value))
  }, [setItemsByPage])

  return (
    <div className={style.itemsByPage}>
      <span>Show</span>
      <select
        name="itemsShown"
        onChange={handleChange}
        value={itemsByPage}
      >
        {ITEMS_PER_PAGE.map((option: number, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default memo(PaginationSelect)