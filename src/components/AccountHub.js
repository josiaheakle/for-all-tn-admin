
import { useState, useEffect } from "react";
import axios from "axios"
import UserHandler from "../modules/UserHandler.js"
import { toast } from "react-toastify";

const AccountHub = (props) => {

    const [ changingPass, setChangingPass ] = useState(false);
    const [ deleting, setDeleting ] = useState(false);
    const [ showPass, setShowPass ] = useState(false);
    const [ showNewPass, setShowNewPass ] = useState(false);
    const [ oldPass, setOldPass ] = useState('');
    const [ newPass, setNewPass ] = useState('');

    const deleteAccount = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/delete/user`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                userId: UserHandler.getCurrentUser()._id
            }
        }

        let res = await axios(options);
        toast(res.message);
        UserHandler.loggoutUser();

    }

    const updatePass = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/update/password`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                userId: UserHandler.getCurrentUser()._id,
                oldPass: oldPass,
                newPass: newPass
            }
        }


        let res = await axios(options);
        console.log(res)
        if(res.data.type === 'SUCCESS') {
            document.getElementById('change-password-form').reset();
        }
        toast(res.data.message);

    }

    useEffect(() => {
        setShowPass(false);
    }, [changingPass])

    return(
        <div className='AccountHub card'>
            <h2> Account Settings </h2>

            {(changingPass) ? 
            <form onSubmit={(e) => {e.preventDefault()}} id='change-password-form' className='' >
                <label htmlFor='password-input'>Old Password
                    <span className='show-password-button-container'>
                            <input onChange={(e) => {setShowPass(e.target.checked)}} type='checkbox' id='show-password-button'></input>
                            <label htmlFor='show-password-button' id='show-password-button-label'>Show</label>
                    </span>
                </label>
                <input onChange={(e) => {setOldPass(e.target.value)}} type={(showPass === false) ? 'password' : 'text'} id='password-input' required='true'></input>

                <label htmlFor='password-input'>New Password
                    <span className='show-password-button-container'>
                            <input onChange={(e) => {setShowNewPass(e.target.checked)}} type='checkbox' id='show-password-button'></input>
                            <label htmlFor='show-password-button' id='show-password-button-label'>Show</label>
                    </span>
                </label>
                <input onChange={(e) => {setNewPass(e.target.value)}} type={(showNewPass === false) ? 'password' : 'text'} id='password-input' required='true'></input>
                <span>
                    <button type='button' onClick={() => {setChangingPass(false); setOldPass(''); setNewPass('');}}> Cancel </button>
                    <button type='submit' onClick={updatePass}> Submit </button>
                </span>
            </form>
            :
                <>
                {(deleting)?null:
                    <>
                    <button onClick={() => {UserHandler.loggoutUser()}}> Logout </button>
                    <button onClick={() => {setChangingPass(true)}}> Change Password </button>
                    </>
                }
                </>
            }

            {(deleting) ? 
            <>
                <span> Are you sure you want to delete?</span>
                <span>
                    <button onClick={() => {setDeleting(false)}}> No </button>
                    <button onClick={deleteAccount} > Yes </button>
                </span>
            </>
            :
                <>
                {(changingPass)?null:
                <button onClick={() => {setDeleting(true)}}> Delete Account </button>
                }
                </>
            }
            
        </div>
    );
}

export default AccountHub;