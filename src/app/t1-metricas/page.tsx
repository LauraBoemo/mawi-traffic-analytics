
import AdvancedCharts from "./AdvancedCharts";
import styles from "../page.module.css";

export default function MetricasObrigatorias() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Métricas  
        </h1>
      </header>
      <AdvancedCharts />
    </>
  )
}