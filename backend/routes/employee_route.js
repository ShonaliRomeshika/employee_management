const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");

// Get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        if (!employees.length) {
            return res.status(404).json({ message: "No employees found" });
        }
        return res.status(200).json({
            success: true,
            existingEmployees: employees
        });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: err.message });
    }
});

// Create a new employee
router.post('/add', async (req, res) => {
    try {
        const { employeeID, employeeName, contactNo, address, email, position } = req.body;

        // Ensure all fields are present
        if (!employeeID || !employeeName || !contactNo || !address || !email || !position) {
            return res.status(400).json({ msg: 'Please provide all required fields.' });
        }

        const newEmployee = new Employee({
            employeeID,
            employeeName,
            contactNo,
            address,
            email,
            position
        });

        await newEmployee.save();
        res.status(201).json({ msg: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get specific employee
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "No employee found" });
        }
        return res.status(200).json({
            success: true,
            employee
        });
    } catch (err) {
        console.error('Error retrieving employee:', err);
        res.status(500).json({ error: err.message });
    }
});

// Update specific employee
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { employeeID, employeeName, contactNo, address, email, position } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            employeeID,
            employeeName,
            contactNo,
            address,
            email,
            position
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Unable to update employee with this ID" });
        }
        return res.status(200).json({
            success: "Update successful",
            employee: updatedEmployee
        });
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: err.message });
    }
});

// Delete specific employee
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    let emp;
    try {
        emp = await Employee.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).json({ message: 'Error deleting employee' });
    }
    if (!emp) {
        return res.status(404).json({ message: 'Unable to delete by this ID' });
    }
    return res.status(200).json({ message: 'Employee successfully deleted' });
});


module.exports = router;










// const express = require("express");
// const router = express.Router();
// // const employee = require("../models/employees");
// const Employee = require("../models/employees");


// //Get all employees
// router.get ("/", async (req, res, next) => {
//     let employees;
//     try {
//         employees = await employee.find();
//     } catch (err) {
//       console.log(err);
//     }
  
//     if (!employees) {
//       return res.status(404).json({ message: "No employee found" });
//     }
//     return res.status(200).json({ 
//       success: true,
//       existingEmployees: employees
//     });
//   });

//     //add new employee
// //   router.post ("/add", async (req, res, next) => {
// //     const { 
// //         employeeID,  
// //         employeeName, 
// //         contactNo, 
// //         address, 
// //         email,
// //         position
// //     } = req.body;
// //     let emp; 
// //     try {
// //       emp = new employee({  
// //         employeeID,  
// //         employeeName, 
// //         contactNo, 
// //         address, 
// //         email,
// //         position
// //       });
// //       await emp.save();
// //     } catch (err) {
// //       console.log(err);
// //     }
  
// //     if (!emp) {
// //       return res.status(500).json({ message: "Unable To Add" });
// //     }
// //     return res.status(201).json({ 
// //       success:"Employee added successfully",
// //       employee: emp
// //     });
// //   });

// // Create a new employee




// router.post('/add', async (req, res) => {
//     try {
//         const { employeeID, employeeName, contactNo, address, email, position } = req.body;

//         // Ensure all fields are present
//         if (!employeeID || !employeeName || !contactNo || !address || !email || !position) {
//             console.log('Missing fields:', {
//                 employeeID,
//                 employeeName,
//                 contactNo,
//                 address,
//                 email,
//                 position
//             });
//             return res.status(400).json({ msg: 'Please provide all required fields.' });
//         }

//         const newEmployee = new Employee({
//             employeeID,
//             employeeName,
//             contactNo,
//             address,
//             email,
//             position
//         });

//         await newEmployee.save();
//         res.status(201).json({ msg: 'Employee created successfully', employee: newEmployee });
//     } catch (err) {
//         console.error('Error adding employee:', err);
//         res.status(500).json({ error: err.message });
//     }
// });





// //Get specific employee
// router.get("/:id", async (req, res, next) => {
//   const id = req.params.id;
//   let emp;
//   console.log(`Retrieving employee data for ID: ${id}`); 
//   console.log("Inside try block"); 
//   try {
//     emp = await employee.findById(id);
//     console.log("Employee data retrieved:", emp); 
//   } catch (err) {
//     console.log(err);
//   }
//   if (!emp) {
//     return res.status(404).json({ message: "No employee found" });
//   }
//   return res.status(200).json({
//     success: true,
//     employee: emp,
//   });
// });


//   //Update specific employee
//   router.put('/update/:id', async(req,res) => {
//     const id = req.params.id;
//     const { 
//         employeeID,  
//         employeeName, 
//         contactNo, 
//         address, 
//         email,
//         position
//     } = req.body;
//     let emp;
//     try {
//         emp = await employee.findByIdAndUpdate(id, {
//             employeeID,  
//             employeeName, 
//             contactNo, 
//             address, 
//             email,
//             position
//       });
//       emp = await emp.save();
//     } catch (err) {
//       console.log(err);
//     }
//     if (!emp) {
//       return res.status(404).json({ message: "Unable To update by this ID" });
//     }
//     return res.status(200).json({ 
//       success: "Update Succesfully",
//       employee: emp 
//     });
//   });

// //Delete specific employee
// router.delete('/delete/:id' ,async(req,res) =>{
//     const id = req.params.id;
//     let emp;
//     try {
//         emp = await employee.findByIdAndRemove(id);
//     } catch (err) {
//       console.log(err);
//     }
//     if (!emp) {
//       return res.status(404).json({ message: "Unable to delete by this ID" });
//     }
//     return res.status(200).json({ message: "Employee successfully deleted" });
//   });



//   module.exports = router;