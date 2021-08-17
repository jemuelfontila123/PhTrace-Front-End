import React, {useReducer} from 'react';
import UserReducer from './UserReducer'
import UserContext from './UserContext'
import establishmentsApi from '../services/establishmentsApi'

const UserContextProvider = (props) => {
    const initialState = {user: null};
    const [state, dispatch] = useReducer(UserReducer, initialState);
    const setUser = user => dispatch({type:'set_user', payload: user})
    const changeImage = img => {
        dispatch({type:'change_image', payload:img})
    }
    const verifyPhone = number => dispatch({type:'verified_phone', payload: number})
    const add = async(data,kind) => {
        const {firstName, lastName, email, contactNumber, userId, password, temperature, status} = data;
        if(kind==='user'){
            const user = {
                firstName,
                lastName, 
                email,
                contactNumber,
                temperature,
                userId,
                status
            }
            try{
            const response = await establishmentsApi.addUser(user);
            dispatch({type:'add_user', payload:response.data})
            }catch(exception){
                console.log(exception.response.data.error)
            }
        }
        else{
            const employee = {
                firstName,
                lastName, 
                email,
                contactNumber,
                password
            }
            const array = [];
            try{
                const response = await establishmentsApi.addEmployee(employee);
                dispatch({type:'add_employee', payload:response.data})
                return array;
            } catch(exception){
                console.log(exception.response.data.error)
                const response  =  exception.response.data.error
                const error = JSON.stringify(response)
                console.log(error)
                // if(error.indexOf('email') > 0 ) array.push('email')
                return array;
            }
        }
    }
    const remove = async(id, kind) => {
        if(kind==='user'){
            if(window.confirm('Are you sure you want to delete this user?')){
                try{
                    dispatch({type:'delete_user', payload: id})
                    await establishmentsApi.delUser(id)
                }catch(exception){
                    console.log(exception.response.data.error)
            }
         } 
        }  
        else{
            try{
                if(window.confirm('Are you sure you want to delete this employee?')){
                    dispatch({type:'delete_employee', payload: id});
                    await establishmentsApi.delEmployee(id)
                }
            }catch(exception){
                console.log(exception.response.data.error)
            }
        }
    };
    const removeNotification = async(id) => {
        if(window.confirm('Are you sure you have already read this notification?')){
            try{
                dispatch({type:'delete_notification', payload: id})
                await establishmentsApi.deleteNotification(id)
            }catch(exception){
                console.log('wow')
            }
        }
    }
    const logOut = () =>{
        window.localStorage.clear();
        dispatch({type:'log_out'})
    }
    return(
        <UserContext.Provider 
            value={{
                user: state.user,
                setUser,
                add,
                remove,
                logOut,
                changeImage,
                verifyPhone,
                removeNotification
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;