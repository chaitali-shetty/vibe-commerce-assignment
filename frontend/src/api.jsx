const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function getProducts() {
  const r = await fetch(`${API_BASE}/products`);
  return r.json();
}

export async function getCart() {
  const r = await fetch(`${API_BASE}/cart`);
  return r.json();
}

export async function addToCart(productId, quantity = 1) {
  const r = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  return r.json();
}

export async function removeFromCart(productId) {
  const r = await fetch(`${API_BASE}/cart/${productId}`, { method: 'DELETE' });
  return r.json();
}

export async function checkout(cart) {
  const r = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems: cart.items || [] }),
  });
  return r.json();
}
