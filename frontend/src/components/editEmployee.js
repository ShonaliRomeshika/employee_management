import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function EditEmployees() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/employees/${id}`)
      .then((res) => {
        if (res.data.success) {
          setEmployeeID(res.data.employee.employeeID);
          setEmployeeName(res.data.employee.employeeName);
          setContactNo(res.data.employee.contactNo);
          setAddress(res.data.employee.address);
          setEmail(res.data.employee.email);
          setPosition(res.data.employee.position);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "employeeID":
        setEmployeeID(value);
        break;
      case "employeeName":
        setEmployeeName(value);
        break;
      case "contactNo":
        setContactNo(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "position":
        setPosition(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      employeeID: employeeID,
      employeeName: employeeName,
      contactNo: contactNo,
      address: address,
      email: email,
      position: position,
    };

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
        text: `Employee ID: ${employeeID} | Name: ${employeeName} | Contact No: ${contactNo} 
        Address: ${address} | Email: ${email} | Position: ${position}`,
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.put(`http://localhost:8000/employees/update/${id}`, data)
            .then((res) => {
              if (res.data.success) {
                setEmployeeID("");
                setEmployeeName("");
                setContactNo("");
                setAddress("");
                setEmail("");
                setPosition("");
                navigate("/employees");
              }
            })
            .catch((err) => console.log(err));
          swal("Successfully Updated!", { icon: "success" });
        } else {
          swal("Update is not completed!");
        }
      });
    }
  };

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
        Edit Employee
      </h1>
      <form onSubmit={onSubmit} style={{ marginTop: "20px" }}>
        <div className="form-group">
          <label className="form-label" htmlFor="employeeID" style={labelStyle}>
            <b>Employee ID:</b>
          </label>
          <input
            type="text"
            className="form-control"
            name="employeeID"
            placeholder="E001"
            value={employeeID}
            onChange={handleInputChange}
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
            value={employeeName}
            onChange={handleInputChange}
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
            value={contactNo}
            onChange={handleInputChange}
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
            value={address}
            onChange={handleInputChange}
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
            value={email}
            onChange={handleInputChange}
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
            placeholder="Manager"
            value={position}
            onChange={handleInputChange}
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
              width: "100px",
              fontSize: "large",
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle = {
  marginBottom: '5px',
  fontSize: '19px',
  color: '#2c3e50'
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  borderRadius: '5px',
  borderColor: '#2c3e50'
};
