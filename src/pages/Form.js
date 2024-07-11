import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const FormPage = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(''); // State to manage success message

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  // const apiUrl = 'http://localhost:5000';

  const initialValues = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    axios.post(`${apiUrl}/api/forms/submit-form`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setMessage('Form Successfully Submitted');
        resetForm(); // Reset the form fields after successful submission
      })
      .catch(error => {
        console.error('There was an error!', error);
        setMessage('There was an error submitting the form'); // Error message
      });
  };

  if (!user) {
    return <div>Please log in to submit the form</div>;
  }

  return (
    <div>
      <h1>Submit Form</h1>
      
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  );
};

export default FormPage;
