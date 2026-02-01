import "./EditEmployeeModal.css";
import Modal from "../Modal/Modal.jsx";
import { UserPen, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import TextField from "../TextField/TextField.jsx";
import { editEmployeeSchema } from "../../schemas/auth.js";
import { VALIDATION_CONFIG } from "../../config/validation.config.js";
import userService from "../../api/user.service.js";
import { toast } from "react-toastify";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message.js";

function EditEmployeeModal({ employee = [], onClose, onEditEmployeeSuccess }) {
  const [formValues, setFormValues] = useState({
    id: employee?.id ?? "",
    name: employee?.name ?? "",
    email: employee.email?.name ?? "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      setFormValues({
        id: employee?.id ?? "",
        name: employee?.name ?? "",
        email: employee?.email ?? "",
      });
    }
  }, [employee]);

  const handleEditEmployeeSuccess = (emp) => {
    onEditEmployeeSuccess(emp);
    onClose();
  };

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const result = editEmployeeSchema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors?.name?.[0] ?? "",
        email: fieldErrors?.email?.[0] ?? "",
      });
      return;
    }

    // Call update user API
    try {
      const res = await userService.updateUser(formValues.id, {
        name: formValues.name,
        email: formValues.email,
      });
      if (res.success) {
        handleEditEmployeeSuccess(res.data);
        toast.success(FEEDBACK_MESSAGES.USER.UPDATE_SUCCESS);
      } else {
        toast.error(FEEDBACK_MESSAGES.USER.UPDATE_FAILURE);
      }
    } catch (error) {
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
    <Modal onClose={onClose} className="edit-employee-modal">
      <UserPen size={45} color="#135dec" className="user-plus-icon" />
      <form className="edit-employee-modal-form" onSubmit={handleSubmit}>
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

export default EditEmployeeModal;
