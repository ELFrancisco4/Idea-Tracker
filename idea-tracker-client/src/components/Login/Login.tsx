import Form from "../Shared Components/Form";
import { BiUserCircle } from "react-icons/bi";
import InputField from "../Shared Components/InputField";
import "./login.scss";
import { useState } from "react";
import Button from "../Shared Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .required(),
});

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleSubmit = async (values: FormikValues) => {
    const { name, password } = values;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        {
          name,
          password,
        },
        { withCredentials: true }
      );

      if (res) {
        navigate("/home");
        setIsLoggedIn(true);
        localStorage.setItem("currentUser", JSON.stringify({ name }));
        toast.success("Welcome back!")
      } else {
        alert("Login Failed. Username or Password incorrect");
      }
    } catch (error: any) {
      setError(error.response.data);
      toast.error("Login failed. Please try again")
    }
  };

  const formik = useFormik({
    initialValues: { name: "", password: "" },
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="login">
      <div className="login_container">
        <section className="left">
          <h1>Login Page</h1>
          <div>
            <h3>Ideas Written Down Are Set In Stone</h3>
            <p>Login to begin recording your ideas</p>
          </div>
        </section>
        <section className="right">
          <Form onSubmit={formik.handleSubmit}>
            <BiUserCircle />
            <span className="welcome_message">Hello! Welcome back</span>
            <div>
              <label htmlFor="name">Username</label>
              {formik.touched.name && formik.errors.name ? (
                <span className="errors">{formik.errors.name}</span>
              ) : (
                ""
              )}
              <InputField
                classname="text_input"
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                type="text"
                placeholder="Enter your username"
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password ? (
                <span className="errors">{formik.errors.password} </span>
              ) : (
                ""
              )}
              <InputField
                classname="text_input"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
            </div>
            <span className="remember_me">
              <div>
                <InputField
                  classname="checkbox"
                  id="checkbox"
                  type="checkbox"
                  value=""
                  placeholder=""
                />
                <p>Remember Me</p>
              </div>
              <a href="#">Reset Password?</a>
            </span>

            <Button type="submit" text="Login"></Button>
          </Form>
          {error && error}
        </section>
      </div>
    </div>
  );
};

export default Login;
