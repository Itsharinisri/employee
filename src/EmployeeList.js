import React from 'react';
import './App.css';

const EmployeeList = ({ employees, onDelete }) => {
  return (
    <div className="container">
      <h1>Employee List</h1>
      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <div key={index}>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
            <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Email ID:</strong> {employee.email}</p>
            <p><strong>Age:</strong> {employee.age}</p>
            <button onClick={() => onDelete(employee.employeeId)}>Delete Employee</button>
          </div>
        ))
      ) : (
        <p>No employee details available.</p>
      )}
    </div>
  );
};

export default EmployeeList;
