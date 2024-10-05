const express = require('express')
const Employeemodel = require('../Models/employeeModels')
const multer = require('multer')
const  mongoose  = require('mongoose')


const createEmployee = async (req, res,next) => {

    const imgUrl = `http://localhost:4000/uploads/${req.file.filename}`;
    console.log(imgUrl)
    var obj = {
        name: req.body.name,
        dob: req.body.dob,
        image: req.file.filename,
        preview: imgUrl,
        gender:req.body.gender,
        designation: req.body.designation,
        salary: req.body.salary,
        contact: req.body.contact
    }

    try {
        const Employee = await Employeemodel.create(obj)
        res.status(200).json(Employee)
        console.log(Employee)
    }
    catch (error) {
        console.log({ msg: error.message })
    }

}


const getEmployee = async (req, res) => {
    const Employee = await Employeemodel.find({}).sort({ createdAt: -1 })
    console.log(Employee)
    res.status(200).json(Employee)

}

const getSingleEmployee = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such Employee" })
    }

    const Employee = await Employeemodel.findById(id)

    if (!Employee) {
        res.status(400).json({ error: "No such Employee" })
    }

    res.status(200).json(Employee)

}

const deleteEmployee = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such Employee" })
    }

    const Employee = await Employeemodel.findOneAndDelete({ _id: id })

    if (!Employee) {
        res.status(400).json({ error: "No such Employee" })
    }

    res.status(200).json(Employee)
}

const updateEmployee = async (req, res) => {
    console.log('update')
    const { id } = req.params
    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "No such Employee" })
    }

    const Employee = await Employeemodel.findOneAndUpdate({_id:id},{...req.body})

    if(!Employee){
        res.status(400).json({ error: "No such Employee" })
    }
    res.status(200).json(Employee)
}

module.exports = {
    createEmployee, getEmployee,
    getSingleEmployee, deleteEmployee,updateEmployee
}