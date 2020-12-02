import React, { FC, memo } from 'react'
import Button from 'components/button'

import style from './style.module.scss';

export interface IFiltersProps {
}


const Filters: FC<IFiltersProps> = () => {
  return (
    <div className={style.filters}>
      <div className={style.filtersContainer}>
        <div className={style.filter}>
          <span>Class</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className={style.filter}>
          <span>Published</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className={style.filter}>
          <span>Pre-approved</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
      <div className={style.actions}>
        <Button label="CANCEL" onClick={() => {}} style={{backgroundColor: "transparent", fontSize: "12px", color: "#818181", border: 'none', padding: '10px 30px'}}/>
        <Button label="APPLY" onClick={() => {}} style={{backgroundColor: "#DCA50B", fontSize: "12px", color: "white", border: 'none', padding: '10px 30px'}}/>
      </div>
    </div>
  )
}

export default memo(Filters)