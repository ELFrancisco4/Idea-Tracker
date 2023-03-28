import Form from "../Shared Components/Form";
import { BiUserCircle } from "react-icons/bi";
import InputField from "../Shared Components/InputField";
import "./login.scss";
import { useState } from "react";
import Button from "../Shared Components/Button";

const Login = () => {
  const [data, setData] = useState<any>({});
  return (
    <div className="login">
      <h1>Login</h1>
      <BiUserCircle />
      <Form>
        <div>
          <InputField placeholder="Enter your username" type="text" value="" />
        </div>
        <div>
          <InputField type="checkbox" /> <a href="">Forgot password?</a>
        </div>
        <br />
        <div>
          <InputField
            placeholder="Enter your password"
            type="password"
            value=""
          />
        </div>
      </Form>
      <Button text="Login" />
      <div>
        New user? <a href="#">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
