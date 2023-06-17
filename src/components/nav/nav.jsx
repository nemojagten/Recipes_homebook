import { NavLink, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import clsx from "clsx";
import { useAuthContext } from "../../features/Auth/Auth.context";
import { AddRecipe, RecipeList, EditRecipe } from "../../features";
import { Home } from "../../features";

export function Nav() {
  const { user, logout } = useAuthContext();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.replace("/");
  };

  if (!user) {
    return (
      <nav>
        
        <menu>
          <li>
            <NavLink
              className={({ isActive }) => clsx({ [styles.active]: isActive})}
              to="/"
            >
              Home                                       
              
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => clsx({ [styles.active]: isActive })}
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => clsx({ [styles.active]: isActive })}
              to="/register"
            >
              Register
            </NavLink>
          </li>
          
        </menu>
        
      </nav>
    );
  }

  return (
    <nav>
      <menu>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/add"
          >
            Add Recipe
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/recipes"
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/edit"
          >
            Edit Details
          </NavLink>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </menu>
      
    </nav>
  );
}