
import { EmployeeContext } from "../context/employeeContext";
import { useContext } from "react";



const EmpuseContext = () => {
    const context = useContext(EmployeeContext)
 
    if(!context){
        throw Error('Employee used inside provider')
    }

    return context
};

export default EmpuseContext;