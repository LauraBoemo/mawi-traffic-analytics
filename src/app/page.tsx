import styles from "./page.module.css";

import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
