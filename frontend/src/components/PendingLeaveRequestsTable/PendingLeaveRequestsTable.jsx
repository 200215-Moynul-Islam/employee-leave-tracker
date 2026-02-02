import React from "react";
import "./PendingLeaveRequestsTable.css";
import LEAVE_STATUS from "../../Constants/leaveStatus";

function PendingLeaveRequestsTable({
  leaveRequests,
  onApproveClick,
  onRejectClick,
}) {
  const pendingLeaveRequests = leaveRequests.filter(
    (leaveRequest) => leaveRequest.status === LEAVE_STATUS.PENDING
  );

  return (
    <div>
      <h2 className="pending-leave-request-table-header">
        Pending Leave Requests
      </h2>
      <div className="pending-leave-request-table-container">
        <table className="pending-leave-request-table-main">
          <thead>
            <tr className="pending-leave-request-table-header">
              <th className="pending-leave-request-table-th">Employee</th>
              <th className="pending-leave-request-table-th">
                Application Date
              </th>
              <th className="pending-leave-request-table-th">Start Date</th>
              <th className="pending-leave-request-table-th">End Date</th>
              <th className="pending-leave-request-table-th pending-leave-request-table-text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingLeaveRequests.map((pendingLeaveRequest) => (
              <tr
                key={pendingLeaveRequest.id}
                className="pending-leave-request-table-row"
              >
                <td className="pending-leave-request-table-td">
                  <div className="pending-leave-request-table-employee">
                    <span className="pending-leave-request-table-name">
                      {pendingLeaveRequest.user.name}
                    </span>
                    <span className="pending-leave-request-table-email">
                      {pendingLeaveRequest.user.email}
                    </span>
                  </div>
                </td>
                <td className="pending-leave-request-table-td">
                  <span className="pending-leave-request-table-date">
                    {formatDate(pendingLeaveRequest.createdAt)}
                  </span>
                </td>
                <td className="pending-leave-request-table-td">
                  <span className="pending-leave-request-table-date">
                    {formatDate(pendingLeaveRequest.startDate)}
                  </span>
                </td>
                <td className="pending-leave-request-table-td">
                  <span className="pending-leave-request-table-date">
                    {formatDate(pendingLeaveRequest.endDate)}
                  </span>
                </td>
                <td className="pending-leave-request-table-td pending-leave-request-table-text-right">
                  <div className="pending-leave-request-table-actions">
                    <button
                      className="pending-leave-request-table-btn pending-leave-request-table-btn-approve"
                      onClick={() => onApproveClick(pendingLeaveRequest.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="pending-leave-request-table-btn pending-leave-request-table-btn-reject"
                      onClick={() => onRejectClick(pendingLeaveRequest.id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

export default PendingLeaveRequestsTable;
