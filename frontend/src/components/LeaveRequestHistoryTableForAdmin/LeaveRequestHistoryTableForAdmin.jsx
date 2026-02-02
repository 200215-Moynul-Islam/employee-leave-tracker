import React from "react";
import "./LeaveRequestHistoryTableForAdmin.css";

function LeaveRequestHistoryTableForAdmin({ leaveRequests }) {
  return (
    <div>
      <h2 className="leave-request-history-table-for-admin-table-header">
        Request History
      </h2>
      <div className="leave-request-history-table-for-admin-container">
        <table className="leave-request-history-table-for-admin-main">
          <thead>
            <tr className="leave-request-history-table-for-admin-header">
              <th className="leave-request-history-table-for-admin-th">
                Employee
              </th>
              <th className="leave-request-history-table-for-admin-th">
                Application Date
              </th>
              <th className="leave-request-history-table-for-admin-th">
                Start Date
              </th>
              <th className="leave-request-history-table-for-admin-th">
                End Date
              </th>
              <th className="leave-request-history-table-for-admin-th leave-request-history-table-for-admin-text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leaveRequest) => (
              <tr
                key={leaveRequest.id}
                className="leave-request-history-table-for-admin-row"
              >
                <td className="leave-request-history-table-for-admin-td">
                  <div className="leave-request-history-table-for-admin-employee">
                    <span className="leave-request-history-table-for-admin-name">
                      {leaveRequest.user.name}
                    </span>
                    <span className="leave-request-history-table-for-admin-email">
                      {leaveRequest.user.email}
                    </span>
                  </div>
                </td>
                <td className="leave-request-history-table-for-admin-td">
                  <span className="leave-request-history-table-for-admin-date">
                    {formatDate(leaveRequest.createdAt)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-admin-td">
                  <span className="leave-request-history-table-for-admin-date">
                    {formatDate(leaveRequest.startDate)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-admin-td">
                  <span className="leave-request-history-table-for-admin-date">
                    {formatDate(leaveRequest.endDate)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-admin-td leave-request-history-table-for-admin-text-right">
                  <span
                    className={`leave-request-history-table-for-admin-status leave-request-history-table-for-admin-status-${leaveRequest.status}`}
                  >
                    {leaveRequest.status}
                  </span>
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

export default LeaveRequestHistoryTableForAdmin;
