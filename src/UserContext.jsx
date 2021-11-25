import React from "react";
import { auth } from "./firebaseConfig";

// Criando o Contexto
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  function createAccount(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch(() => setError("Email ou senha inválidos!"), setLogin(false));
  }

  function loginWithEmail(email, password) {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setLogin(true);
      })
      .catch(() => setError("Email ou senha inválidos!"), setLogin(false));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <UserContext.Provider
      value={{ loginWithEmail, createAccount, login, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
