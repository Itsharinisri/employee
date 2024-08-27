import React from 'react';

const FormComponent = ({ employee, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Employee Name:</label>
        <input 
          type="text" 
          name="name" 
          value={employee.name} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Employee ID:</label>
        <input 
          type="text" 
          name="employeeId" 
          value={employee.employeeId} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={employee.phoneNumber} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={employee.address} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Email ID:</label>
        <input 
          type="email" 
          name="email" 
          value={employee.email} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Age:</label>
        <input 
          type="number" 
          name="age" 
          value={employee.age} 
          onChange={handleChange} 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
