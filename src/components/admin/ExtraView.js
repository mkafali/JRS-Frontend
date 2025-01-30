import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const ExtraView = () => {
  // CREATE HR form
  const [hrUserId, setHrUserId] = useState('');
  const [hrCompanyId, setHrCompanyId] = useState('');
  
  // CREATE COMPANY form
  const [companyName, setCompanyName] = useState('');

  // State to store users for the dropdown
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // State to store companies for the dropdown
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState(null);

  // Fetch users for the HR dropdown
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/candidates'); // Adjust the endpoint as needed
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setUsersError('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch companies for the company dropdown (optional)
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('/admin/companies'); 
      setCompanies(response.data);
    } catch (err) {
      console.error('Failed to fetch companies:', err);
      setCompaniesError('Failed to load companies');
    } finally {
      setLoadingCompanies(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  const handleCreateHr = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        userId: parseInt(hrUserId, 10),
        companyId: parseInt(hrCompanyId, 10),
      };
      await axios.post('/admin/hr', reqBody);
      alert('HR created successfully!');
      setHrUserId('');
      setHrCompanyId('');
      //Refetch
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to create HR');
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();

    // Trim the company name to remove leading/trailing spaces
    const trimmedCompanyName = companyName.trim();

    // Check if the company name already exists (case-insensitive)
    const companyExists = companies.some(
      (company) => company.name.toLowerCase() === trimmedCompanyName.toLowerCase()
    );

    if (companyExists) {
      alert('Company already exists');
      return; // Prevent form submission
    }

    try {
      const reqBody = {
        name: trimmedCompanyName,
      };
      await axios.post('/admin/company', reqBody);
      alert('Company created successfully!');
      setCompanyName('');
      // Refetch companies to include the new company
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert('Failed to create company');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Extra Admin Functions</h2>

      <div style={styles.formBlock}>
        <h3>Create HR</h3>
        <form onSubmit={handleCreateHr} style={styles.form}>
          {/* User Dropdown */}
          <label>User:</label>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : usersError ? (
            <p style={{ color: 'red' }}>{usersError}</p>
          ) : (
            <select
              value={hrUserId}
              onChange={(e) => setHrUserId(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.firstName} {user.lastName} (ID: {user.userId})
                </option>
              ))}
            </select>
          )}

          {/* Company Dropdown */}
          <label>Company:</label>
          {loadingCompanies ? (
            <p>Loading companies...</p>
          ) : companiesError ? (
            <p style={{ color: 'red' }}>{companiesError}</p>
          ) : (
            <select
              value={hrCompanyId}
              onChange={(e) => setHrCompanyId(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">-- Select Company --</option>
              {companies.map((company) => (
                <option key={company.companyId} value={company.companyId}>
                  {company.name} (ID: {company.companyId})
                </option>
              ))}
            </select>
          )}

          <button type="submit" style={styles.button} disabled={loadingUsers || loadingCompanies}>
            Create HR
          </button>
        </form>
      </div>

      <div style={styles.formBlock}>
        <h3>Create Company</h3>
        <form onSubmit={handleCreateCompany} style={styles.form}>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loadingCompanies}>
            Create Company
          </button>
        </form>
      </div>
    </div>
  );
};
const styles = {
  container: {
    textAlign: 'center',
  },
  formBlock: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    margin: '20px auto',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
    textAlign: 'left',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
};

export default ExtraView;
