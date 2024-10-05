
import React from 'react';
import { useReducer, useState, createContext } from 'react';



export const EmployeeContext = createContext()

export const EmployeeReducer = (state, action) => {
    
    switch (action.type) {
        
        case "SetEmployee":
            // console.log(action.payload)
            return { ...state, employees: action.payload }

        case "changeForms": {
            // console.log('asa')
            return { ...state, changeForms: false, selectedTask: action.payload }
        }

        case "updateData": {
            console.log(action.payload)
            return { ...state, changeForms: true,employees:[action.payload,...state.employees] }
        }

        case "singleEmployee" :{
            // console.log(action.payload)
            return{singleEmployee:action.payload}
        }

    }
}

const EmployeeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, {
        employees: [],
        changeForms: true,
        selectedTask: {},
        singleEmployee:{}
    })
    console.log(state.employees)
    return (
        <EmployeeContext.Provider value={{ state, dispatch }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export default EmployeeProvider;