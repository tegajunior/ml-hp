import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ProtectedRoutes = (props) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return props.children
}

export default ProtectedRoutes
