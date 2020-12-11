import React, { useEffect, useState, memo, FC } from 'react';
import { NavLink } from 'react-router-dom';
import useTables from 'hooks/useTables';
import Widget from './../widget';
import style from './style.module.scss';
import api from 'services/api';

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
  const [entities, setEntities] = useState<IEntityData[]>([]);

  useEffect(() => {
    if (loading) { 
      return;
    } else if (tables.length === 0) {
      setIsLoading(false);
      return;
    }

    const entities: IEntityData[] = [];
    const entitiesToCount: string[] = [];

    tables.forEach((table: any) => {
      let isToAddItem = entitiesFilter.length > 0 
                          ? table.name.indexOf(entitiesFilter) > -1 
                          : true;
      
      if(isToAddItem) {
        entitiesToCount.push(`${table.name}Count`);
        entities.push({
          name: table.name,
          label: table.layout.label,
          count: 0
        });
      }
    })

    api.post('/?', {
      body: JSON.stringify({
        query: `query {
          ${entitiesToCount.join()}
        }`,
      })
    }).then(result => {
      entities.map(entity => {
        entity.count = result.data[`${entity.name}Count`];
      })
      
      setEntities(entities);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
    })
  }, [loading])

  return (
    <Widget>
      <div className={style.atGlanceContainer}>
        <p className={style.title}>At a Glance</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={style.entitiesContainer}>
            {
              entities.map((entity: IEntityData) => {
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
