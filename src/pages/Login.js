import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginStyles } from '../styles/styles';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    loginId: '',
    password: '',
  };

  const validationSchema = Yup.object({
    loginId: Yup.string().required('Enter Login ID'),
    password: Yup.string().required('Enter Password'),
  });

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('/login', values);
      if (response.status === 200) {
        login(response.data.role); 
      } else {
        setFieldError('general', 'Something is wrong');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage === 'Login id or password is wrong') {
          setFieldError('general', 'Login id or password is wrong');
        } 
        else if (errorMessage === 'Logout first!') {
          setFieldError('general', 'You should logout first!');
        } else {
          setFieldError('general', errorMessage);
        }
      } else {
        setFieldError('general', 'Something is wrong');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form style={loginStyles.form}>
            {errors.general && <div style={loginStyles.error}>{errors.general}</div>}
            <div style={loginStyles.fieldContainer}>
              <label htmlFor="loginId">Login ID</label>
              <Field type="text" name="loginId" style={loginStyles.input} />
              <ErrorMessage name="loginId" component="div" style={loginStyles.error} />
            </div>
            <div style={loginStyles.fieldContainer}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" style={loginStyles.input} />
              <ErrorMessage name="password" component="div" style={loginStyles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} style={loginStyles.button}>
              {isSubmitting ? 'Wait...' : 'Login'}
            </button>
            <div style={loginStyles.switch}>
              Don't you have an account? <Link to="/register">Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
