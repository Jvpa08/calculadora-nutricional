import React from "react";
import Input from "../Input";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import useForm from "../../hooks/useForm";
import styles from "../../styles/LoginCreate.module.css";
import Button from "../Button";
import Error from "../Error";

export default function LoginCreate() {
  const { login, loading, createAccount, error } =
    React.useContext(UserContext);

  const email = useForm("email");
  const password = useForm();

  if (login === true) return <Navigate to="/conta" />;

  function handleSubmit(e) {
    e.preventDefault();

    if (email.validate && password.validate) {
      createAccount(email.value, password.value);
    }
  }

  return (
    <section className={styles.login}>
      <div className={`${styles.loginForm} animeLeft`}>
        <h1 className="title">Cadastre-se</h1>
        <form action="" onSubmit={handleSubmit}>
          <Input label="E-mail" type="email" {...email} />
          <Input label="Senha" type="password" {...password} />
          {loading ? (
            <Button disabled innerText="Criando Conta..." />
          ) : (
            <Button innerText="Criar Conta" />
          )}
          {error ? <Error error={error} /> : null}
        </form>
      </div>
    </section>
  );
}
