import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Admin = () => {
  const [localities, setLocalities] = useState([])
  const [newLocality, setNewLocality] = useState('')

  useEffect(() => {
    fetchLocalities()
  }, [])

  const fetchLocalities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/locality')
      setLocalities(response.data.contacts)
      console.log(response)
    } catch (error) {
      console.error('Error fetching localities:', error)
    }
  }

  const addLocality = async () => {
    if (newLocality) {
      console.log('Swapnil')
      try {
        console.log(1)
        const response = await axios.post('http://localhost:5000/locality', {
          name: newLocality,
        })
        console.log(2)

        const res = await response.data
        console.log(3)

        console.log(res)
        if (res) {
          setNewLocality('')
        }
        //fetchLocalities()
      } catch (error) {
        console.error('Error adding locality:', error)
      }
    } else {
      console.log('nahi hai bhai')
    }
  }

  const editLocality = async (index, newLocality) => {
    try {
      if (!newLocality || newLocality.trim() === 0) {
        console.log('Enter the locality')
        return;
      }
      await axios.put(
        `http://localhost:5000/locality/${localities[index]._id}`,
        // `http://localhost:5000/locality?id=${localities[index]._id}`,
        { name: newLocality }
      )
      fetchLocalities()
    } catch (error) {
      console.error('Error editing locality:', error)
    }
  }

  const removeLocality = async (index) => {
    try {
      await axios.delete(
        `http://localhost:5000/locality/${localities[index]._id}`
      )
      fetchLocalities()
    } catch (error) {
      console.error('Error removing locality:', error)
    }
  }

  const deleteAllLocalities = async () => {
    try {
      await axios.delete('http://localhost:5000/locality')
      fetchLocalities()
    } catch (error) {
      console.error('Error deleting all localities:', error)
    }
  }

  return (
    <div>
      <h2>Localities</h2>
      <ul>
        {localities.map((locality, index) => (
          <li key={index}>
            {locality.name}{' '}
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
