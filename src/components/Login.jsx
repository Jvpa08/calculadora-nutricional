import React from "react";
import { auth } from "../firebaseConfig";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./loginComponents/LoginForm";
/* import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset"; */
import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function loginWithEmail() {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    console.log(response)
  }

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          {/* <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} /> */}
        </Routes>
      </div>
    </section>
  );
};

export default Login;
