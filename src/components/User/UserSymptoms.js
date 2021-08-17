import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import {symptoms} from '../../utils/healthcheck'
import usersApi from '../../services/usersApi';
import UserContext from '../../contexts/UserContext'
const UserSymptoms = ({setPage, setOpen}) => {
    const {register, handleSubmit } = useForm();
    const userContext = useContext(UserContext);
    const handleChecked = data => {
        let checked = 0;
        Object.keys(data).map((key, index) => {
            if(data[key]!==false)
                checked+=1;
        })
        return checked;
    }
    const handleSymptoms = async data => {
       try{
            const checked = handleChecked(data)
            await usersApi.healthCheck(userContext.user,checked);
            setPage(4);
       }catch(exception){
           console.log('error')
       }
    }
    const handleClose = () => {
        setOpen(false)
        setPage(1)
    }
    return(
        <div>
            <form  className='frm frm-dialog' onSubmit={handleSubmit(handleSymptoms)}>
                <div>
                    {symptoms.map(
                        (symptom) => 
                            <div className='checkbox' key={symptom}>
                                <input type='checkbox' value={symptom} name={symptom} ref={register}/>
                                <label>  {symptom} </label>
                            </div>
                     )}
                </div>
            <div className='flex-end'>
                <Button color="primary" type='submit'>
                   Submit
                </Button>
                <Button onClick={handleClose} >
                    Cancel
                </Button>
            </div>
            </form>
        </div>
    )  
}

export default UserSymptoms;