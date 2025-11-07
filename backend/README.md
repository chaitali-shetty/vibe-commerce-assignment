# Vibe Commerce — Backend

## Setup
1. `npm install`
2. Copy `.env` (already present). 
Example: PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce1
3. (Optional) Seed products
npm run seed
4. Run
npm run dev


### APIs
- `GET /api/products` → 5–10 mock items (auto-seeded on first call)
- `GET /api/cart` → current cart + total
- `POST /api/cart` → `{ productId, quantity }` add/update
- `DELETE /api/cart/:id` → remove product from cart
- `POST /api/checkout` → `{ cartItems }` ⇒ `{ receipt }` (mock)

### Notes
- Mock user id: `mock-user-001`
- Error handling middleware included


