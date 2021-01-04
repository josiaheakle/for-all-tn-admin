import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserHandler from "../modules/UserHandler.js"

const UserCard = (props) => {

    // props -
    //      user

    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ checked, setChecked ] = useState(false)

    const updateAdminStatus = async (e) => {

        setChecked(!checked)

        const options = {
            url: 'http://localhost:4000/update/admin',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                userToAdmin: props.user._id,
                adminStatus: isAdmin,
                user: UserHandler.getCurrentUser()._id
            }
        }

        const res = await axios(options)
        if(res.data.type === 'SUCCESS') {
            setIsAdmin(checked)
            toast(res.data.message)
        } else {
            setChecked(isAdmin)
            toast(res.data.message)
        }

    }

    useEffect(() => {
        setIsAdmin(props.user.admin)
        setChecked(props.user.admin)
    }, [])

    return(
        <div className='UserCard' id={`user-${props.user._id}`} >
            <div>
                {`${props.user.first_name} ${props.user.last_name}`}
            </div>
            <div>
                {`${props.user.email}`}
            </div>
            <div>
                <label htmlFor='user-admin-checkbox'>Admin </label>
                <input onChange={updateAdminStatus} id='user-admin-checkbox' type='checkbox' checked={checked} ></input>
            </div>
        </div>
    );
}

export default UserCard;