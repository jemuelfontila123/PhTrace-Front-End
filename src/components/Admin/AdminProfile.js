import React , {useContext} from 'react';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import UserContext from '../../contexts/UserContext'
import establishmentsApi from '../../services/establishmentsApi'
const AdminProfile = ({user, handleUpdateMessage, handleErrUpdateMessage}) => {
    const {register, handleSubmit, errors, reset } = useForm();
    const userContext = useContext(UserContext)
    const newData = data => {
        let newObj={...data}
        Object.keys(data).map((key, index) => {
            if(data[key]===''||data[key]===undefined)
              newObj[`${key}`] = user[`${key}`]
        })
        return newObj;
    }
    const handleUpdate = async data => {
        try{
            await establishmentsApi.update(newData(data));
            handleUpdateMessage();
        }catch(exception){
            handleErrUpdateMessage();
        }
    }
    return(
        <div>
            <div className='settings-body' id='profile'>
                <form className='frm frm-wrapper' onSubmit={handleSubmit(handleUpdate)}>
                    <div>
                        <label>Business Name</label>
                        <input name='name'  ref={register} placeholder={user.name}/>
                    </div>
                    <div>
                        <label>Contact Person</label>
                        <input name='contactPerson'  ref={register} placeholder={user.contactPerson}/>
                    </div>
                    <div>
                        <label>Contact Number</label>
                            <input name='contactNumber' autoComplete='off'
                                ref={register({minLength:{value:11}, pattern: /(09)[0-9]{2,9}/i })}
                                placeholder={user.contactNumber} maxLength={'11'}
                            />
                            <div className='frm-helper'>
                                {errors.contactNumber && errors.contactNumber.type === 'minLength' && <p>Contact Number requires 11 numbers</p> }
                                {errors.contactNumber && errors.contactNumber.type === 'pattern' && <p>Only numbers are allowed and it should start with 09</p> }
                            </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <input name='email' ref={register} placeholder={user.email} disabled={true}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input name='password' type='password' ref={register({required:true})} placeholder ='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'/>
                        <div className='frm-helper'>
                                {errors.password && errors.password.type === 'required' && <p>Enter your password</p> }
                            </div>
                    </div>

                    <div className='settings-choices'>
                        <div>
                            <Button variant="contained" color="primary" className='but' type='submit    '>
                                <SaveAltIcon/>
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminProfile;

