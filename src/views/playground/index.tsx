import React, { FC, memo } from 'react'
import { useEntities } from 'services/entities'
import { useEntity } from 'services/entity'
import { useEntry } from 'services/entry'

const Playground: FC = () => {
  const entities = useEntities()
  const entity = useEntity('products')
  const [entry] = useEntry('products', { id: 1 })
  return (
    <div>
      <h1>Entities</h1>
      <pre>
        {JSON.stringify(entities, null, 4)}
      </pre>
      <h1>Entity</h1>
      <pre>
        {JSON.stringify(entity, null, 4)}
      </pre>
      <h1>Entity</h1>
      <pre>
        {JSON.stringify(entity, null, 4)}
      </pre>
      <h1>User entry</h1>
      <pre>
        {JSON.stringify(entry, null, 4)}
      </pre>
    </div>
  )
}

export default memo(Playground)