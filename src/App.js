import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from './Components/EmployeeList';
import AddEmployee from './Components/AddEmployee';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Custom CSS if needed

function App() {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem('employees')) || []
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]); // Ensure unique ID
  };

  const handleLogin = (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials!');
    }
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login handleLogin={handleLogin} />} />
        ) : (
          <>
            <Route
              path="/EmployeeList"
              element={<EmployeeList employees={employees} setEmployees={setEmployees} />}
            />
            <Route
              path="/AddEmployee"
              element={<AddEmployee addEmployee={addEmployee} />}
            />
            <Route path="/" element={<Navigate to="/EmployeeList" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
