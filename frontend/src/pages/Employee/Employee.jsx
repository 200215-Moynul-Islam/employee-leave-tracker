import React, { useEffect, useState } from "react";
import "./Employee.css";
import { toast } from "react-toastify";
import Container from "../../components/Container/Container";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import CreateLeaveRequest from "../../components/CreateLeaveRequest/CreateLeaveRequest";
import userService from "../../api/user.service";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message";
import LeaveRequestHistoryTableForEmployee from "../../components/LeaveRequestHistoryTableForEmployee/LeaveRequestHistoryTableForEmployee";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import leaveService from "../../api/leave.service";

function Employee({ userId }) {
  const [employee, setEmployee] = useState(null);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await userService.getEmployeeWithLeaveRequests(userId);
        setEmployee(res.data);
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

    fetchEmployee();
  }, []);

  const handleDeleteLeaveRequestSuccess = async () => {
    // Call delete user API
    try {
      const res = await leaveService.deleteLeaveRequest(
        selectedLeaveRequest.id,
        employee.id
      );
      setEmployee((prev) => ({
        ...prev,
        leaves: prev.leaves.filter(
          (leave) => leave.id !== selectedLeaveRequest.id
        ),
      }));
      setSelectedLeaveRequest(null);
      toast.success(FEEDBACK_MESSAGES.LEAVE_REQUEST.DELETE_SUCCESS);
    } catch (error) {
      switch (error.status) {
        case 404: {
          toast.error(FEEDBACK_MESSAGES.LEAVE_REQUEST.NOT_FOUND);
          break;
        }
        default: {
          toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
        }
      }
    }
  };

  const handleCreateLeaveRequestSuccess = (leaveRequest) => {
    setEmployee((prev) => ({
      ...prev,
      leaves: [leaveRequest, ...prev.leaves],
    }));
  };

  return (
    <>
      <Container className="employee-page-container">
        <ProfileCard user={employee} />
        <CreateLeaveRequest
          userId={employee?.id}
          onCreateSuccess={handleCreateLeaveRequestSuccess}
        />
        <LeaveRequestHistoryTableForEmployee
          employee={employee}
          onDeleteClick={(leaveRequest) =>
            setSelectedLeaveRequest(leaveRequest)
          }
        />
        {selectedLeaveRequest && (
          <ConfirmationModal
            onCancel={() => setSelectedLeaveRequest(null)}
            onConfirm={handleDeleteLeaveRequestSuccess}
            messageHeader="Confirm Delete"
            message={
              "Are you sure you want to delete this leave request? This action cannot be undone."
            }
          />
        )}
      </Container>
    </>
  );
}

export default Employee;
