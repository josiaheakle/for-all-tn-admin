import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserHandler from "../modules/UserHandler.js"
import UserCard from "./UserCard.js"

const UserHub = (props) => {

    const [ admin, setAdmin ] = useState(false)
    const [ users, setUsers ] = useState(undefined)

    const getAllUsers = async () => {
        
        const options = {
            url: `http://localhost:4000/get/users/${UserHandler.getCurrentUser()._id}`,
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }

        let res = await axios(options)

        if(res.data.type === 'SUCCESS') {
            setUsers(res.data.users)
        } else {
            toast(res.data.message)
        }
        // console.log(res)

    }

    useEffect(() => {
        setAdmin(UserHandler.isUserAdmin())
        getAllUsers()
    }, [])

    return (
        <div className='UserHub card'>
            {(admin)? 
            <div>
                <h2>All Users</h2>
                {(users)?users.map((u, i) => {
                    if(u._id !== UserHandler.getCurrentUser()._id) return (<UserCard user={u} key={i} />)
                    else return null
                }):null}
            </div>
            :
            <div>
                You do not have permision to view this page.
            </div>
            }
        </div>
    );
}

export default UserHub;