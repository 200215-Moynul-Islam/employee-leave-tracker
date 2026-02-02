import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import TextField from "../TextField/TextField";
import "./ProfileCard.css";
import { updatePasswordSchema } from "../../schemas/auth";
import userService from "../../api/user.service.js";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message.js";
import { toast } from "react-toastify";

function ProfileCard({ user }) {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const result = updatePasswordSchema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        newPassword: fieldErrors?.newPassword?.[0] ?? "",
        confirmPassword: fieldErrors?.confirmPassword?.[0] ?? "",
      });
      return;
    } else {
      setErrors({ newPassword: "", confirmPassword: "" });
    }

    // Call password API
    try {
      if (await userService.updatePassword(user.id, formValues.newPassword)) {
        setIsUpdating(false);
        toast.success(FEEDBACK_MESSAGES.USER.PASSWORD_UPDATE_SUCCESS);
      } else {
        toast.error(FEEDBACK_MESSAGES.USER.PASSWOORD_UPDATE_FAILURE);
      }
    } catch (error) {
      switch (error.status) {
        default: {
          toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
        }
      }
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        {isUpdating == false && (
          <button
            className="update-password-button"
            onClick={() => setIsUpdating(true)}
          >
            <Lock size={12} /> <span>Update Password</span>
          </button>
        )}
      </div>

      {isUpdating && (
        <div className="password-section">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-row">
              <TextField
                label="New Password"
                value={formValues.newPassword}
                onChange={handleChange("newPassword")}
                error={errors.newPassword}
                type={showNewPass ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              <TextField
                label="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={errors.confirmPassword}
                type={showConfirmPass ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
            </div>
            <div className="button-row">
              <button type="submit" className="save-password-button">
                Save
              </button>
              <button
                type="button"
                className="cancel-password-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUpdating(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
