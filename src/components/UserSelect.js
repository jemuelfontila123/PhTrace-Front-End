import React from 'react'
const UserSelect = ({description, user, setUser}) => {
    const handleUser = event => setUser(event.target.value)
    return(
        <div>
            <label>{description}</label>
            <select value={user} onChange={handleUser}>
                <option value="Establishment">Establishment</option>
                <option value="User">User</option>
            </select>  
        </div>
    )
}


export default UserSelect;