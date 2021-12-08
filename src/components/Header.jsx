import React from "react";
import styles from "../styles/Header.module.css";
import { ReactComponent as FruitHeader } from "../assets/icons/fruit.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const { login, dataUser } = React.useContext(UserContext);
  let name;
  if (login) {
    name = dataUser.email.substring(0, dataUser.email.indexOf("@"));
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <div className={styles.icon}>
            <FruitHeader/>
          </div>
        </Link>

        {login ? <MiniHeaderLogado nome={name} /> : <MiniHeader />}
      </nav>
    </header>
  );
}

const MiniHeader = () => {
  return (
    <Link to="/calculadora">
      <p className={styles.menuText}>Calculadora</p>
    </Link>
  );
};

const MiniHeaderLogado = ({ nome }) => {
  return (
    <>
      <Link to="/calculadora">
        <p className={styles.menuText}>Calculadora</p>
      </Link>
      <p className={styles.menuText}>Olá {nome} </p>
    </>
  );
};
