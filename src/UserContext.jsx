import React from "react";
import { auth, firestore } from "./firebaseConfig";

// Criando o Contexto
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [dataUser, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [metabolismoFB, setMetabolismoFB] = React.useState(null);

  function setValuesFirestore(userCredential) {
    firestore
      .collection("users")
      .doc(userCredential.uid)
      .set({
        email: userCredential.email,
        foods: [{ carbo: 0, protein: 0, fat: 0, name: "" }],
        metabolismo: 0,
      });
  }

  function createAccount(email, password) {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setData(userCredential.user);
        setValuesFirestore(userCredential.user);
        setLogin(true);
      })
      .catch((err) => setError(err.message), setLogin(false));
    setLoading(false);
  }

  async function getValuesFirestore(userCredential) {
    const data = await firestore
      .collection("users")
      .doc(userCredential.uid)
      .get();
    console.log(data.id);
  }

  function loginWithEmail(email, password) {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setData(userCredential.user);
        getValuesFirestore(userCredential.user);
        setLogin(true);
      })
      .catch(() => setError("Email ou senha inválidos!"), setLogin(false));

    setLoading(false);
  }

  function handleLogout() {}

  return (
    <UserContext.Provider
      value={{
        loginWithEmail,
        createAccount,
        handleLogout,
        login,
        error,
        loading,
        dataUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
