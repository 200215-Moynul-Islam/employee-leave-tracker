import React from "react";
import "./EmployeeTable.css";
import { Edit, Trash } from "lucide-react";

function EmployeeTable({ employees, onDelete, onEdit }) {
  const handleDelete = (id) => {
    // Implement later
  };

  const handleEdit = (employee) => {
    // Implement later
  };

  return (
    <div className="employee-table-container">
      <table className="employee-table-main">
        <thead>
          <tr className="employee-table-header">
            <th className="employee-table-th">Name</th>
            <th className="employee-table-th">Email</th>
            <th className="employee-table-th employee-table-text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="employee-table-row">
              <td className="employee-table-td">
                <span className="employee-table-name">{emp.name}</span>
              </td>
              <td className="employee-table-td">
                <span className="employee-table-email">{emp.email}</span>
              </td>
              <td className="employee-table-td employee-table-text-right">
                <div className="employee-table-actions">
                  <button
                    className="employee-table-btn employee-table-btn-edit"
                    onClick={handleEdit(emp)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="employee-table-btn employee-table-btn-delete"
                    onClick={handleDelete(emp.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
