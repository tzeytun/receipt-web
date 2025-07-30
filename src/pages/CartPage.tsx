import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "../App.module.css";
import { formatCurrency } from "../utils";

export default function CartPage() {
  const { items, remove, update } = useCart();
  const sum = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Cart</h3>
      {items.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Back to products</Link>
        </p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((i) => (
              <div key={i.product.id} className={styles.card}>
                <div style={{ fontWeight: 600 }}>{i.product.name}</div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", alignItems: "center" }}>
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => update(i.product.id, Math.max(1, Number(e.target.value)))}
                    style={{ width: "60px", padding: "0.3rem" }}
                  />
                  <div>{formatCurrency(i.product.price * i.qty)}</div>
                  <button onClick={() => remove(i.product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <hr style={{ margin: "1.5rem 0" }} />
          <div>
            <p>
              Total Amount: <b>{formatCurrency(sum)}</b>
            </p>
            <Link to="/checkout">
              <button style={{ marginTop: "0.5rem" }}>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
