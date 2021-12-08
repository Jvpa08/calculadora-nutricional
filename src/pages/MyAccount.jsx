import React from "react";
import Table from "../components/Table";

import styles from "../styles/MyAccount.module.css";

export default function MyAccount() {
  return (
    <div className={styles.wrapper}>
      <section>
        <p>Carboidratos Faltantes: </p>
        <p>Proteinas Faltantes: </p>
        <p>Gorduras Faltantes: </p>
      </section>
      <Table />
    </div>
  );
} 
