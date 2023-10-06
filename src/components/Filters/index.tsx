import { FC, memo, useCallback, useState, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import Button from 'components/Button'
import { IFilter } from 'services/entry'
import classes from './style.module.scss'

export interface IFiltersProps {
  filters?: IFilter
  clearFilters: () => void
  children?: ReactNode
}

const Filters: FC<IFiltersProps> = ({ children, filters = {}, clearFilters }) => {

  const [showFilters, setShowFilters] = useState(false)
  const toggle = useCallback(() => {
    setShowFilters((v) => !v)
  }, [setShowFilters])

  const numFilters = useMemo(() => Object.keys(filters).length, [filters])
  return <>
    <Button
      active={showFilters}
      prefix={<i className="fas fa-filter"></i>}
      label={`FILTERS ${numFilters ? `(${numFilters})` : ''}`}
      onClick={toggle}
      color='secondary'
    />
    {((numFilters > 0) && (
      <Button
        className={classes.clearFilters}
        prefix={<i className="fas fa-close"></i>}
        label='CLEAR FILTERS'
        onClick={clearFilters}
        color='secondary'
      />
    )) || null}
    <div className={classNames({
      [classes.filters]: true,
      [classes.showFilters]: showFilters
    })}>
      {children}
    </div>
  </>
}

export default memo(Filters)