import React from "react";
import { auth } from "./firebaseConfig";

// Criando o Contexto
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  function createAccount(email, password) {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setData(userCredential.user)
        setLogin(true);
      })
      .catch((err) => setError(err.message), setLogin(false));
    setLoading(false);
  }

  function loginWithEmail(email, password) {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setData(userCredential.user)
        setLogin(true);
      })
      .catch(() => setError("Email ou senha inválidos!"), setLogin(false));

    setLoading(false);
  }

  return (
    <UserContext.Provider
      value={{ loginWithEmail, createAccount, login, error, loading, data }}
    >
      {children}
    </UserContext.Provider>
  );
};
