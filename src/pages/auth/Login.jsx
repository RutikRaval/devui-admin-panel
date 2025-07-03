// src/pages/auth/Login.tsx
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginApi } from "../../services/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      loginFetch(values)
    },
  });
  const loginFetch = async (data) => {
    try {
      const response = await loginApi(data)
      if (response?.success) {
        
        toast.success(response.message)
        sessionStorage.setItem("token", response?.token)
        sessionStorage.setItem("user",JSON.stringify(response?.data))
        navigate('/')
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

    </>
  );
};

export default Login;
