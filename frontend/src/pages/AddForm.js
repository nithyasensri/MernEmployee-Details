import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EmpuseContext from '../context/Empusecontext';
import { useNavigate } from "react-router-dom";
import Authusecontext from '../context/authusecontext';

const AddForm = () => {

    const { state, dispatch } = EmpuseContext()
    const { changeForms, selectedTask } = state
    // console.log(selectedTask)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [file, setFile] = useState()
    const [preview, setPreview] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        dob: '',
        gender: '',
        designation: '',
        salary: '',
        contact: '',
        file: '',
        preview: ''
    });
    const { user } = Authusecontext()

    const handleChange = (e) => {
        const { name, value } = e.target
        // console.log(formValues)
        setFormValues({ ...formValues, [name]: value })

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        // if (file) {
        //     setFile(file)
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setPreview(reader.result)
        //     }
        //     reader.readAsDataURL(file);
        //     const previewUrl = URL.createObjectURL(file);
        //     setPreview(previewUrl);
        // }

        setFormValues((prevValues) => ({
            ...prevValues,
            file: e.target.files[0],
            preview: URL.revokeObjectURL(file),
        }));
    }

    // console.log(formValues);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must logged in')
        }

        const { name, dob, gender, designation, salary, contact, file, preview } = formValues
        const formData = new FormData();
        formData.append('name', name);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('designation', designation);
        formData.append('salary', salary);
        formData.append('contact', contact);
        formData.append('file', file);
        formData.append('preview', preview);

        try {
            const response = await axios.post("/employees", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                }
            })

            if (response) {
                // console.log('Response:', response.data);
            }
        }

        catch (error) {
            // if (error.response) {
            //     console.log('Error data:', error.response.data);
            //     setError(error.response.data.error);
            //     setEmptyFields(error.response.data.emptyFields)
            // }

            console.log('error')
        }

        navigate("/")

    }

    useEffect(() => {
        if (Object.keys(selectedTask).length !== 0) {
            setFormValues(selectedTask)
        }
    }, [selectedTask])


    const updateData = async (e, id) => {
        console.log(id)
        e.preventDefault()
        console.log(formValues.name)
        if (!user) {
            setError('You must logged in')
        }

        const { name, dob, gender, designation, salary, contact, file, preview } = formValues
        const formData = new FormData();
        formData.append('name', name);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('designation', designation);
        formData.append('salary', salary);
        formData.append('contact', contact);
        formData.append('file', file);
        formData.append('preview', preview);


        for (let [key, value] of formData.entries()) {
            // console.log(key, value);
        }

        try {
            const response = await axios.patch(`/employees/${id}`, { name, dob, gender, designation, salary, contact, file, preview }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                }
            })

            // const response = await axios.delete(`/employees/${id}`)

            if (response) {
                console.log('Response:', response.data);
                dispatch({ type: "updateData", payload: response.data })
            }
        }

        catch (error) {
            console.log(error)
        }
        navigate('/')
    }




    return (
        <div className="add-form">
            {changeForms ? <form onSubmit={handleSubmit}>
                <div className='inputform'>
                    <span className='in-lab'><label>Name:</label></span>
                    <input type="text" name="name" placeholder="name" className='in-form'
                        onChange={handleChange} />
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Dob:</label></span>
                    <input type="date" name="dob" placeholder="dob" className='in-form'
                        onChange={handleChange} 
                        style={{'paddingTop':'10px','paddingBottom':'3px'}}/>
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Gender:</label></span>
                    <select onChange={handleChange} name="gender" className='in-form'>
                        <option value="">--Select--</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Image:</label></span>
                    <input type="file" accept="image/*" onChange={handleImageChange}
                        className='in-form in-img' />
                    {/* {preview && <img src={preview} alt="Image preview" style={{ width: '300px', height: 'auto' }} />} */}
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Designation:</label></span>
                    <input type="text" name="designation" placeholder="designation"
                        onChange={handleChange} className='in-form' /><br />
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Salary:</label></span>
                    <input type="text" name="salary" placeholder="salary"
                        onChange={handleChange} className='in-form' /><br />
                </div>
                <div className='inputform'>
                    <span className='in-lab'><label>Contact:</label></span>
                    <input type="text" name="contact" placeholder="contact"
                        onChange={handleChange} className='in-form' /><br />
                </div>
                <button type='submit'>Add Data</button>
            </form> :
                <div >
                    <form onSubmit={(e) => updateData(e, formValues._id)}>
                        <div className='inputform'>
                            <span className='in-lab'><label>Name:</label></span>
                            <input type="text" name="name" placeholder="name"
                                value={formValues.name} onChange={handleChange}
                                className='in-form' /><br />
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Dob:</label></span>
                            <input type="date" name="dob" placeholder="dob"
                                onChange={handleChange} value={formValues.dob}
                                className='in-form' /><br />
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Gender:</label></span>
                            <select onChange={handleChange} name="gender" value={formValues.gender}
                                className='in-form'>
                                <option value="">--Select--</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Image:</label></span>
                            <input type="file" accept="image/*" onChange={handleImageChange} value={formValues.file}
                                className='in-form in-img' />
                            {formValues.preview && <img src={formValues.preview} alt="Image preview" style={{ width: '300px', height: 'auto' }} />}
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Designation:</label></span>
                            <input type="text" name="designation" placeholder="designation"
                                onChange={handleChange} value={formValues.designation}
                                className='in-form' /><br />
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Salary:</label></span>
                            <input type="text" name="salary" placeholder="salary"
                                onChange={handleChange} value={formValues.salary}
                                className='in-form' /><br />
                        </div>
                        <div className='inputform'>
                            <span className='in-lab'><label>Contact:</label></span>
                            <input type="text" name="contact" placeholder="contact"
                                onChange={handleChange} value={formValues.contact}
                                className='in-form' /><br />
                        </div>
                        <button type='submit'>Update Data</button>
                    </form>
                </div>}


        </div>
    );
};

export default AddForm;