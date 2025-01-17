// src/pages/Register.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    setLoading(true); // Set loading to true
    axios.post(`${apiUrl}/api/users/register`, values)
      .then(response => {
        setLoading(false); // Set loading to false
        navigate('/login'); // Redirect to the login page
      })
      .catch(error => {
        setLoading(false); // Set loading to false
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {loading ? (
        <p>User is getting Register...</p>
      ) : (
        <>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit">Register</button>
            </Form>
          </Formik>
          <p>Have an account? <Link to="/login">Login</Link></p>
        </>
      )}
    </div>
  );
};

export default Register;
