export const loginStyles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom : "10px"
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};


export const registerStyles = {
  container: {
    ...loginStyles.container, 
  },
  form: {
    ...loginStyles.form,
  },
  fieldContainer: {
    ...loginStyles.fieldContainer,
  },
  input: {
    ...loginStyles.input,
  },
  button: {
    ...loginStyles.button,
  },
  error: {
    ...loginStyles.error,
  },
  switch: {
    ...loginStyles.switch,
  },
  credentialsContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #28a745',
    borderRadius: '5px',
    backgroundColor: '#e6ffe6',
    textAlign: 'left',
  },
  credentialField: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  credentialLabel: {
    width: '80px',
    fontWeight: 'bold',
  },
  credentialInput: {
    width: 'calc(100% - 90px)',
    padding: '8px',
    marginLeft : "3px",
    border: '1px solid #ccc',
    borderRadius: '4px',
    //backgroundColor: '#f1f1f1',
    cursor: 'pointer',
  },
  proceedButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '15px',
    width: '100%',
  },
};

export const panelStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#2e3b4e',
    color: '#fff',
    padding: '10px 20px',
  },
  title: {
    fontSize: '1.5rem',
  },
  navItems: {
    marginLeft: 'auto',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  activeBtn: {
    backgroundColor: '#44566c',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  logoutBtn: {
    backgroundColor: '#c0392b',
    border: 'none',
    color: '#fff',
    padding: '8px 12px',
    cursor: 'pointer',
    marginLeft: '20px',
  },
  content: {
    flex: 1,
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    overflow: 'auto',
  },

  dropdownContainer: {
    marginLeft: 'auto',
    position: 'relative',
  },
  menuButton: {
    backgroundColor: '#2e3b4e',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '40px',
    backgroundColor: '#2e3b4e',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
};