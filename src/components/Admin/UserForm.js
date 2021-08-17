import React from 'react';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import establishmentsApi from '../../services/establishmentsApi'
const baseUrl = 'http://localhost:3001'
const imgStyle = {
    maxHeight:'15rem',
    borderRadius:'16px'
}
const UserForm = ({qr, setSuccess, setOpen, userContext}) => {
    const {register, handleSubmit, errors } = useForm();
    const {firstName, lastName, email, contactNumber, status, id} = qr;
    const newData = data => {
        let newObj={...data}
        Object.keys(data).map((key, index) => {
            if(data[key]===''||data[key]===undefined)
              newObj[`${key}`] = qr[`${key}`]
        })
        newObj.contactNumber = contactNumber;
        newObj.userId = id;
        newObj.email = email;
        return newObj;
    }
    const handleForm = async(data) => {
        try{
            await userContext.add(newData(data),'user');
            setSuccess(true);
            setOpen(false)
        }  catch(exception){
           console.log('error')
        }
    }
    return(
        <div>
            <form  className='frm frm-dialog' onSubmit={handleSubmit(handleForm)}>
                <div>
                    <div className='img scanner-img'>
                        <label>Identification Card</label>
                        {/* Dapat may / tinesting ko munang wala */}
                        <img src={`${baseUrl}/${qr.img}`} alt='identification-card' style={imgStyle}/>
                    </div>
                    <div className='scanner-form'>
                        <div>
                            <label>First Name </label>
                            <input type='text' ref={register} name='firstName' placeholder={firstName}/>
                        </div> 
                        <div>
                            <label>Last Name </label>
                            <input type='text' ref={register} name='lastName' placeholder={lastName}/>
                        </div> 
                        <div>
                            <label>Status</label>
                            <input type='text' ref={register} name='status' placeholder={status}/>
                        </div>
                        <div>
                            <label>Temperature </label>
                            <input type='text' ref={register({ required: true})}  name='temperature' />
                        </div>
                    </div>
                </div>
                <div className='flex-end'>
                    <Button color="primary" type='submit'>
                        Submit
                    </Button>
                    <Button >   
                        Cancel
                    </Button>
                </div>
             </form>
        </div>
    )
}
export default UserForm;

//        let instance;
// if(data.firstName){
//     instance = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//     }
// }
// else{
//     instance = {
//         firstName,
//         lastName
//     }
// }
// instance.userId = id;
// instance.email = email;
// instance.contactNumber = contactNumber;
// instance.status = status;
// instance.temperature = data.temperature;
// instance.contactNumber = contactNumber;