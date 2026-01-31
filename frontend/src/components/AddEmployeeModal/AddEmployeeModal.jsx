import "./AddEmployeeModal.css";
import Modal from "../Modal/Modal";
import { UserPlus, Mail, Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import TextField from "../TextField/TextField.jsx";
import { registerSchema } from "../../schemas/auth.js";
import { VALIDATION_CONFIG } from "../../config/validation.config.js";
import userService from "../../api/user.service.js";
import { toast } from "react-toastify";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message.js";

function AddEmployeeModal({ onClose, onAddEmployeeSuccess }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleAddEmployeeSuccess = (emp) => {
    onAddEmployeeSuccess(emp);
    onClose();
  };

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const result = registerSchema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors?.name?.[0] ?? "",
        email: fieldErrors?.email?.[0] ?? "",
        password: fieldErrors?.password?.[0] ?? "",
      });
      return;
    }

    // Call register API
    try {
      const res = await userService.register({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      });
      if (res.data) {
        handleAddEmployeeSuccess(res.data);
        toast.success(FEEDBACK_MESSAGES.USER.REGISTRATION_SUCESS);
      } else {
        toast.error(FEEDBACK_MESSAGES.USER.REGISTRATION_FAIL);
      }
    } catch (error) {
      console.log(error);
      switch (error.status) {
        case 409: {
          setErrors({ email: FEEDBACK_MESSAGES.USER.EXISTS });
          break;
        }
        default: {
          toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
        }
      }
    }
  };

  return (
    <Modal onClose={onClose} className="add-employee-modal">
      <UserPlus size={45} color="#135dec" className="user-plus-icon" />
      <form className="add-employee-modal-form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={formValues.name}
          onChange={handleChange("name")}
          placeholder="e.g. Moynul Islam"
          error={errors.name}
          maxLength={VALIDATION_CONFIG.AUTH.NAME.MAX_LENGTH}
          leftIcon={<User />}
        />
        <TextField
          label="Email"
          value={formValues.email}
          onChange={handleChange("email")}
          placeholder="name@example.com"
          error={errors.email}
          maxLength={VALIDATION_CONFIG.AUTH.EMAIL.MAX_LENGTH}
          leftIcon={<Mail />}
        />
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
        <div className="button-container">
          <button className="form-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="form-button save-button">Save</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddEmployeeModal;
