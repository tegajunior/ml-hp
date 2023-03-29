import React, { useCallback } from "react";

const AuthContext = React.createContext({
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  login: () => { },
  logout: () => { },
});
export default AuthContext;
