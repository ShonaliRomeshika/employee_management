import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class AddEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeID: "",
      employeeName: "",
      contactNo: "",
      address: "",
      email: "",
      position: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      employeeID,
      employeeName,
      contactNo,
      address,
      email,
      position,
    } = this.state;

    const data = {
      employeeID: employeeID,
      employeeName: employeeName,
      contactNo: contactNo,
      address: address,
      email: email,
      position: position,
    };

    console.log(data);

    // Validations
    const num = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const empIDRegex = /^E\d{3}$/;

    if (
      employeeID === "" ||
      employeeName === "" ||
      contactNo === "" ||
      address === "" ||
      email === "" ||
      position === ""
    ) {
      swal("Please fill the form correctly", "Form values cannot be empty", "error");
    } else if (!empIDRegex.test(String(employeeID))) {
      swal("Invalid Employee ID", "Employee ID should start with 'E' followed by 3 digits, e.g., E001", "error");
    } else if (!num.test(String(contactNo))) {
      swal("Invalid Contact Number", "There should be 10 digits, Ex: 0761234567", "error");
    } else if (!emailRegex.test(String(email))) {
      swal("Invalid Email Address", "Please enter a valid email address", "error");
    } else {
      swal({
        title: "Are you sure?",
        text: `Employee ID: ${this.state.employeeID} | Name: ${this.state.employeeName} | Contact No: ${this.state.contactNo} 
        Address: ${this.state.address} | Email: ${this.state.email} | Position: ${this.state.position}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post("http://localhost:8000/employees/add", data).then((res) => {
            if (res.data.success) {
              this.setState({
                employeeID: "",
                employeeName: "",
                contactNo: "",
                address: "",
                email: "",
                position: "",
              });
            }
          });
          swal("Employee Added Successfully!", {
            icon: "success",
          });
        } else {
          swal("Employee is not added!");
        }
      });
    }
  };

  render() {
    return (
      <div className="container" style={{ maxWidth: "600px", margin: "auto" }}>
        <h1
          className="text-center"
          style={{
            backgroundColor: "#2c3e50",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Add Employee
        </h1>
        <form onSubmit={this.onSubmit} style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="employeeID" style={labelStyle}>
              <b>Employee ID:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="employeeID"
              placeholder="E001"
              value={this.state.employeeID}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="employeeName" style={labelStyle}>
              <b>Employee Name:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="employeeName"
              placeholder="John Doe"
              value={this.state.employeeName}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contactNo" style={labelStyle}>
              <b>Contact Number:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="contactNo"
              placeholder="0761234567"
              value={this.state.contactNo}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="address" style={labelStyle}>
              <b>Address:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="123 Main St, Colombo"
              value={this.state.address}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email" style={labelStyle}>
              <b>Email:</b>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="johndoe@example.com"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="position" style={labelStyle}>
              <b>Position:</b>
            </label>
            <input
              type="text"
              className="form-control"
              name="position"
              placeholder="Developer"
              value={this.state.position}
              onChange={this.handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#2c3e50",
                borderColor: "#2c3e50",
                color: "white",
                fontSize: "16px",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const labelStyle = {
  marginBottom: '5px',
  fontSize: '18px',
};

const inputStyle = {
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '15px',
  padding: '10px',
};
