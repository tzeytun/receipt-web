import { type FormEvent, useState } from "react";
import { checkout } from "../api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const nav = useNavigate();
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const orderId = await checkout({
        customer: { name, email },
        items: items.map((i) => ({ productId: i.product.id, qty: i.qty })),
      });
      clear();
      nav(`/order/${orderId}`);
    } catch {
      alert("Sipariş oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p>Cart is empty. <a href="/">Back to products</a></p>;
  }

  return (
    <div>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Confirm Order</h3>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "1rem", maxWidth: 400 }}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", border: "1px solid #ccc", borderRadius: 6 }}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", border: "1px solid #ccc", borderRadius: 6 }}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}
