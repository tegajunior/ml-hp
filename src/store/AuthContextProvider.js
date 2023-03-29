import { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false
}

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    localStorage.setItem('isLoggedIn', true)
    return {
      isLoggedIn: true
    }
  }

  if (action.type === "LOGOUT") {
    localStorage.clear()
    return {
      isLoggedIn: false
    }
  }
}

const AuthContextProvider = ({ children }) => {
  const [authState, dispathAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  )
  const loginUser = () => dispathAuthAction({ type: 'LOGIN' })

  const logoutUser = () => dispathAuthAction({ type: 'LOGOUT' })

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    login: loginUser,
    logout: logoutUser
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider