import React from "react";
import styles from "../styles/Header.module.css";
import { ReactComponent as FruitHeader } from "../assets/icons/fruit.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <FruitHeader />
        </Link>

        <Link to="/calculadora">
          <p className={styles.menuText}>Calculadora</p>
        </Link>
      </nav>
    </header>
  );
}
