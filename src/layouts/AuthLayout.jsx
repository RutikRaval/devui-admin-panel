// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 " style={{
        background: "linear-gradient(135deg, #dee2ff, #ced4da)",
      }}>
      <div className="border rounded shadow p-4 bg-white w-100" style={{ maxWidth: "400px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
