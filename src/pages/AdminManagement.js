// src/pages/AdminManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with actual token management
      },
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching users', error);
    });
  }, []);

  const promoteToAdmin = (userId) => {
    axios.put('http://localhost:5000/api/users/promote', { userId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with actual token management
      },
    })
    .then(response => {
      setMessage(response.data.message);
      // Update the user's role in the local state
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
    })
    .catch(error => {
      console.error('Error promoting user', error);
    });
  };

  return (
    <div>
      <h1>Admin Management</h1>
      
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} ({user.role})
            {user.role !== 'admin' && (
              <button onClick={() => promoteToAdmin(user._id)}>Promote to Admin</button>
            )}
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminManagement;
