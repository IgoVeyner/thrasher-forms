import './App.css'
import Home from './redux/components/home'
import SignupForm from './redux/components/forms/signup'
import LoginForm from './redux/components/forms/login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogin, postUser } from './services/api'
import { getUser, setFetchedUser, clearUser } from './redux/actions/userActions'
import { setToken, clearToken } from './services/localstorage'
import NavBar from './redux/components/navbar'

function App() {

  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  const setCurrentUser = () => dispatch(getUser())
  const setUser = username => dispatch(setFetchedUser(username))

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
    if (localStorage.getItem('jwt')) {
      setCurrentUser()
    } 
  }, [])

  return (
    <Router>
      {currentUser === "" ? null : currentUser }
      <NavBar />

      <Route path="/" exact component={Home} />
      <Route path="/signup" exact render={ () => <SignupForm handleSignup={handleSignup} /> } />
      <Route path="/login" exact render={ () => <LoginForm handleLogin={handleLogin} /> } />

      <button onClick={handleLogout}>LOGOUT</button>
    </Router>
  );
}

export default App;
