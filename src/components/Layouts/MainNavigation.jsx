import { Navbar, Button } from "flowbite-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import './MainNavigation.css'

// TODO: import context from store

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const navigate = useNavigate();

  const logoutUser = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <Navbar fluid={true} rounded={true}>
      <NavLink to="/">Hordanso Project</NavLink>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        {isLoggedIn && <NavLink to="/translator">Translator</NavLink>}
        {isLoggedIn && <NavLink to="/text2img">Text2Image</NavLink>}
        {isLoggedIn && <Button onClick={logoutUser} size="xs" color="failure">Logout</Button>}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default MainNavigation;
