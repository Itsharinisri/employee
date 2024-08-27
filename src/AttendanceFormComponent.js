import React from 'react';

const AttendanceFormComponent = ({ attendance, handleChange, handleStatusChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input 
          type="text" 
          name="employeeId" 
          value={attendance.employeeId} 
          onChange={handleChange} 
          required 
        />
      </label><br></br><br></br>
      <label>
        Employee Name:
        <input 
          type="text" 
          name="employeeName" 
          value={attendance.employeeName} 
          onChange={handleChange} 
          required 
        />
      </label><br></br><br></br>
      <label>
        Date:
        <input 
          type="date" 
          name="date" 
          value={attendance.date} 
          onChange={handleChange} 
          required 
        />
      </label>
      <div>
        <button 
          type="button" 
          className="present" 
          onClick={() => handleStatusChange('Present')}
        >
          Present
        </button>
        <button 
          type="button" 
          onClick={() => handleStatusChange('Absent')}
        >
          Absent
        </button>
      </div>
      <button type="submit">Submit Attendance</button>
    </form>
  );
};

export default AttendanceFormComponent;
