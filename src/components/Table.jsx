import React from "react";
import MaterialTable from "material-table";
import { firestore } from "../firebaseConfig";

import { localization, options, editable } from "./MaterialTableHelper";
import { UserContext } from "../UserContext";

export default function Table({ props }) {
  const { dataUser } = React.useContext(UserContext);
  const [foods, setFoods] = React.useState([]);
  const [currentCarbo, setCurrentCarbo] = React.useState(0);
  const [currentProtein, setCurrentProtein] = React.useState(0);
  const [currentFat, setCurrentFat] = React.useState(0);

  React.useEffect(() => {
    async function fetchFoods() {
      const userFB = await firestore
        .collection("users")
        .doc(dataUser.uid)
        .get();
      window.localStorage.setItem("user", JSON.stringify(userFB.data()));
      setFoods(userFB.data().foods);
    }
    fetchFoods();
  }, []);

  React.useEffect(() => {
    return () => {
      function sendFoods() {
        let userTemp = JSON.parse(window.localStorage.getItem("user"));
        userTemp.foods = JSON.parse(window.localStorage.getItem("foods"));

        if (userTemp !== undefined && userTemp.foods.length > 0) {
          firestore.collection("users").doc(dataUser.uid).set(userTemp);
        }

        window.localStorage.removeItem("user");
        window.localStorage.removeItem("foods");
      }
      sendFoods();
    };
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("foods", JSON.stringify(foods));
    setCurrentCarbo(0);
    setCurrentProtein(0);
    setCurrentFat(0);
    if (foods) {
      for (let i = 0; i < foods.length; i++) {
        setCurrentCarbo((anterior) => anterior + foods[i].carbo);
        setCurrentProtein((anterior) => anterior + foods[i].protein);
        setCurrentFat((anterior) => anterior + Number(foods[i].fat));
      }
    }
  }, [foods]);

  const columns = [
    { title: "Alimento", field: "name" },
    { title: "Carboidrato (g)", field: "carbo" },
    { title: "Proteina (g)", field: "protein" },
    { title: "Gordura (g)", field: "fat" },
  ];

  return (
    <section>
      <MaterialTable
        title="Tabela de Alimentos"
        data={foods}
        columns={columns}
        options={options}
        localization={localization}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [...foods, newRow];
              setTimeout(() => {
                setFoods(updatedRows);
                resolve();
              }, 1000);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updateRows = [...foods];
              updateRows.splice(index, 1); // Remove o elemento do index atual
              setTimeout(() => {
                setFoods(updateRows);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updateRows = [...foods];
              updateRows[index] = updatedRow;
              setTimeout(() => {
                setFoods(updateRows);
                resolve();
              }, 2000);
            }),
        }}
      />
    </section>
  );
}
