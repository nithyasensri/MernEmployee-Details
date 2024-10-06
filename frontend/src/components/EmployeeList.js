import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import EmpuseContext from '../context/Empusecontext';
import Authusecontext from '../context/authusecontext';

const EmployeeList = ({ employees }) => {
    // const { _id, name, dob, image, gender, designation, salary, contact } = employee
    console.log(employees)
    const { state, dispatch } = EmpuseContext()
    const navigate = useNavigate()
    const { user } = Authusecontext()

    const editData = (data) => {
        dispatch({ type: "changeForms", payload: data })
        navigate("/addform")
    }

    const deleteData = async (id) => {
        // console.log(id)
        if (!user) {
            return
        }
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/employees/` + id, {
            headers: {
                Authorization: `Bearer ${user.token}`, // Include the token in the Authorization header
            },
        })
        // const response = await axios.delete(`/employees/${id}`)

        if (response) {
            // console.log('ok')
        }
    }

    const readData = (id, data) => {
        dispatch({ type: "singleEmployee", payload: data })
        navigate(`/employee/${id}`)

    }

    return (
        
        <div className="workout-details">
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Image</th>
                        <th>Designation</th>
                        <th>contact</th>
                        <th>Actions</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees && employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{employee.name}</td>
                            <td>{employee.gender}</td>
                            <td><div style={{ "width": "200px" }}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${employee.image}`} style={{ "maxWidth": "200px" }} />
                            </div>
                            </td>
                            <td>{employee.designation}</td>
                            <td>{employee.contact}</td>
                            <td><button onClick={() => editData(employee)}>Edit</button></td>
                            <td><button onClick={() => readData(employee._id, employee)}>details</button></td>
                            <td><button onClick={() => deleteData(employee._id)}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div >
    );
};

export default EmployeeList;