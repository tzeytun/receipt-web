import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { useCart } from "../src/context/CartContext";


export default function App() {
  const { items } = useCart();
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Digital Store</h2>
        <nav className={styles.nav}>
          <Link to="/">Products</Link>
        </nav>
      </header>

      {/* ✅ Uyarı kutusu */}
      {showAlert && (
        <div className={styles.alert}>
          <div className={styles.alertText}>
            ⚠️ This is a fictional project created to practice generating and downloading receipts. None of the products are real.
          </div>
          <button className={styles.alertClose} onClick={() => setShowAlert(false)}>
            ×
          </button>
        </div>
      )}

      <hr />
      <Outlet />

{items.length > 0 && (
  <Link to="/cart" className={styles.floatingCart}>
    🛒
    <div className={styles.cartBadge}>{items.reduce((sum, i) => sum + i.qty, 0)}</div>
  </Link>
)}

    </div>
  );
}
