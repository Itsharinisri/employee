import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import EmployeeList from './EmployeeList';
import About from './About';
import AttendancePage from './AttendancePage';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: JSON.parse(localStorage.getItem('employees')) || [],
      attendance: JSON.parse(localStorage.getItem('attendance')) || [],
      message: '',
    };
  }

  updateLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(this.state.employees));
    localStorage.setItem('attendance', JSON.stringify(this.state.attendance));
  };

  handleEmployeeSubmit = (employee) => {
    this.setState(
      (prevState) => ({
        employees: [...prevState.employees, employee],
        message: 'Employee details submitted successfully!',
      }),
      this.updateLocalStorage
    );
  };

  handleAttendanceSubmit = (attendanceRecord) => {
    this.setState(
      (prevState) => ({
        attendance: [...prevState.attendance, attendanceRecord],
        message: 'Attendance record submitted successfully!',
      }),
      this.updateLocalStorage
    );
  };

  handleDelete = (employeeId) => {
    this.setState(
      (prevState) => ({
        employees: prevState.employees.filter((emp) => emp.employeeId !== employeeId),
        attendance: prevState.attendance.filter((record) => record.employeeId !== employeeId),
        message: 'Employee record deleted successfully!',
      }),
      this.updateLocalStorage
    );
  };

  calculateAttendancePercentage = (employeeId) => {
    const { attendance } = this.state;
    const currentMonth = new Date().getMonth();

    const employeeRecords = attendance.filter((record) => record.employeeId === employeeId);

    const daysPresent = employeeRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && record.status === 'Present';
    }).length;

    const totalDays = employeeRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth;
    }).length;

    return totalDays > 0 ? ((daysPresent / totalDays) * 100).toFixed(2) : 0;
  };

  render() {
    return (
      <Router>
        <div className="container-wrapper">
          <div className="container">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/details">Details Page</Link></li>
                <li><Link to="/attendance">Attendance Page</Link></li>
                <li><Link to="/employees">Employee List</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route 
                path="/" 
                element={
                  <div>
                    <h1>Home Page</h1>
                    <h2>Employee Details</h2>
                    {this.state.employees.length > 0 ? (
                      this.state.employees.map((employee, index) => (
                        <div key={index}>
                          <p><strong>Name:</strong> {employee.name}</p>
                          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                          <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
                          <p><strong>Address:</strong> {employee.address}</p>
                          <p><strong>Email ID:</strong> {employee.email}</p>
                          <p><strong>Age:</strong> {employee.age}</p>
                          <p><strong>Attendance Percentage (Current Month):</strong> {this.calculateAttendancePercentage(employee.employeeId)}%</p>
                          <button onClick={() => this.handleDelete(employee.employeeId)}>Delete Employee Record</button>
                        </div>
                      ))
                    ) : (
                      <p>No employee details submitted yet.</p>
                    )}
                    <h2>Attendance Records</h2>
                    {this.state.attendance.length > 0 ? (
                      <ul>
                        {this.state.attendance.map((record, index) => (
                          <li key={index}>
                            {record.date}: {record.employeeName} ({record.employeeId}) - {record.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No attendance records available yet.</p>
                    )}
                  </div>
                }
              />
              <Route 
                path="/details" 
                element={<DetailsPage onEmployeeSubmit={this.handleEmployeeSubmit} message={this.state.message} />} 
              />
              <Route 
                path="/attendance" 
                element={<AttendancePage onAttendanceSubmit={this.handleAttendanceSubmit} message={this.state.message} />} 
              />
              <Route 
                path="/employees" 
                element={<EmployeeList employees={this.state.employees} onDelete={this.handleDelete} />} 
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
