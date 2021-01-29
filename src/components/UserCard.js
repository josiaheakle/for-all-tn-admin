import axios from "axios";
import { toast } from "react-toastify";
import UserHandler from "../modules/UserHandler.js"

const UserCard = (props) => {

    // props -
    //      user

    // const [ isAdmin, setIsAdmin ] = useState(false)
    // const [ checked, setChecked ] = useState(false)

    const updateAdminStatus = async (e) => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/admin`,

            // url: 'http://localhost:4000/update/admin',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                userToAdmin: props.user._id,
                adminStatus: e.target.checked,
                user: UserHandler.getCurrentUser()._id
            }
        }

        const res = await axios(options)
        // if(res.data.type === 'SUCCESS') {
        //     setIsAdmin(checked)
        toast(res.data.message)
        // } else {
        //     setChecked(isAdmin)
        //     toast(res.data.message)
        // }

    }

    // useEffect(() => {

    // }, [checked])

    // useEffect(() => {
    //     setChecked(props.user.admin)
    // }, [])

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
                <input onClick={updateAdminStatus} id='user-admin-checkbox' type='checkbox' defaultChecked={props.user.admin} ></input>
            </div>
        </div>
    );
}

export default UserCard;