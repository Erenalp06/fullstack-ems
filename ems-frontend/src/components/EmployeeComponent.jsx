import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import {useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    function saveOrUpdateEmployee(e){
        e.preventDefault();        

        if(validateForm()){
            const employee = {firstName, lastName, email}

            if(id){
                updateEmployee(id, employee).then((response) => {
                    toast.success('Employee updated successfully');
                    setTimeout(() => {
                        navigator('/employees')
                    }, 2000)
                    console.log(response.data)
                    
                }).catch(error => {
                    console.error(error)
                    toast.error('Failed to update employee')
                })
            }else{
                createEmployee(employee).then((response) => {
                    toast.success('Employee creadet successfully')
                    setTimeout(() => {
                        navigator('/employees')
                    }, 2000)
                    console.log(response.data)
                    
                }).catch(error => {
                    console.error(error)
                    toast.error('Failed to create employee')
                })
            }          
        }
        
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = ''
        }else{
            errorsCopy.firstName = 'First name is required'
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = ''
        }else{
            errorsCopy.lastName = 'Last name is required'
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = ''
        }else{
            errorsCopy.email = 'Email is required'
            valid = false;
        }

        console.log(errorsCopy);
        setErrors(errorsCopy)
        console.log(errors);
        return valid
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }


    return (
        <div className='container py-5'>
          <ToastContainer />
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <div className='card shadow-lg'>
                <div className='card-header'>
                  {pageTitle()}
                </div>
                <div className='card-body'>
                  <form>
                    <div className='form-group mb-3'>
                      <label className='form-label'>First Name</label>
                      <input
                        type='text'
                        className={`form-control ${firstName ? 'is-valid' : 'is-invalid'}`}
                        placeholder='Enter Employee First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
    
                    <div className='form-group mb-3'>
                      <label className='form-label'>Last Name</label>
                      <input
                        type='text'
                        className={`form-control ${lastName ? 'is-valid' : 'is-invalid'}`}
                        placeholder='Enter Employee Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
    
                    <div className='form-group mb-3'>
                      <label className='form-label'>Email</label>
                      <input
                        type='email'
                        className={`form-control ${email ? 'is-valid' : 'is-invalid'}`}
                        placeholder='Enter Employee Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
    
                    <button className='btn btn-primary' onClick={saveOrUpdateEmployee}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default EmployeeComponent