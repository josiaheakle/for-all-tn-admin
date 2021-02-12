
// my components
import IssueHub from "./IssueHub.js"
import CandidateHub from "./CandidateHub.js"
import LoginPage from "./LoginPage.js"
import UserHub from "./UserHub.js"

// my modules
import UserHandler from "../modules/UserHandler.js"

// react functions
import { Switch, Route, BrowserRouter, Redirect, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

// css
import "../styles/style.css"
import 'react-toastify/dist/ReactToastify.css';

// media 
import bgImg from "../media/sunsphere.jpg"
import AccountHub from "./AccountHub.js"
import Loader, { LoaderContext } from "./Loader.js"

// other
require('dotenv').config();


function App() {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ user, setUser ] = useState(undefined);

  const updateIsLoading = (bool) => {
    setIsLoading(bool);
  }

  useEffect(() => {
    UserHandler.setOnUserUpdate(setUser)

  }, [])

  useEffect(() => {
    // console.log(`user`)
    // console.log(user)
  }, [user])

  return (
    <div className="App" >
      <ToastContainer hideProgressBar={true} position={'bottom-right'} limit={1} autoClose={2500} />
      {/* style={{ backgroundImage: `url(${bgImg})` }} */}
        <div className='background-image' ></div>
        <BrowserRouter >
          <LoaderContext.Provider value={{isLoading, updateIsLoading}} >
          <Loader ></Loader>
          <Switch>
            <Route exact path='/'>
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : <Redirect to='/candidates' />
              }
            </Route>
            <Route path='/login' >
              <LoginPage setUser={UserHandler.setCurrentUser} />
                {(user!==undefined) 
                  ? <Redirect to='/candidates' /> 
                  : null
                }
            </Route>
            <Route path='/issues' >
              <div className="navbar">
                <Link className='navbar-link' to='/candidates'>Candidates</Link>
                <Link className='navbar-link selected' to='/issues'>Issues</Link>
                <Link className='navbar-link' to='/users'>Users</Link>
                <Link className='navbar-link' to='/account'>Account</Link>

              </div>
              <IssueHub />
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : null
              }
            </Route>
            <Route path='/candidates'>
              <div className="navbar">
                <Link className='navbar-link selected' to='/candidates'>Candidates</Link>
                <Link className='navbar-link' to='/issues'>Issues</Link>
                <Link className='navbar-link' to='/users'>Users</Link>
                <Link className='navbar-link' to='/account'>Account</Link>

              </div>
              <CandidateHub />
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : null
              }
            </Route>
            <Route path='/users'>
              <div className="navbar">
                <Link className='navbar-link' to='/candidates'>Candidates</Link>
                <Link className='navbar-link' to='/issues'>Issues</Link>
                <Link className='navbar-link selected' to='/users'>Users</Link>
                <Link className='navbar-link' to='/account'>Account</Link>

              </div>
              <UserHub />
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : null
              }
            </Route>
            <Route path='/account'>
              <div className="navbar">
                <Link className='navbar-link' to='/candidates'>Candidates</Link>
                <Link className='navbar-link' to='/issues'>Issues</Link>
                <Link className='navbar-link' to='/users'>Users</Link>
                <Link className='navbar-link selected' to='/account'>Account</Link>
              </div>
              <AccountHub />
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : null
              }
            </Route>

            <Route path='/'>
              {(user===undefined) 
                ? <Redirect to='/login' /> 
                : null
              }
            </Route>
          </Switch>
          </LoaderContext.Provider>
        </BrowserRouter>
    </div>

  );
}

export default App;
