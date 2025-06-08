import NonTrivialCharts from "./NonTrivialCharts";
import styles from "../page.module.css";

export default function EstatisticasNaoTriviais() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Dados Não-Triviais
        </h1>
      </header>
      <NonTrivialCharts />
    </>
  )
}