import React, { useContext } from "react";
import Table from "../components/Table";

import styles from "../styles/MyAccount.module.css";
import { UserContext } from "../UserContext";

export default function MyAccount() {
  const { metabolismoFirestore } = React.useContext(UserContext);

  const [currentCarbo, setCurrentCarbo] = React.useState(0);
  const [currentProtein, setCurrentProtein] = React.useState(0);
  const [currentFat, setCurrentFat] = React.useState(0);
  const [eat, setEat] = React.useState(0);
  const [gCarbo, setGCarbo] = React.useState(0);
  const [gProtein, setGProtein] = React.useState(0);
  const [gFat, setGFat] = React.useState(0);

  return (
    <div className={styles.wrapper}>
      {metabolismoFirestore === 0 ? (
        <h1 style={{textAlign: 'center', margin: '1rem'}}>Calcule seu Metabolismo!</h1>
      ) : (
        <section className={styles.sectionMacros}>
          <p>Seu metabolismo é {metabolismoFirestore}</p>
          <p>Carboidratos Faltantes: {gCarbo - Number(currentCarbo)} </p>
          <p>Proteinas Faltantes: {gProtein - Number(currentProtein)} </p>
          <p>Gorduras Faltantes: {gFat - Number(currentFat)} </p>
        </section>
      )}
      <Table
        setCurrentCarbo={setCurrentCarbo}
        setCurrentProtein={setCurrentProtein}
        setCurrentFat={setCurrentFat}
        eat={eat}
        setEat={setEat}
        gCarbo={gCarbo}
        setGCarbo={setGCarbo}
        gProtein={gProtein}
        setGProtein={setGProtein}
        gFat={gFat}
        setGFat={setGFat}
      />
    </div>
  );
}
