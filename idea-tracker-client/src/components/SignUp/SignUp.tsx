import * as yup from "yup";
import { useFormik, FormikValues } from "formik";
import Form from "../Shared Components/Form";
import InputField from "../Shared Components/InputField";
import Button from "../Shared Components/Button";
import { BiBrain } from "react-icons/bi";
import Logo from "../Shared Components/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = async (values: FormikValues) => {
    try {
      const { name, email, password } = values;
      console.log(values);
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
        name,
        email,
        password,
      });

      if (res) {
        alert("User created successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("User could not be created.");
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .required(),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    onSubmit: handleSignUp,
    validationSchema: validationSchema,
    validateOnBlur: true,
  });

  return (
    <div className="signup_container">
      <section className="signup_container_left">
        <div className="logo">
          <Logo />
        </div>
        <h1>Welcome, Intellectual Being!</h1>
        <p>Create an account to begin documenting your ideas.</p>
        <BiBrain />
      </section>

      <section className="signup_container_right">
        <Form onSubmit={formik.handleSubmit}>
          <h1>Create Account</h1>

          <label htmlFor="name">Username</label>
          {formik.touched.name && formik.errors.name ? (
            <span className="errors">{formik.errors.name}</span>
          ) : (
            ""
          )}
          <InputField
            classname="text_input"
            id="name"
            type="text"
            value={formik.values.name}
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label htmlFor="email">Email Address</label>
          {formik.touched.email && formik.errors.email ? (
            <span className="errors">{formik.errors.email}</span>
          ) : (
            ""
          )}
          <InputField
            classname="text_input"
            id="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label htmlFor="password">Password</label>
          {formik.touched.password && formik.errors.password ? (
            <span className="errors">{formik.errors.password}</span>
          ) : (
            ""
          )}
          <InputField
            classname="text_input"
            id="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Button type="submit" text="SIGN UP" />
          <span>
            Already signed up? <a href="/login">Login</a>
          </span>
        </Form>
      </section>
    </div>
  );
};

export default SignUp;
