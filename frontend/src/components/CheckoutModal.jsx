import { useState } from 'react';

export default function CheckoutModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal">
        <h3>Checkout</h3>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="row">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onSubmit({ name, email })}>Pay (mock)</button>
        </div>
      </div>
      <style>{`
        .overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          display: grid; place-items: center; z-index: 1000;
        }
        .modal {
          background: #fff; padding: 18px; border-radius: 12px; width: min(92vw, 420px);
          display: flex; flex-direction: column; gap: 10px;
        }
        input {
          border: 1px solid #ddd; border-radius: 8px; padding: 10px 12px;
        }
        .row { display: flex; gap: 10px; justify-content: flex-end; }
        button { padding: 10px 12px; border: none; border-radius: 10px; background: #111; color: #fff; cursor: pointer; }
      `}</style>
    </div>
  );
}
