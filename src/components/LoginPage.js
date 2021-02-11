import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoaderContext } from "./Loader";

const LoginPage = (props) => {

    // props - 
    //      setUser(user)  || parent function, sets user

    const [ newAccount, setNewAccount ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState(undefined)
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ firstName, setFirstName ] = useState()
    const [ lastName, setLastName ] = useState()
    const [ resetPass, setResetPass ] = useState(false);
    const [ newPass, setNewPass ] = useState('');
    const [ resetCode, setResetCode ] = useState('');
    const [ emailSent, setEmailSent ] = useState(false);
    const [ passwordInputType, setPasswordInputType ] = useState('password');

    const { isLoading, updateIsLoading } = useContext(LoaderContext); 

    const sendCode = async (e) =>{
        e.preventDefault();
        e.target.reset();
        updateIsLoading(true)

        const options = {
            url: `${process.env.REACT_APP_API_URL}/reset/password`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                email: email
            }        
        }

        const res = await axios(options)
        toast(res.data.message)
        if(res.data.type === 'SUCCESS') {
            setEmailSent(true);
        }
        updateIsLoading(false)


    }

    const sendResetPass = async (e) =>{
        e.preventDefault();
        e.target.reset();

        updateIsLoading(true)

        const options = {
            url: `${process.env.REACT_APP_API_URL}/reset/code`,
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            data: {
                email: email,
                code: resetCode,
                newPass: password
            }        
        }

        const res = await axios(options)
        console.log(res)
        toast(res.data.message)
        if(res.data.type === 'SUCCESS') {
            setResetPass(false);
        }

        updateIsLoading(false)

    }

    const loginUser = async () => {

        const options = {
            url: `${process.env.REACT_APP_API_URL}/user/login`,
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

        updateIsLoading(true)
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
        updateIsLoading(false)
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
        setPasswordInputType((passwordInputType==='password')?'text':'password');
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

    useEffect(()=>{
        setEmail('');
        setPasswordInputType('password');
        setPassword('');
        setEmailSent(false);
    }, [resetPass])

    // useEffect(() => {
    //     // console.log(`email: ${email}, \npassword: ${password}, \nfirstname: ${firstName}, \nlastname: ${lastName}`)
    // }, [password, email, firstName, lastName])

    return (
        <div className='LoginPage'>

            <div className='login-header'>
                <h1> For All TN Scorecard Manager </h1>
            </div>


            {(resetPass === false) ? 

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
                            <span className='show-password-button-container'>
                                <input onChange={togglePasswordVisibility} type='checkbox' id='show-password-button'></input>
                                <label htmlFor='show-password-button' id='show-password-button-label'>Show</label>
                            </span>
                        </label>
                            <input onChange={editValue} type={passwordInputType} id='password-input' required='true'></input>
                        {(newAccount===false)?
                        <button type='button' onClick={()=>{setResetPass(true)}} >Forgot your password?</button>
                        :null}
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
            : 
            
            <div className='login-container'>
                <h2>Password Reset</h2>
                
                {(emailSent === false) ? 
                    <div>
                        <form onSubmit={sendCode} className='login-form'>
                            <label htmlFor='email-input'>Email</label>
                            <input id='email-input' onChange={(e) => {setEmail(e.target.value)}} ></input>
                            <button type='submit' >Reset Password</button>
                        </form>
                    </div>
                :
                    <div>
                        <form onSubmit={sendResetPass} className='login-form'>
                            <span className='pad-bot'>A code has been sent to your email.</span>
                            <label htmlFor='email-input'>Code</label>
                            <input id='email-input' onChange={(e) => {setResetCode(e.target.value)}} ></input>
                            <label htmlFor='password-input'>Password
                            <span className='show-password-button-container'>
                                    <input onChange={togglePasswordVisibility} type='checkbox' id='show-password-button'></input>
                                    <label htmlFor='show-password-button' id='show-password-button-label'>Show</label>
                            </span>
                            </label>
                                <input onChange={editValue} type={passwordInputType} id='password-input' required='true'></input>

                            <button type='submit' >Reset Password</button>
                        </form>
                    </div>
                }

                <button onClick={()=>{setResetPass(false)}}>Cancel</button>
            </div>
            
            
            }

        </div>
    );
}

export default LoginPage