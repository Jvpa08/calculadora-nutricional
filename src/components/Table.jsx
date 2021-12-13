import React from "react";
import MaterialTable from "material-table";
import { firestore } from "../firebaseConfig";

import { localization, options } from "./MaterialTableHelper";
import { UserContext } from "../UserContext";

export default function Table(props) {
  const { dataUser, metabolismoFirestore, peso } =
    React.useContext(UserContext);
  const [foods, setFoods] = React.useState([]);

  React.useEffect(() => {
    props.setEat(metabolismoFirestore + 200);
    props.setGProtein(2.5 * peso);
    props.setGFat(1 * peso);
  }, [metabolismoFirestore, peso]);

  React.useEffect(() => {
    props.setGCarbo(
      (
        (Number(props.eat) -
          4 * Number(props.gProtein) -
          9 * Number(props.gFat)) /
        4
      ).toFixed(2)
    );
  }, [props.gProtein]);

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
    window.localStorage.setItem("foods", JSON.stringify(foods));
    props.setCurrentCarbo(0);
    props.setCurrentProtein(0);
    props.setCurrentFat(0);
    if (foods) {
      for (let i = 0; i < foods.length; i++) {
        props.setCurrentCarbo((anterior) => anterior + foods[i].carbo);
        props.setCurrentProtein((anterior) => anterior + foods[i].protein);
        props.setCurrentFat((anterior) => anterior + Number(foods[i].fat));
      }
    }
  }, [foods]);

  React.useEffect(() => {
    return () => {
      function sendFoods() {
        let userTemp = JSON.parse(window.localStorage.getItem("user"));
        userTemp.foods = JSON.parse(window.localStorage.getItem("foods"));
        console.log(userTemp);
        if (userTemp !== undefined && userTemp.foods.length >= 0) {
          firestore.collection("users").doc(dataUser.uid).set(userTemp);
        }

        window.localStorage.removeItem("user");
        window.localStorage.removeItem("foods");
      }
      sendFoods();
    };
  }, []);

  const columns = [
    { title: "Alimento", field: "name" },
    { title: "Carboidrato (g)", field: "carbo" },
    { title: "Proteina (g)", field: "protein" },
    { title: "Gordura (g)", field: "fat" },
  ];
  console.log(foods)
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
