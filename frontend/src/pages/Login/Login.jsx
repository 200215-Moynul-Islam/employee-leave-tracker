import "./Login.css";
import LoginHeader from "./LoginHeader.jsx";
import LoginBody from "./LoginBody.jsx";
import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  return (
    <div className="login-container">
      <div className="login">
        <LoginHeader />
        <LoginBody
          formValues={formValues}
          setFormValues={setFormValues}
          errors={errors}
          setErrors={setErrors}
          onLoginSuccess={(token) => onLoginSuccess(token)}
        />
      </div>
    </div>
  );
}

export default Login;
