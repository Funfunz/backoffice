import React, { FC, memo, useCallback, useState } from 'react'
import classNames from 'classnames'

import Button from 'components/Button'
import { IFilter } from 'services/entry'

import classes from './style.module.scss'

export interface IFiltersProps {
  filters?: IFilter
  setFilter?: (newFilter: IFilter) => void
}

const Filters: FC<IFiltersProps> = () => {

  const [showFilters, setShowFilters] = useState(false)
  const toggle = useCallback(() => {
    setShowFilters((v) => !v)
  }, [setShowFilters])

  return <>
    <Button
      prefix={<i className="fas fa-filter"></i>}
      label="FILTERS"
      onClick={toggle}
      color='secondary'
    />
    <div className={classNames({
      [classes.filters]: true,
      [classes.showFilters]: showFilters
    })}>
      Filters...
    </div>
  </>
}

export default memo(Filters)