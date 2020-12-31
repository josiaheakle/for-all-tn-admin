import axios from "axios";
import { useEffect, useState } from "react";


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
            url: 'http://localhost:4000/user/login',
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
        if(res.data.type === 'SUCCESS') {
            props.setUser(res.data.user)
        }
        console.log(res)


    }

    const createNewUser = async () => {

        const options = {
            url: 'http://localhost:4000/user/new',
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
        if(res.data.type === 'SUCCESS') {
            props.setUser(res.data.user)
        }
        console.log(res)

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

    useEffect(() => {
        console.log(`email: ${email}, \npassword: ${password}, \nfirstname: ${firstName}, \nlastname: ${lastName}`)
    }, [password, email, firstName, lastName])

    return (
        <div className='LoginPage'>
            {(alertMessage)?<span id='alert-message'>{`${alertMessage}`}</span>:null}
            {/* {(newAccount===false)? */}
                <form onSubmit={handleSubmit} className='login-form'> 
                    <label htmlFor='email-input'>Email</label>
                    <input id='email-input' onChange={editValue}></input>
                    {(newAccount===true)?
                        <div>
                            <label htmlFor='first-name-input'>First Name</label>
                            <input onChange={editValue} type='text' id='first-name-input' ></input>
                            <label htmlFor='last-name-input'>Last Name</label>
                            <input onChange={editValue} type='text' id='last-name-input' ></input>
                        </div>
                    : null}
                    <label htmlFor='password-input'>Password</label>
                    <input onChange={editValue} type='password' id='password-input'></input>

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
            <label htmlFor='show-password-button'>Show Password</label>
            <input onChange={togglePasswordVisibility} type='checkbox' id='show-password-button'></input>
            <button onClick={toggleForm}>
                {(!newAccount) ? `New Account` : `Use Existing Account`}
            </button>
        </div>
    );
}

export default LoginPage