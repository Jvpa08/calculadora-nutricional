import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./loginComponents/LoginForm";
import styles from "../styles/Login.module.css";

import { UserContext } from "../UserContext";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
