import React from "react";
import { Navigate, Route } from "react-router";
import { UserContext } from "./UserContext";

export default function PrivateRoute({ children }) {
  const { login } = React.useContext(UserContext);

  return login ? children : <Navigate to="/" /> 
}


