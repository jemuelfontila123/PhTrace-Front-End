const UserReducer = (state, action) => {
    const {payload, type} = action;
    switch(type){
        case 'set_user':
        return {user: payload}
        case 'change_image':
        const updatedState = {...state}
        updatedState.user['img'] = payload
        return updatedState;
        case 'verified_phone':
        const verifiedState = {...state}
        verifiedState.user.contactNumber = payload
        verifiedState.user['phone_verified'] = true;
        return verifiedState;
        case 'add_user':
        const newState = {...state}
        newState.user.visitors = newState.user.visitors.concat(payload)
        return newState
        case 'add_employee':
        const newStates = {...state}
        newStates.user.employees = newStates.user.employees.concat(payload)
        return newStates
        case 'delete_user':
        const copyState = {...state}
        console.log(copyState.user.visitors)
        copyState.user.visitors  = copyState.user.visitors.filter(visitor => visitor.id!==payload)
        return copyState
        case 'delete_employee':
        const duplicate = {...state}
        duplicate.user.employees = duplicate.user.employees.filter(employee => employee.id!==payload)
        return duplicate
        case 'delete_notification':
        const stateDelNotif = {...state}
        stateDelNotif.user.notifications = stateDelNotif.user.notifications.filter(notification => notification.id!==payload)
        return stateDelNotif
        case 'log_out':
        return {user: null}
        default: return state;
    }
}


export default UserReducer;