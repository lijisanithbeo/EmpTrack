import React, { useState } from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EmployeeList({ employees, setEmployees }) {
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({ id: '', name: '', jobtitle: '', email: '' });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.id);
    setEditedEmployee(employee);
  };

  const handleSaveClick = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === editedEmployee.id ? editedEmployee : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEditingEmployeeId(null);
  };

  const handleDeleteClick = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2>Employee List</h2>
      <Button variant="primary" onClick={() => navigate('/AddEmployee')}>
        Add Employee
      </Button>
      <div className="d-flex justify-content-end">
    <Form.Group controlId="formSearch" className="mt-3" style={{ width: '250px' }}>
      <Form.Control
        type="text"
        placeholder="Search for an employee..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form.Group>
  </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                {editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedEmployee.name}
                    onChange={handleChange}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editingEmployeeId === employee.id ? (
                  <input
                    type="text"
                    name="jobtitle"
                    value={editedEmployee.jobtitle}
                    onChange={handleChange}
                  />
                ) : (
                  employee.jobtitle
                )}
              </td>
              <td>
                {editingEmployeeId === employee.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedEmployee.email}
                    onChange={handleChange}
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {editingEmployeeId === employee.id ? (
                  <Button variant="success" onClick={handleSaveClick}>
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EmployeeList;
