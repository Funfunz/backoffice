import React, { useEffect, useRef, useState, memo, FC } from 'react';
import { NavLink } from 'react-router-dom';
import useTables from 'hooks/useTables';
import Widget from 'components/dashboard/components/widget';
import style from './style.module.scss';
import getEntitiesCount from 'services/api/getEntitiesCount';
import { useSelector } from 'reducers';

export interface IAtGlanceProps {
  entitiesFilter?: string[]
}

export interface IEntityData {
  name: string,
  label: string,
  count: number
}

const AtGlance: FC<IAtGlanceProps> = ({
  entitiesFilter = []
}) => {
  const { tables, loading } = useTables();
  const [isLoading, setIsLoading] = useState(true);
  const entities = useRef<IEntityData[]>([]);

  const { entitiesCount, loadingEntitiesCount } = useSelector((state) => {
    return {
      entitiesCount: state.entitiesCount,
      loadingEntitiesCount: state.loadingEntitiesCount
    };
  });

  useEffect(() => {
    if (loading) { 
      return;
    } else if (tables.length === 0) {
      setIsLoading(false);
      return;
    }

    const entitiesList: IEntityData[] = [];

    tables.forEach((table: any) => {
      let isToAddItem = entitiesFilter.length > 0 
                          ? table.name.indexOf(entitiesFilter) > -1 
                          : true;
      
      if(isToAddItem) {
        entitiesList.push({
          name: table.name,
          label: table.layout.label,
          count: 0
        });
      }
    })

    entities.current = entitiesList;
    const entitiesNamesToCount = entitiesList.map(entity => entity.name);
    getEntitiesCount(entitiesNamesToCount);
  }, [loading])

  useEffect(()=> {
    if (loading || loadingEntitiesCount) {
      return;
    } 

    entities.current.forEach(entity => {
      entitiesCount.forEach(newEntity => {
        if (entity.name === newEntity.entity) {
          entity.count = newEntity.count
        }
      })
    })
    
    setIsLoading(false);
  },[entitiesCount])

  return (
    <Widget>
      <div className={style.atGlanceContainer}>
        <p className={style.title}>At a Glance</p>
        {isLoading || loadingEntitiesCount ? (
          <p>Loading...</p>
        ) : (
          <div className={style.entitiesContainer}>
            {
              entities.current.map((entity: IEntityData) => {
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
