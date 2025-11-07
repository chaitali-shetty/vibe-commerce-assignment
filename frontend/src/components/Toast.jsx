export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast">
      {message}
      <style>{`
        .toast {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: #111;
          color: #fff;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 9999;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
