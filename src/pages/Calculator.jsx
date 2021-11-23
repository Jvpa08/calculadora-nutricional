import React from "react";
import styles from "../styles/Calculator.module.css";

import Input from "../components/InputCalculator";
import Select from "../components/Select";
import Button from "../components/Button";

// Equaçao de Herris Benedict

const options = [
  "",
  "Sedentário", // 1.2
  "Exercícios Leves (1-2 dias)", // 1.375
  "Exercícios Moderados (3-5 dias)", // 1.55
  "Exercícios Pesados (6-7 dias)", // 1.725
  "Atleta (2 vezes por dia)", //1.9
];

export default function Calculator() {
  const [form, setForm] = React.useState({
    sexo: "",
    idade: 0,
    altura: 0,
    peso: 0,
    atividade: "",
  });

  const [metabolismo, setMetabolismo] = React.useState(null);
  const [error, setError] = React.useState(false);

  function metabolismoBasal(form) {
    const [idade, altura, peso] = [
      Number(form.idade),
      Number(form.altura),
      Number(form.peso),
    ];
    const sexo = form.sexo;
    const atividade = Number(form.atividade);

    let metabolismoFinal;

    const tabela = [1.2, 1.375, 1.55, 1.725, 1.9];

    if (sexo === "masculine") {
      metabolismoFinal = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else if (sexo === "feminine")
      metabolismoFinal = 10 * peso + 6.25 * altura - 5 * idade - 161;

    for (let i = 0; i !== atividade - 1; i++) {
      metabolismoFinal = metabolismoFinal * tabela[i];
    }

    return metabolismoFinal.toFixed(2);
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  function validate(form) {
    const values = [Number(form.idade), Number(form.altura), Number(form.peso)];
    const sexo = form.sexo;
    const atividade = form.atividade;

    if (Number(atividade) === 0) {
      setError(true);
      return false;
    } else if (sexo === "") {
      setError(true);
      return false;
    } else {
      for (let i = 0; i < values.length; i++) {
        if (values[i] <= 0) {
          setError(true);
          return false;
        }
      }
    }
    setError(false);
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const itsOk = validate(form);
    if (itsOk) setMetabolismo(metabolismoBasal(form));
  }

  return (
    <div className={styles.page}>
      <section className={styles.calculator}>
        <h1>Calculadora de Nutrientes</h1>
        <form action="">
          <p>Informe os Dados</p>
          <div className={styles.gender}>
            Sexo:
            <Input
              type="radio"
              label="Masculino"
              value="masculine"
              id="sexo"
              handleChange={handleChange}
            />
            <Input
              type="radio"
              label="Feminino"
              value="feminine"
              id="sexo"
              handleChange={handleChange}
            />
          </div>
          <Input
            type="number"
            label="Idade"
            id="idade"
            handleChange={handleChange}
          />
          <Input
            type="number"
            label="Altura (cm)"
            id="altura"
            handleChange={handleChange}
          />
          <Input
            type="number"
            label="Peso (Kg)"
            id="peso"
            handleChange={handleChange}
          />
          <Select
            label="Nível de Atividade"
            id="atividade"
            options={options}
            handleChange={handleChange}
          />
          {error === true ? (
            <p style={{ color: "red" }}>Digite valores válidos!</p>
          ) : null}
          <Button innerText="Calcular" onClick={handleSubmit} center="center" />
          {metabolismo !== null ? <p className={styles.result}>Suas calorias de manutenção são: <strong>{metabolismo}</strong></p> : null}
        </form>
      </section>
    </div>
  );
}
