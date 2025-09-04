import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";

function ProtectedRoute({ children, anonymous = false }) {
  // Invoke the useLocation hook and access the value of the
  // 'from' property from its state object. If there is no 'from'
  // property we default to "/".
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  // If a user is not logged in and tries to access a route that
  // requires authorization, we redirect them to the /login route.

  if (!anonymous && !isLoggedIn) {
    // While redirecting to /login we set the location objects
    // state.from property to store the current location value.
    // This allows us to redirect them appropriately after they
    // log in.
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
