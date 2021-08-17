import React, {useState, useContext} from 'react'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import UserContext from '../../contexts/UserContext'
import textApi from '../../services/textApi'
const SmsForm = ({setOpen, number, kind, numbers, isNumbers, handleSmsMessage}) => {
    const {register, handleSubmit } = useForm();
    const userContext = useContext(UserContext);
    const visitorMessage = `Good Day, This is from ${userContext.user.name}\nIt is a message to warn you that  someone has been infected on the day you visited our establishment. Please take some caution and check for sign of symptoms.`
    const sendMessage = async data => {
        if(!isNumbers){
           const mes = data.message === '' ? visitorMessage : data.message;
           await textApi.sendAlert(mes, number)
        }
        else{
            for(let i=0; i<numbers.length; i++){
                const mes = data.message === '' ? visitorMessage : data.message;
                await textApi.sendAlert(mes, numbers[i])
            }
        }
        setOpen(false)
        handleSmsMessage()
    }
    return(
        <>
        <form className='frm' onSubmit={handleSubmit(sendMessage)}>
            <div>
                <label>Message</label>
                <textarea name='message'ref={register} placeholder={kind==='visitor' ? visitorMessage : ''}/>
            </div>
            <div className='flex-end'>
                <Button color="primary" type='submit'>
                   Send
                </Button>
                <Button  onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </div>
        </form>
        </>
    )
}

export default SmsForm;
