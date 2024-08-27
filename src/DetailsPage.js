import React, { Component } from 'react';
import FormComponent from './FormComponent';

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        name: '',
        employeeId: '',
        phoneNumber: '',
        address: '',
        email: '',
        age: ''
      },
      submitted: false,
      errorMessage: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [name]: value
      },
      submitted: false, // Reset submission status on change
      errorMessage: '' // Clear error message on change
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, employeeId, phoneNumber, address, email, age } = this.state.employee;

    // Validate that all fields are filled
    if (!name || !employeeId || !phoneNumber || !address || !email || !age) {
      this.setState({ errorMessage: 'All fields are required.' });
      return;
    }

    console.log('Form submitted:', this.state.employee);
    this.props.onEmployeeSubmit(this.state.employee);  // Send the data to App.js
    this.setState({ 
      submitted: true,
      errorMessage: ''
    });
  };

  render() {
    const { submitted, errorMessage } = this.state;

    return (
      <div>
        <h1>Employee Details Page</h1>
        <FormComponent 
          employee={this.state.employee}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {submitted && <p style={{ color: 'green' }}>Employee details have been successfully submitted!</p>}
      </div>
    );
  }
}

export default DetailsPage;
