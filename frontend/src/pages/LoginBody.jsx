import "./Login.css";
import { useState } from "react";
import { Mail, Eye, EyeOff, LogIn, Lock } from "lucide-react";
import { loginSchema } from "../schemas/auth";
import TextField from "../components/TextField/TextField.jsx";
import { VALIDATION_CONFIG } from "../config/validation.config";
import { toast } from "react-toastify";
import authService from "../api/auth.service.js";
import { VALIDATION_MESSAGES } from "../messages/validation.messages.js";
import { FEEDBACK_MESSAGES } from "../messages/feedback.message.js";

function LoginBody({
  formValues,
  setFormValues,
  errors,
  setErrors,
  onLoginSuccess,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const result = loginSchema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors?.email?.[0] ?? "",
        password: fieldErrors?.password?.[0] ?? "",
      });
      return;
    } else {
      setErrors({ email: "", password: "", form: "" });
    }

    // Call login API
    try {
      if (await authService.login(formValues.email, formValues.password)) {
        onLoginSuccess();
        toast.success(FEEDBACK_MESSAGES.AUTH.LOGIN.SUCCESS);
      } else {
        toast.error(FEEDBACK_MESSAGES.AUTH.LOGIN.FAILURE);
      }
    } catch (error) {
      console.log(error);
      switch (error.status) {
        case 401: {
          setErrors({ form: FEEDBACK_MESSAGES.AUTH.LOGIN.INVALID_CREDENTIALS });
          break;
        }
        default: {
          toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
        }
      }
    }
  };

  return (
    <form className="login-body" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        value={formValues.email}
        onChange={handleChange("email")}
        placeholder="name@example.com"
        error={errors.email}
        maxLength={VALIDATION_CONFIG.AUTH.EMAIL.MAX_LENGTH}
        leftIcon={<Mail />}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <TextField
          label="Password"
          value={formValues.password}
          type={isPasswordVisible ? "text" : "password"}
          onChange={handleChange("password")}
          placeholder="Password"
          error={errors.password}
          maxLength={VALIDATION_CONFIG.AUTH.PASSWORD.MAX_LENGTH}
          leftIcon={<Lock />}
          rightIcon={
            <button
              className="eye-icon"
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? <EyeOff /> : <Eye />}
            </button>
          }
        />
        {errors.form && <ErrorMessage message={errors.form} />}
      </div>
      <button className="login-button">
        <LogIn />
        Log In
      </button>
    </form>
  );
}

export default LoginBody;
