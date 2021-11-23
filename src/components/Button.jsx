import React from "react";
import styles from "../styles/Button.module.css";

export default function Button({ innerText, ...props }) {
  if (props.center === "center")
    return (
      <button {...props} className={styles.buttonCenter}>
        {innerText}
      </button>
    );
  return (
    <button {...props} className={styles.button}>
      {innerText}
    </button>
  );
}
