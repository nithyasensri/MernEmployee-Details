import React from 'react';
import { useParams } from 'react-router-dom';
import EmpuseContext from '../context/Empusecontext';

const SingleEmployee = () => {
    const { id } = useParams()
    const { state } = EmpuseContext()
    const { singleEmployee } = state


    return (
        <div className="flex-container">
            <div className="single-employee" style={{ "textAlign": "center" }}>
                <h3>{singleEmployee.name} Details</h3>
                <div className="single-data" style={{ "textAlign": "left" }}>
                    <h5>Name:  {singleEmployee.name}</h5>
                    <h5>Date.of.Birth:  {new Date(singleEmployee.dob).toLocaleDateString('en-GB')}</h5>
                    <h5>Gender:  {singleEmployee.gender}</h5>
                    <div style={{ "width": "200px", "marginBottom": "10px" }}>
                        <h5>Image:</h5> <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${singleEmployee.image}`} style={{ "maxWidth": "200px" }} />
                    </div>
                    <h5>Designation: {singleEmployee.designation}</h5>
                    <h5>Salary: {singleEmployee.salary}</h5>
                    <h5>Contact: {singleEmployee.contact}</h5>
                </div>
            </div>
        </div>
    );
};

export default SingleEmployee;