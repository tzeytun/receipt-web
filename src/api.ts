import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export type Product = { id: string; name: string; price: number };
export type CartItem = { product: Product; qty: number };

export async function fetchProducts() {
  const { data } = await axios.get(`${API_BASE}/api/products`);
  return data.products as Product[];
}

export async function checkout(payload: {
  customer: { name: string; email: string };
  items: { productId: string; qty: number }[];
}) {
  const { data } = await axios.post(`${API_BASE}/api/checkout`, payload);
  return data.orderId as string;
}

export async function fetchOrder(orderId: string) {
  const { data } = await axios.get(`${API_BASE}/api/orders/${orderId}`);
  return data as { order: any; company: any };
}

export function receiptUrl(orderId: string) {
  return `${API_BASE}/api/orders/${orderId}/receipt`;
}
