import React, { useState } from 'react'

const Admin = () => {
  const [localities, setLocalities] = useState([])
  const [newLocality, setNewLocality] = useState('')

  const addLocality = () => {
    if (newLocality) {
      setLocalities([...localities, newLocality])
      setNewLocality('')
    }
  }

  const editLocality = (index, newLocality) => {
    const updatedLocalities = [...localities]
    updatedLocalities[index] = newLocality
    setLocalities(updatedLocalities)
  }

  const removeLocality = (index) => {
    const updatedLocalities = [...localities]
    updatedLocalities.splice(index, 1)
    setLocalities(updatedLocalities)
  }

  const deleteAllLocalities = () => {
    setLocalities([])
  }

  return (
    <div>
      <h2>Localities</h2>
      <ul>
        {localities.map((locality, index) => (
          <li key={index}>
            {locality}{' '}
            <button
              onClick={() => editLocality(index, prompt('Edit Locality:'))}
            >
              Edit
            </button>
            <button onClick={() => removeLocality(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newLocality}
        onChange={(e) => setNewLocality(e.target.value)}
        placeholder="Enter Locality"
      />
      <button onClick={addLocality}>Add</button>
      <button onClick={deleteAllLocalities} disabled={!localities.length}>
        Delete All
      </button>
    </div>
  )
}

export default Admin
