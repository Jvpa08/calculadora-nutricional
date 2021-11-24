import React from "react";

// Criando o Contexto
export const UserContext = React.createContext();

export default function UserStorage({ children }) {

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null)

  return (
      <UserContext.Provider value={}>
          {children}
      </UserContext.Provider>
  )
}
