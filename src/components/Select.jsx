import React from "react";
import styles from "../styles/Select.module.css";

export default function Select({ options, label, handleChange, id }) {
  return (
    <section className={styles.wrapper}> 
      <p className={styles.labelText}>{label}</p>
      <select name={label} id={id} className={styles.select} onChange={handleChange}>
        {options.map((option, key) => (
          <option key={key} value={key}>
            {option}
          </option>
        ))}
      </select>
    </section>
  );
}
