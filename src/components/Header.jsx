import React from "react";
import styles from "../styles/Header.module.css";
import { ReactComponent as FruitHeader } from "../assets/icons/fruit.svg";
import dropDown from "../assets/icons/dropDown.png";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const { login, dataUser } = React.useContext(UserContext);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (login) {
      setName(dataUser.email.substring(0, dataUser.email.indexOf("@")));
    }
  }, [login]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <div className={styles.icon}>
            <FruitHeader />
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
  const { handleLogout } = React.useContext(UserContext);
  const [isActive, setIsActive] = React.useState(false);

  if (nome) nome = nome[0].toUpperCase() + nome.substring(1);

  return (
    <>
      <Link to="/calculadora">
        <p className={styles.menuText}>Calculadora</p>
      </Link>
      <div className={styles.menuTextNome}>
        Olá {nome}
        <button
          onClick={() => setIsActive(!isActive)}
          className={styles.menuButton}
        >
          <img src={dropDown} className={styles.iconDropDown} />
        </button>
        <span></span>
        {isActive && (
          <div className={styles.logout} onClick={() => handleLogout()}>
            Sair!
          </div>
        )}
      </div>
    </>
  );
};
