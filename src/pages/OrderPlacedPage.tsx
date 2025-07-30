import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrder, receiptUrl } from "../api";
import styles from "../App.module.css";
import { formatCurrency } from "../utils";

export default function OrderPlacedPage() {
  const { orderId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId).then(setData).catch(() => setData(null));
    }
  }, [orderId]);

  if (!orderId) {
    return <p>Invalid order.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const { order, company } = data;

  return (
    <div className={styles.card} style={{ padding: "2rem", maxWidth: 560, margin: "0 auto" }}>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Order Placed 🎉</h3>

      <p>
        <b>Your Order ID:</b> {order.id}
      </p>
      <p>
        <b>Date:</b> {new Date(order.date).toLocaleString("en-US")}
      </p>

      <h4 style={{ marginTop: "1.5rem" }}>Products</h4>
      <ul style={{ marginBottom: "1rem" }}>
        {order.items.map((it: any) => (
          <li key={it.id}>
            {it.name} × {it.qty} — {formatCurrency(it.unitPrice * it.qty)}
          </li>
        ))}
      </ul>

      <div>
        Subtotal: <b>{formatCurrency(order.subtotal)}</b>
        <br />
        VAT (%{Math.round(order.vatRate * 100)}): <b>{formatCurrency(order.vat)}</b>
        <br />
        Total: <b>{formatCurrency(order.total)}</b>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <a
          href={receiptUrl(orderId)}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 6,
            padding: "0.5rem 0.9rem",
          }}
        >
          View/Download PDF Receipt
        </a>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
        Seller: {company.name} — {company.address}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/">Back to store</Link>
      </div>
    </div>
  );
}
