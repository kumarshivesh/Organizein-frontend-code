import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  const promoteToAdmin = async (userId) => {
    try {
      const response = await axios.put(`${apiUrl}/api/users/promote`, { userId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(response.data.message);
      // Update the user's role in the local state
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'admin' } : user));
    } catch (error) {
      console.error('Error promoting user', error);
    }
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
