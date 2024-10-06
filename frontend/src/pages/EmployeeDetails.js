import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmpuseContext from '../context/Empusecontext';
import Authusecontext from '../context/authusecontext';

const EmployeeDetails = () => {

    const { state, dispatch } = EmpuseContext()
    const { employees } = state
    const { user } = Authusecontext()

    useEffect(() => {

        const fetchWorkouts = async () => {

            console.log('aa')

            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(response.data)

            if (response) {
                // setEmployee(response.data)
                console.log('edit')
                dispatch({ type: "SetEmployee", payload: response.data })
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    console.log(employees)
    return (
        <div className="flex-container">
            <div className="home">
                <div className="workouts">
                    <h2>Employee Details</h2>
                    {employees && <EmployeeList employees={employees}/>}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;