import './AdminDashboard.css'
import { useState } from 'react'

// Mock user data
const mockUsers = [
  { id: 1, xrpAddress: 'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', storageUsed: 1024 * 1024, storageLimit: 1024 * 1024 * 10 },
  { id: 2, xrpAddress: 'r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV', storageUsed: 512 * 1024, storageLimit: 1024 * 1024 * 5 },
  // Add more mock users as needed
]

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers)
  const [newStorageLimit, setNewStorageLimit] = useState('')

  const handleStorageLimitChange = (e, userId) => {
    setNewStorageLimit(e.target.value)
  }

  const adjustStorageLimit = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, storageLimit: parseInt(newStorageLimit) * 1024 * 1024 } 
        : user
    ))
    setNewStorageLimit('')
  }

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div className="container">
          <h1 className="hero-title">Admin Dashboard</h1>
          <p className="hero-subtitle">
            Manage wallet configurations, storage options, user roles, API settings, and user accounts.
          </p>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          <div className="admin-grid">
            {/* Previous admin cards */}
            <div className="admin-card">
              <h3>User Management</h3>
              <div className="user-management">
                <p>Total Users: {users.length}</p>
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>XRP Address</th>
                      <th>Storage Used</th>
                      <th>Storage Limit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.xrpAddress}</td>
                        <td>{(user.storageUsed / (1024 * 1024)).toFixed(2)} MB</td>
                        <td>
                          <input 
                            type="number" 
                            value={newStorageLimit || (user.storageLimit / (1024 * 1024)).toFixed(2)} 
                            onChange={(e) => handleStorageLimitChange(e, user.id)}
                            placeholder="New Limit (MB)"
                          />
                          <button 
                            className="button button-secondary" 
                            onClick={() => adjustStorageLimit(user.id)}
                          >
                            Adjust
                          </button>
                        </td>
                        <td>
                          <button 
                            className="button button-secondary" 
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
