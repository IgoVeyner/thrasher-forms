import './App.css'
import Home from './redux/components/home'
import SignupForm from './redux/components/forms/signup'
import LoginForm from './redux/components/forms/login'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogin, postUser } from './services/api'
import { getUser, setFetchedUser, clearUser } from './redux/actions/userActions'
import { setToken, clearToken, getToken } from './services/localstorage'
import NavBar from './redux/components/nav/navbar'
import { useEffect } from 'react'
import PostContainer from './redux/containers/postsContainer'
import NoMatch from './redux/components/noMatch'

function App() {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const setUserFromToken = () => dispatch(getUser())
  const setUser = username => dispatch(setFetchedUser(username))

  const checkAuthorization = () => {
    if (getToken() && user === "") {
      setUserFromToken()  
    } 
  }

  const handleSignup = newUser => {
    postUser(newUser)
    .then(data => {
      if (data.error) {
        // display user errors on screen differently
        alert(data.messages)
      }
      
      if (data.jwt) {
        setToken(data.jwt)
        setUser(data.user.username)
      }
    })
  }

  const handleLogin = credentials => {
    fetchLogin(credentials).then(data => {
      if (data.error) {
        // display message on screen differently
        alert(data.error) 
      }

      if (data.jwt) {
        setToken(data.jwt)
        setUser(data.user.username)
      }
    })
  }

  const handleLogout = () => {
    clearToken()
    dispatch(clearUser())
  }

  useEffect(() => {
    checkAuthorization()
  }, []);

  const redirectToLoginPreCheck = (route = "/") => {
    if (user !== "") {
      switch (route) {
        case "events":
          return <PostContainer route={route} />

        case "videos":
          return <PostContainer route={route} />

        case "photos":
          return <PostContainer route={route} />

        default:
          return <Home />
      }
    } else {
      return <Redirect to="/login" />
    }
  } 

  const redirectToHomePreCheck = route => {
    if (user === "") {
      switch (route) {
        case "signup":
          return <SignupForm handleSignup={handleSignup} />

        case "login":
          return <LoginForm handleLogin={handleLogin} />

        default:
          return <LoginForm handleLogin={handleLogin} />
       }

    } else {
      return <Redirect to="/" />
    }
  }

  const checkForTokenAndUser = () => {
    if (getToken() && user === "") {
      return null
    } else {
      return (
        <Router>
          <NavBar handleLogout={handleLogout} />

          <Switch>
            
            <Route path="/signup" exact >
              {redirectToHomePreCheck("signup")}
            </Route>

            <Route path="/login" exact >
              {redirectToHomePreCheck("login")}
            </Route>

            <Route path="/events" exact >
              {redirectToLoginPreCheck("events")}
            </Route>

            <Route path="/videos" exact >
              {redirectToLoginPreCheck("videos")}
            </Route>

            <Route path="/photos" exact >
              {redirectToLoginPreCheck("photos")}
            </Route>
            
            <Route path="/" exact >
              {redirectToLoginPreCheck()}
            </Route>

            <Route path="*" component={NoMatch} />

          </Switch>

        </Router>
      )
    }
  }

  return (
    <>
      {checkForTokenAndUser()}
    </>
  )
}

export default App;