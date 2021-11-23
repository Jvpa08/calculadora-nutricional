import React from "react";
import styles from "../styles/InputCalculator.module.css";

export default function InputCalculator({ type, label, id, handleChange, value }) {

  if (type === "radio")
    return (
      <div className={styles.wrapperRadio}>
        <label className={styles.labelRadio}>
          <input type={type} id={id} name={id} className={styles.inputLabel} value={value} onChange={(e) => handleChange(e)} />
          <p className={styles.labelTextRadio}>{label}</p>
        </label>
      </div>
    );
  return (
    <label className={styles.label}>
      <p className={styles.labelText}>{label}</p>
      <input type={type} id={id} name={id} className={styles.input} onChange={(e) => handleChange(e)} />
    </label>
  );
}
