import React, {useState, useEffect, useContext}from 'react'
import UserContext from '../../contexts/UserContext'
import { useForm } from "react-hook-form";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const eye = <FontAwesomeIcon icon={faEye} />;

const EmployeeForm = ({setOpen, employeeSuccess}) => {
    const userContext = useContext(UserContext);
    const {register, handleSubmit, errors } = useForm();
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [isVisible, setVisible] = useState(false)
    const handleVisibility = () => setVisible(!isVisible)
    const [emailError, setEmailError] = useState('')
    const [emailVisible, setEmailVisible] = useState(false)
    const showEmail = {display: emailVisible ? '': 'none'}
    const [isSame, setIsSame] = useState(null)
    const handleRePassword = (event) => setRePassword(event.target.value)
    const comparePassword = () => {
        if(rePassword==='') setIsSame(null)
        else if(password===rePassword) setIsSame(true)
        else setIsSame(false)
    }
    const handleAddEmployee = async (data, e) => {
        const {firstName, lastName, email, password, contactNumber} = data;
        const number = '63' + data.contactNumber.substring(1)
        const employee = {
            firstName,
            lastName,
            email,
            contactNumber:number,
            password
        }
        if(isSame){
            const isSuccessful = await userContext.add(employee,'employee')
            const emailFound = isSuccessful.find(element => element === 'email')
            if(emailFound){
                setEmailError(data.email)
                setEmailVisible(true)
            }
            if(isSuccessful.length===0){
                e.target.reset();
                employeeSuccess()
            }
        }
    }   
    return(
        <>
        <form className='frm frm-modal' onSubmit={handleSubmit(handleAddEmployee)} id='employee-form'>
            <div>
                <label>First Name</label> 
                <input name='firstName' ref={register({required: true})}  placeholder='Enter first name'/>
                {errors.firstName && <p>First Name is required</p>}
            </div>
            <div>
                <label>Last Name</label>
                <input name='lastName' ref={register({required: true})}placeholder='Enter last name'/>
                {errors.lastName && <p>Last Name is required</p>}
            </div>
            <div>
                <label>Email</label>
                <input name='email' type='email'ref={register({required: true})} placeholder="Enter the email" onChange={() => setEmailVisible(false)}/>
                <p style={showEmail} className='error'>{emailError} already exists in the database</p>
                {errors.email && <p>Email is required</p>}
            </div>
            <div>
                <label>{'Contact Number'}</label>
                <input name='contactNumber' type='text'
                    ref={register({required: true,  minLength:{value:11}, pattern: /(09)[0-9]{2,9}/i})}
                    placeholder="+63" maxLength={ '11'}/>
                <div className='frm-helper'>
                    {errors.number && errors.number.type === 'required' && 
                    <p>Contact Number is required</p>
                    }
        
                    {errors.number && errors.number.type === 'minLength' && 
                        <p>Contact Number requires 11 numbers</p>
                    }
        
                    {errors.number && errors.number.type === 'pattern' &&
                        <p>Only numbers are allowed and it should start with 09</p>
                    }
                </div>
            </div>
            <div>
                <label>Password</label>
                <div className='pass-wrapper'>
                    <input name='password' type={isVisible? 'text': 'password' } placeholder ='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                        onChange={(event) => setPassword(event.target.value) }
                        ref={register({required:true, minLength:8, pattern:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i})} maxLength='36'/>
                    <i onClick={handleVisibility}>{eye}</i>
                </div>
                <div className='frm-helper'>
                    {errors.password && errors.password.type === 'minLength' &&  <p>The password must be at least 8 characters</p>}
                    {errors.password&& errors.password.type === 'pattern' && <p>The password must contain at least one number and one uppercase</p>}
                </div>
            </div>
            <div>
                <label>Confirm password</label>
                <div className='pass-wrapper'>
                    <input name='password' type='password' onChange={handleRePassword} onKeyUp={comparePassword }
                            placeholder ='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                            minLength='8' maxLength='36' required/>
                </div>
                <div className='frm-helper'>
                    {isSame === false &&  <p>It does not match with your password</p>}
                </div>     
            </div> 
            <div className='flex-end'>
                <Button color="primary" type='submit'>
                    Submit
                </Button>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </div>
        </form>
        </>
    )
}

export default EmployeeForm