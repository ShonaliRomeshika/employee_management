import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';  

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      originalEmployees: [], // Store original data for searching
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  retrieveEmployees() {
    axios.get("http://localhost:8000/employees")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            employees: res.data.existingEmployees,
            originalEmployees: res.data.existingEmployees // Store original data for searching
          });

          console.log(this.state.employees);
        }
      });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the details of this employee!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8000/employees/delete/${id}`).then((res) => {
          swal(
            "Deleted Successfully!",
            "Employee is removed",
            "success"
          );

          this.retrieveEmployees();
        });
      } else {
        swal("Employee is not deleted!");
      }
    });
  };

  filterData = (searchKey) => {
    const { originalEmployees } = this.state;
    const result = originalEmployees.filter((employee) => {
      const {
        employeeName,
        contactNo,
        address,
        email,
        position
      } = employee;
      return (
        employeeName.toLowerCase().includes(searchKey) ||
        contactNo.toLowerCase().includes(searchKey) ||
        address.toLowerCase().includes(searchKey) ||
        email.toLowerCase().includes(searchKey) ||
        position.toLowerCase().includes(searchKey)
      );
    });
    this.setState({ employees: result });
  };

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.filterData(searchKey);
  };

  jsPdfGenerator = () => {
    const { employees } = this.state;
    const doc = new jsPdf('l', 'pt', 'a3');

    doc.text('Employees List', 20, 20);
    
    doc.autoTable({
      head: [['Employee ID', 'Employee Name', 'Contact Number', 'Address', 'Email', 'Position']],
      body: employees.map(emp => [
        emp.employeeID,
        emp.employeeName,
        emp.contactNo,
        emp.address,
        emp.email,
        emp.position
      ]),
      startY: 30,
    });

    doc.save("employees_list.pdf");
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1  style={{
            backgroundColor: "#2c3e50",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>Employees List</h1>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </div>

          <div className="col-md-6 text-right">
            <button className="btn btn-warning custom-margin">
              <a
                href="employees/add"
                className="text-white text-decoration-none"
              >
                Add Employee
              </a>
            </button>
            <button
              className="btn btn-primary"
              onClick={this.jsPdfGenerator}
            >
              <i className="fas fa-download"></i>&nbsp;Download List
            </button>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Position</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeID}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.contactNo}</td>
                <td>{employee.address}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <a
                    className="btn btn-warning btn-sm"
                    href={`employees/update/${employee._id}`}
                    title="Edit"
                  >
                    <FaEdit />
                  </a>
                  &nbsp;
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.onDelete(employee._id)}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                  &nbsp;
                  <a
                    className="btn btn-primary btn-sm"
                    href={`employees/${employee._id}`}
                    title="View"
                  >
                    <FaEye />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
