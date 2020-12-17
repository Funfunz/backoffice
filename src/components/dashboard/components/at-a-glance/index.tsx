import React, { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';
import Widget from 'components/dashboard/components/widget';
import style from './style.module.scss';
import useEntityCountData from './useEntityCountData';

export interface IAtGlanceProps {
  entitiesFilter?: string[]
}

const AtGlance: FC<IAtGlanceProps> = ({
  entitiesFilter = []
}) => {
  const { entitiesList, loadedEntitiesCount } = useEntityCountData(entitiesFilter)

  return (
    <Widget>
      <div className={style.atGlanceContainer}>
        <p className={style.title}>At a Glance</p>
        {!loadedEntitiesCount ? (
          <p>Loading...</p>
        ) : (
          <div className={style.entitiesContainer}>
            {
              entitiesList?.map((entity) => {
               return (
                <p key={entity.name} className={style.entity}>
                  {entity.count}
                  <NavLink
                    to={`/table/${entity.name}`}
                    activeClassName={style.active}
                  >
                    {entity.label}
                  </NavLink>
                </p>
               ) 
              })
            }
        </div>
        )}
      </div>
    </Widget>
  );
};

export default memo(AtGlance);
