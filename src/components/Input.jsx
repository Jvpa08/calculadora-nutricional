import React from "react";
import styles from "../styles/Input.module.css";

export default function Input({ label, type, value, error, onChange, onBlur }) {
  return (
      <div className={styles.wrapper}>
          <label className={styles.label}>
              {label}
              <input
                  type={type}
                  value={value}
                  className={styles.input}
                  onChange={onChange}
                  onBlur={onBlur}
              />
          </label>
          {error && <p className={styles.error}>{error}</p>}
      </div>
  );
}
