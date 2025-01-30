import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { registerStyles } from '../styles/styles';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [generalError, setGeneralError] = useState('');
  const [credentials, setCredentials] = useState(null); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Enter name'),
    lastName: Yup.string().required('Enter surname'),
    email: Yup.string().email('Enter a valid email').required('Enter email'),
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('/register', values);

      if (response.status === 200) {
        const { loginId, password } = response.data;

        if (loginId && password) {
          setCredentials({ loginId, password });
        } else {
          setGeneralError('Something went wrong');
        }
      } else {
        setGeneralError('Something went wrong');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setGeneralError(error.response.data.error);
      } else {
        setGeneralError('Something went wrong');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleProceed = () => {
    navigate('/login');
  };

  return (
    <div style={registerStyles.container}>
      <h2>Create An Account</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form style={registerStyles.form}>
            {generalError && <div style={registerStyles.error}>{generalError}</div>}
            <div style={registerStyles.fieldContainer}>
              <label htmlFor="firstName">Name</label>
              <Field type="text" name="firstName" style={registerStyles.input} />
              <ErrorMessage name="firstName" component="div" style={registerStyles.error} />
            </div>
            <div style={registerStyles.fieldContainer}>
              <label htmlFor="lastName">Surname</label>
              <Field type="text" name="lastName" style={registerStyles.input} />
              <ErrorMessage name="lastName" component="div" style={registerStyles.error} />
            </div>
            <div style={registerStyles.fieldContainer}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" style={registerStyles.input} />
              <ErrorMessage name="email" component="div" style={registerStyles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} style={registerStyles.button}>
              {isSubmitting ? 'Wait...' : 'Register'}
            </button>
            <div style={registerStyles.switch}>
              Do you already have an account? <Link to="/login">Log in</Link>
            </div>
          </Form>
        )}
      </Formik>

      
      {credentials && (
        <div style={registerStyles.credentialsContainer}>
          <h3>Registration completed successfully!</h3>
          <div style={registerStyles.credentialField}>
            <label htmlFor="loginId"><strong>Login ID:</strong></label>
            <input
              type="text"
              id="loginId"
              value={credentials.loginId}
              readOnly
              style={registerStyles.credentialInput}
              onClick={(e) => e.target.select()}
            />
          </div>
          <div style={registerStyles.credentialField}>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
              type="text"
              id="password"
              value={credentials.password}
              readOnly
              style={registerStyles.credentialInput}
              onClick={(e) => e.target.select()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
