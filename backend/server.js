const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB connection
const URL = "mongodb+srv://new_user1:ShwebZSq9VGpnJS1@cluster0.useh1.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

// Routes
const employeeRouter = require("./routes/employee_route");
app.use("/employees", employeeRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});





// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//     employeeID: {
//         type: String,
//         required: true
//     },
//     employeeName: {
//         type: String,
//         required: true
//     },
//     contactNo: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     position: {
//         type: String,
//         required: true
//     }
// });

// const Employee = mongoose.model('Employee', employeeSchema);

// module.exports = Employee;




// // const express=require('express');
// // const mongoose=require("mongoose");
// // const bodyParser=require("body-parser");
// // const cors = require("cors");


// // const app=express();


// // const PORT = 8000;

// // app.use(express.json());
// // app.use(express.urlencoded({extended : false}));


// // app.use(bodyParser.json());
// // app.use(cors());

// // const URL = "mongodb+srv://new_user1:ShwebZSq9VGpnJS1@cluster0.useh1.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0";


// // mongoose.connect(URL, {
// //     useNewUrlParser: "true",
// // });

// // //create a connection
// // const connection = mongoose.connection;
// // connection.once("open",()=>{
// //     console.log("Mongodb Connection Success!");

// // });

// // app.listen (PORT, () => {
// //     console.log(`Server is up and running on port: ${PORT}`)
// // })


// // const router = require("./routes/employee_route");

// // app.use("/employees", router);