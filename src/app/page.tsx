import styles from "./page.module.css";
import Descriptions from "./t1-descricoes/Descriptions";

export default function DescricoesGerais() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Descrições
        </h1>
      </header>
      <Descriptions />
    </>
  )
}