import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [forms, setForms] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/forms/admin/forms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setForms(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchForms();
  }, [apiUrl]);

  return (
    <div>
      <h1>Submitted Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form._id}>
            <h2>{form.title}</h2>
            <p>{form.description}</p>
            <p>Submitted by: {form.user.username} ({form.user.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
