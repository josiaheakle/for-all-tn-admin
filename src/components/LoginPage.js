import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = (props) => {

    // props - 
    //      setUser(user)  || parent function, sets user

    const [ newAccount, setNewAccount ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState(undefined)
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ firstName, setFirstName ] = useState()
    const [ lastName, setLastName ] = useState()

    const loginUser = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/user/login`,
            // url: 'http://localhost:4000/user/login',
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                email: email,
                password: password
            }        
        }

        const res = await axios(options)
        toast(res.data.message)

        if(res.data.type === 'SUCCESS') {
            props.setUser(res.data.user)
        }


    }

    const createNewUser = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/user/new`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
        }

        const res = await axios(options)
        toast(res.data.message)
        if(res.data.type === 'SUCCESS') {
            props.setUser(res.data.user)
        }
        // console.log(res)

    }

    const toggleForm = () => {
        setNewAccount(!newAccount)
    }

    const editValue = (e) => {

        const value = e.target.value
        switch(e.target.id) {
            case('email-input'):
                setEmail(value)
                break;
            case('password-input'):
                setPassword(value)
                break;
            case('first-name-input'):
                setFirstName(value)
                break;
            case('last-name-input'):
                setLastName(value)
                break;
        }
    }

    const togglePasswordVisibility = () => {
        const passwordCheckbox = document.getElementById('show-password-button')
        const passwordInput = document.getElementById('password-input')
        if(passwordCheckbox.checked) {
            passwordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newAccount) {
            createNewUser()
        } else {
            loginUser()
        }
    }

    // useEffect(() => {
    //     // console.log(`email: ${email}, \npassword: ${password}, \nfirstname: ${firstName}, \nlastname: ${lastName}`)
    // }, [password, email, firstName, lastName])

    return (
        <div className='LoginPage'>

            <div className='login-header'>
                <h1> For All TN Admin </h1>
            </div>

            <div className='login-container'>

                <h2>
                    {(!newAccount)?`Login`:`Create Account`}
                </h2>
                {(alertMessage)?<span id='alert-message'>{`${alertMessage}`}</span>:null}
                {/* {(newAccount===false)? */}
                    <form onSubmit={handleSubmit} className='login-form'> 
                        <label htmlFor='email-input'>Email</label>
                        <input type='email' id='email-input' onChange={editValue } required='true'></input>
                        {(newAccount===true)?
                            <div className='align-vertical'>
                                <label htmlFor='first-name-input'>First Name</label>
                                <input onChange={editValue} type='text' id='first-name-input' required='true'></input>
                                <label htmlFor='last-name-input'>Last Name</label>
                                <input onChange={editValue} type='text' id='last-name-input' required='true'></input>
                            </div>
                        : null}
                        <label htmlFor='password-input'>Password
                        
                            (
                            <input onChange={togglePasswordVisibility} type='checkbox' id='show-password-button'></input>
                            <label htmlFor='show-password-button'>Show</label>
                            )
                        </label>
                        <input onChange={editValue} type='password' id='password-input' required='true'></input>

                        <button type='submit' >
                            {(newAccount===true)?
                                'Create Account'
                            :
                                'Login'
                            }
                        </button>

                    </form>
                {/* : */}
                    {/* <form onSubmit={handleSubmit} className='new-account-form'> 
                        <label htmlFor='email-input'>Email</label>
                        <input id='email-input' onChange={editValue}></input>


                        <label htmlFor='password-input'>Password</label>
                        <input type='password' id='password-input'></input>
                        <button type='submit' >Create Account</button>
                    </form> */}
                {/* } */}
                <button onClick={toggleForm}>
                    {(!newAccount) ? `New Account` : `Use Existing Account`}
                </button>


            </div>
        </div>
    );
}

export default LoginPage