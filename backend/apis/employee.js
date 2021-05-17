const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/getEmployees', async (req, res) => {
    try {
        let employeeData = await Employee.find();
        res.status(200).send(employeeData)
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" })
        console.log("Error", e)
    }
})

router.post('/addEmployee', async (req, res) => {
    try {
        await new Employee(req.body).save();
        res.status(200).send({ message: "Employee added successfully" })
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" })
        console.log("Error", e)
    }
})

router.put('/updateEmployees', async (req, res) => {
    try {
        let id = req.query._id;
        await Employee.updateOne({ _id: id }, { $set: { ...req.body } }, { new: true });
        res.status(200).send({ message: "Employee updated successfully" })
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" })
        console.log("Error", e)
    }
})

router.delete('/deleteEmployees', async (req, res) => {
    try {
        let id = req.query._id;
        await Employee.deleteOne({ _id: id });
        res.status(200).send({ message: "Employee deleted successfully" })
    } catch (e) {
        res.status(500).send({ message: "Something went wrong" })
        console.log("Error", e)
    }
})

module.exports = router;
