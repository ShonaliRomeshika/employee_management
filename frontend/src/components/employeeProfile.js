import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/employees/${id}`)
      .then((res) => {
        if (res.data.success) {
          setEmployee(res.data.employee);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

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
        Employee Profile
      </h1>
      <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "24px" }}>
            {employee.employeeName}
          </h5>
          <p className="card-text">
            <strong>Employee ID:</strong> {employee.employeeID}
          </p>
          <p className="card-text">
            <strong>Position:</strong> {employee.position}
          </p>
          <p className="card-text">
            <strong>Contact Number:</strong> {employee.contactNo}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {employee.address}
          </p>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/employees/update/${id}`)}
            style={{ marginRight: "10px", backgroundColor: "MidnightBlue" }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => navigate("/employees")}
            style={{ backgroundColor: "FireBrick" }}
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}
