import React, { Component } from 'react';
import AttendanceFormComponent from './AttendanceFormComponent';

class AttendancePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: {
        employeeId: '',
        employeeName: '',
        date: '',
        status: ''
      },
      submitted: false,
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      attendance: {
        ...prevState.attendance,
        [name]: value
      },
      submitted: false, // Reset submission status on change
      errorMessage: '' // Clear error message on change
    }));
  };

  handleStatusChange = (status) => {
    this.setState((prevState) => ({
      attendance: {
        ...prevState.attendance,
        status: status
      },
      submitted: false, // Reset submission status on change
      errorMessage: '' // Clear error message on change
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { employeeId, employeeName, date, status } = this.state.attendance;

    // Validate that all fields are filled
    if (!employeeId || !employeeName || !date || !status) {
      this.setState({ errorMessage: 'All fields are required.' });
      return;
    }

    console.log('Attendance submitted:', this.state.attendance);
    this.props.onAttendanceSubmit(this.state.attendance);  // Send the data to App.js
    this.setState({ 
      submitted: true,
      errorMessage: ''
    });
  };

  render() {
    const { submitted, errorMessage } = this.state;

    return (
      <div>
        <h1>Attendance Page</h1>
        <AttendanceFormComponent 
          attendance={this.state.attendance}
          handleChange={this.handleChange}
          handleStatusChange={this.handleStatusChange}
          handleSubmit={this.handleSubmit}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {submitted && <p style={{ color: 'green' }}>Attendance has been successfully submitted!</p>}
      </div>
    );
  }
}

export default AttendancePage;
