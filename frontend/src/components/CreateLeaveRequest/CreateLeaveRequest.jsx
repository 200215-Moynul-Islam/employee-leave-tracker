import React, { useState } from "react";
import { CalendarDays, Send } from "lucide-react";
import TextField from "../TextField/TextField";
import "./CreateLeaveRequest.css";
import { createLeaveSchema } from "../../schemas/leaveRequest";
import leaveService from "../../api/leave.service";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message";
import { toast } from "react-toastify";

function CreateLeaveRequest({ userId, onCreateSuccess }) {
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
  });

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form values
    const result = createLeaveSchema.safeParse(formValues);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        startDate: fieldErrors?.startDate?.[0] ?? "",
        endDate: fieldErrors?.endDate?.[0] ?? "",
      });
      return;
    } else {
      setErrors({ startDate: "", endDate: "" });
    }

    // Call password API
    try {
      await leaveService.CreateLeaveRequest({
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        userId: userId,
      });
      onCreateSuccess();
      toast.success(FEEDBACK_MESSAGES.LEAVE_REQUEST.CREATE_SUCCESS);
    } catch (error) {
      switch (error.status) {
        case 404: {
          toast.error(FEEDBACK_MESSAGES.USER.NOT_FOUND);
          break;
        }
        default: {
          toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
        }
      }
    }
  };

  return (
    <div className="leave-request-container">
      <div className="leave-request-header">
        <h2>Request New Leave</h2>
        <p>Submit your time-off request for manager approval.</p>
      </div>

      <div className="leave-request-card">
        <form onSubmit={handleSubmit}>
          <div className="leave-form-grid">
            <TextField
              label="Start Date"
              value={formValues.startDate}
              error={errors.startDate}
              onChange={handleChange("startDate")}
              type="date"
              leftIcon={<CalendarDays size={16} />}
            />
            <TextField
              label="End Date"
              value={formValues.endDate}
              error={errors.endDate}
              onChange={handleChange("endDate")}
              type="date"
              leftIcon={<CalendarDays size={16} />}
            />
            <div className="leave-form-action">
              <button className="submit-button">
                <Send size={16} /> Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLeaveRequest;
