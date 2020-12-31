
// my components
import IssueHub from "./IssueHub.js"
import CandidateHub from "./CandidateHub.js"
import LoginPage from "./LoginPage.js"

// my modules
import UserHandler from "../modules/UserHandler.js"

// react functions
import { Switch, Route, BrowserRouter, Redirect, Link } from "react-router-dom"
import { useEffect, useState } from "react"

// css
import "../styles/style.css"

function App() {

  const [ user, setUser ] = useState(undefined)

  useEffect(() => {
    UserHandler.setOnUserUpdate(setUser)

    console.log('on mount')

  }, [])

  useEffect(() => {
    console.log(`user`)
    console.log(user)
  }, [user])

  return (
    <div className="App">
      <button id='loggout-button' onClick={UserHandler.loggoutUser}>
        Loggout
      </button>
      <BrowserRouter >
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
              <Link to='/candidates'>Candidates</Link>

              {/* <a className='navigation-button' href='../candidates' >
                Candidates
              </a> */}
            </div>
            <IssueHub />
            {(user===undefined) 
              ? <Redirect to='/login' /> 
              : null
            }
          </Route>
          <Route path='/candidates'>
            <div className="navbar">
              <Link to='/issues'>Issues</Link>

            </div>
            <CandidateHub />
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
      </BrowserRouter>
    </div>

  );
}

export default App;
