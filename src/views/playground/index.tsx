import React, { FC, memo } from 'react'
import { useEntities } from 'services/entities'
import { useEntity } from 'services/entity'
import { useEntry } from 'services/entry'

const Playground: FC = () => {
  const entities = useEntities()
  const entity = useEntity('products')
  const [entry, setEntry, saveEntry] = useEntry(entity, { id: 1 })

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
      {entity.fields.map((field, index) =>
        // match `field.component` to correct React component
        // pass `field.props` to that component
        <div key={index}>
          <label>{field.props.label}</label><br />
          <input 
            {...field.props} 
            onChange={(event) => setEntry((entry) => ({...entry, [event.target.name]: event.target.value}))} 
            value={entry[field.props.name] as string || ''} />
        </div>
        
      )}
      <button onClick={saveEntry}>Save</button>
    </div>
  )
}

export default memo(Playground)