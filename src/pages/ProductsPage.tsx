import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "../api";
import { useCart } from "../context/CartContext";
import styles from "../App.module.css";
import { formatCurrency } from "../utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { add } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Products</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{p.name}</div>
            <div style={{ color: "#2563eb", fontWeight: 500, marginBottom: "0.75rem" }}>
              {formatCurrency(p.price)}
            </div>
            <button onClick={() => add(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
