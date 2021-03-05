import React, { FC, memo } from 'react'
import { useEntities } from 'hooks/useEntities'
import { useEntity } from 'hooks/useEntity'
import { useEntry } from 'hooks/useEntry'
import { mapFieldComponents } from 'utils/fields'

const Playground: FC = () => {
  const entities = useEntities()
  const entity = useEntity('products')
  const { entry, setEntry, saveEntry } = useEntry(entity, { id: 1 })
  const { entry: newEntry, setEntry: setNewEntry, saveEntry: addEntry } = useEntry(entity)

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
      <h1>User entry</h1>
      <pre>
        {JSON.stringify(entry, null, 4)}
      </pre>
      <h1>Update entry</h1>
      {mapFieldComponents(entity).map((field, index) =>
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
      <h1>Add entry</h1>
      {mapFieldComponents(entity).map((field, index) =>
        // match `field.component` to correct React component
        // pass `field.props` to that component
        <div key={index}>
          <label>{field.props.label}</label><br />
          <input 
            {...field.props} 
            onChange={(event) => setNewEntry((entry) => ({...newEntry, [event.target.name]: event.target.value}))} 
            value={newEntry[field.props.name] as string || ''} />
        </div>
        
      )}
      <button onClick={addEntry}>Add</button>
    </div>
  )
}

export default memo(Playground)