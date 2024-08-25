import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import employees from "./components/employees";
import addEmployees from "./components/addEmployees";
import EditEmployees from "./components/editEmployee";
import EmployeeProfile from "./components/employeeProfile";
// import customerViewJobs from "./components/customerViewJobs";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/employees" exact Component={ employees } > </Route>
      <Route path="/employees/add" exact Component={ addEmployees } > </Route>
      <Route path="/employees/update/:id" Component={ EditEmployees }></Route> 
      <Route path="/employees/:id" Component={ EmployeeProfile }></Route>
      {/* <Route path="/jobs/view" Component={ customerViewJobs }></Route>  */}

           
    </Routes>
    </BrowserRouter>
  );
}

export default App;