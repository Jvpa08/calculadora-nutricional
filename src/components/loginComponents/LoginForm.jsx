import React from "react";
import styles from "../../styles/LoginForm.module.css";
import stylesBtn from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import UseForm from "../../hooks/useForm";
import Input from "../Input";
import Button from "../Button";
import Error from "../Error";

import { UserContext } from "../../UserContext";

export default function LoginForm() {
  const email = UseForm("email");
  const password = UseForm();

  const { loginWithEmail, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (email.validate() && password.validate()) {
      loginWithEmail(email.value, password.value);
    }
  }

  return (
    <section className={`${styles.formSection} animeLeft`}>
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled innerText="Carregando..." />
        ) : (
          <Button innerText="Entrar" />
        )}
        {error ? <Error error={error} /> : null}
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
}
