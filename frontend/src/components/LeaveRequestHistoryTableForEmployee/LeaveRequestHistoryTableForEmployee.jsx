import React from "react";
import "./LeaveRequestHistoryTableForEmployee.css";
import { Trash } from "lucide-react";
import LEAVE_STATUS from "../../Constants/leaveStatus";

function LeaveRequestHistoryTableForEmployee({ employee, onDeleteClick }) {
  const leaveRequests = employee?.leaves;
  return (
    <div>
      <h2 className="leave-request-history-table-for-employee-table-header">
        Request History
      </h2>
      <div className="leave-request-history-table-for-employee-container">
        <table className="leave-request-history-table-for-employee-main">
          <thead>
            <tr className="leave-request-history-table-for-employee-header">
              <th className="leave-request-history-table-for-employee-th">
                Application Date
              </th>
              <th className="leave-request-history-table-for-employee-th">
                Start Date
              </th>
              <th className="leave-request-history-table-for-employee-th">
                End Date
              </th>
              <th className="leave-request-history-table-for-employee-th">
                Status
              </th>
              <th className="leave-request-history-table-for-employee-th leave-request-history-table-for-employee-text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests?.map((leaveRequest) => (
              <tr
                key={leaveRequest?.id}
                className="leave-request-history-table-for-employee-row"
              >
                <td className="leave-request-history-table-for-employee-td">
                  <span className="leave-request-history-table-for-employee-date">
                    {formatDate(leaveRequest?.createdAt)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-employee-td">
                  <span className="leave-request-history-table-for-employee-date">
                    {formatDate(leaveRequest?.startDate)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-employee-td">
                  <span className="leave-request-history-table-for-employee-date">
                    {formatDate(leaveRequest?.endDate)}
                  </span>
                </td>
                <td className="leave-request-history-table-for-employee-td">
                  <span
                    className={`leave-request-history-table-for-employee-status leave-request-history-table-for-employee-status-${leaveRequest?.status}`}
                  >
                    {leaveRequest?.status}
                  </span>
                </td>
                <td className="leave-request-history-table-for-employee-td leave-request-history-table-for-employee-text-right">
                  {leaveRequest.status === LEAVE_STATUS.PENDING && (
                    <div className="leave-request-history-table-for-employee-action">
                      <button
                        className="leave-request-history-table-for-employee-delete-button"
                        onClick={() => onDeleteClick(leaveRequest)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  )}
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

export default LeaveRequestHistoryTableForEmployee;
