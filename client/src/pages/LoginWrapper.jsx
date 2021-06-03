import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import loginRequest from 'src/api/users/login'
import { LOGIN_STATUSES } from 'src/api/users/constants'
import { setLoginErrorMsg } from 'src/store/action-creators/user'
import 'src/css/style.css'
import Login from './Login'

function LoginWrapper() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userObj = useSelector((state) => state.user)
  const loginErrorMsg = useSelector((state) => state.user.loginErrorMsg)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoginErrorMsg(null))
  }, [dispatch, email, password])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    loginRequest(email, password)
  }

  if (userObj.loginStatus === LOGIN_STATUSES.SUCCESS && userObj.id) {
    return <Redirect to="../dashboard" />
  }

  return (
    <Login
      loginErrorMsg={loginErrorMsg}
      email={email}
      handleEmailChange={handleEmailChange}
      handleLogin={handleLogin}
      password={password}
      handlePassChange={handlePassChange}
    />
  )
}

export default LoginWrapper
