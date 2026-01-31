import "./Login.css";
import LoginHeader from "./LoginHeader.jsx";
import LoginBody from "./LoginBody.jsx";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
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
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      </div>
    </div>
  );
}

export default Login;
