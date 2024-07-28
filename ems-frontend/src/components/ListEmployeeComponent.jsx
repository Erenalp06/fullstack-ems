import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSortUp, FaSortDown, FaPen, FaTrash } from 'react-icons/fa';



const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const[sortDirection, setSortDirection] = useState('asc');

    const sortEmployeesById = () => {
        const sortedEmployees = [... employees].sort((a,b) => {
            if(sortDirection == 'asc'){
                return a.id  -b.id
            }else{
                return b.id - a.id
            }
        })
        setEmployees(sortedEmployees)
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    }

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees()
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){
            navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id)

        deleteEmployee(id).then((response) => {
            toast.success('Employee deleted successfully');
            getAllEmployees()
        }).catch(error => {
            console.error(error)
            toast.error('Failed to delete employee');
        })
    }

    return (
        <div className='container mt-4'>
          <ToastContainer />
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2>List of Employees</h2>
            <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
          </div>
          <table className='table'>
            <thead className='thead-light'>
              <tr>
                <th onClick={sortEmployeesById}>
                  Employee Id {sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button className='btn btn-sm btn-info' onClick={() => updateEmployee(employee.id)}><FaPen /></button>
                    <button className='btn btn-sm btn-danger ml-2' onClick={() => removeEmployee(employee.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    

export default ListEmployeeComponent