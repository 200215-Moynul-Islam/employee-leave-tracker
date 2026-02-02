import React, { useEffect, useState } from "react";
import "./LeaveRequests.css";
import { toast } from "react-toastify";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import leaveService from "../../api/leave.service";
import PendingLeaveRequestTable from "../PendingLeaveRequestsTable/PendingLeaveRequestsTable";
import LeaveRequestHistoryTableForAdmin from "../LeaveRequestHistoryTableForAdmin/LeaveRequestHistoryTableForAdmin";
import LEAVE_STATUS from "../../Constants/leaveStatus";

function LeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPendingLeaveRequest, setSelectedPendingLeaveRequest] =
    useState(null);

  const handleApproveClick = (pendingLeaveRequest) => {
    setSelectedPendingLeaveRequest(pendingLeaveRequest);
    setActiveModal("Approve");
  };

  const handleRejectClick = (pendingLeaveRequest) => {
    setSelectedPendingLeaveRequest(pendingLeaveRequest);
    setActiveModal("Reject");
  };

  const changeLeaveRequestStatus = async (status) => {
    setActiveModal(null);
    try {
      var success = false;
      if (status === LEAVE_STATUS.APPROVED) {
        const res = await leaveService.approveLeaveRequest(
          selectedPendingLeaveRequest.id,
          selectedPendingLeaveRequest.user.id
        );
        if (res.success) {
          success = true;
          toast.success(FEEDBACK_MESSAGES.LEAVE_REQUEST.APPROVE_SUCESS);
        } else {
          toast.error(FEEDBACK_MESSAGES.LEAVE_REQUEST.APPROVE_FAILURE);
        }
      } else {
        const res = await leaveService.rejectLeaveRequest(
          selectedPendingLeaveRequest.id,
          selectedPendingLeaveRequest.user.id
        );
        if (res.success) {
          success = true;
          toast.success(FEEDBACK_MESSAGES.LEAVE_REQUEST.REJECT_SUCESS);
        } else {
          toast.error(FEEDBACK_MESSAGES.LEAVE_REQUEST.REJECT_FAILURE);
        }
      }

      // update the state variable to view the changes in UI
      if (success) {
        setLeaveRequests((prevLeaveRequests) =>
          prevLeaveRequests.map((leaveRequest) =>
            leaveRequest.id === selectedPendingLeaveRequest.id
              ? { ...leaveRequest, status: status }
              : leaveRequest
          )
        );
      }
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

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const res = await leaveService.getAllLeaveRequests();
        setLeaveRequests(res.data);
      } catch (error) {
        toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div className="manage-employees-container">
      <PendingLeaveRequestTable
        leaveRequests={leaveRequests}
        onApproveClick={(pendingLeaveRequest) =>
          handleApproveClick(pendingLeaveRequest)
        }
        onRejectClick={(pendingLeaveRequest) =>
          handleRejectClick(pendingLeaveRequest)
        }
      />
      <LeaveRequestHistoryTableForAdmin leaveRequests={leaveRequests} />
      {activeModal === "Approve" && (
        <ConfirmationModal
          onCancel={() => setActiveModal(null)}
          onConfirm={() => changeLeaveRequestStatus(LEAVE_STATUS.APPROVED)}
          messageHeader="Confirm Approve"
          message={
            "Are you sure you want to approve this leave request? This action cannot be undone."
          }
        />
      )}
      {activeModal === "Reject" && (
        <ConfirmationModal
          onCancel={() => setActiveModal(null)}
          onConfirm={() => changeLeaveRequestStatus(LEAVE_STATUS.REJECTED)}
          messageHeader="Confirm Reject"
          message={
            "Are you sure you want to reject this leave request? This action cannot be undone."
          }
        />
      )}
    </div>
  );
}

export default LeaveRequests;
