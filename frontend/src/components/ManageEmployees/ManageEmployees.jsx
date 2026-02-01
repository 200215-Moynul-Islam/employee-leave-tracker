import React, { useEffect, useState } from "react";
import "./ManageEmployees.css";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import userService from "../../api/user.service";
import { toast } from "react-toastify";
import { FEEDBACK_MESSAGES } from "../../messages/feedback.message";
import { UserPlus } from "lucide-react";
import AddEmployeeModal from "../AddEmployeeModal/AddEmployeeModal";
import EditEmployeeModal from "../EditEmployeeModal/EditEmployeeModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setActiveModal("EditEmployee");
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setActiveModal("ConfirmationModal");
  };

  const handleAddEmployeeSuccess = (newEmployee) => {
    setEmployees((prevEmployees) => [newEmployee, ...prevEmployees]);
  };

  const handleEditEmployeeSuccess = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const handleDeleteEmployeeSuccess = async () => {
    // Call delete user API
    try {
      const res = await userService.delete(selectedEmployee.id);
      if (res.success) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
        );
        toast.success(FEEDBACK_MESSAGES.USER.DELETE_SUCCESS);
      } else {
        toast.error(FEEDBACK_MESSAGES.USER.DELETE_FAILURE);
      }
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await userService.getAllEmployees();
        setEmployees(res.data);
      } catch (error) {
        toast.error(FEEDBACK_MESSAGES.SOMETHING_WENT_WRONG);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="manage-employees-container">
      <button
        className="add-employee-button"
        onClick={() => setActiveModal("AddEmployee")}
      >
        <UserPlus size={16} /> Add Employee
      </button>
      <EmployeeTable
        employees={employees}
        onDeleteClick={(id) => handleDeleteClick(id)}
        onEditClick={(employee) => handleEditClick(employee)}
      />
      {activeModal === "AddEmployee" && (
        <AddEmployeeModal
          onClose={() => setActiveModal(null)}
          onAddEmployeeSuccess={(newEmployee) =>
            handleAddEmployeeSuccess(newEmployee)
          }
        />
      )}
      {activeModal === "EditEmployee" && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setActiveModal(null)}
          onEditEmployeeSuccess={(employee) =>
            handleEditEmployeeSuccess(employee)
          }
        />
      )}
      {activeModal === "ConfirmationModal" && (
        <ConfirmationModal
          onCancel={() => setActiveModal(null)}
          onConfirm={handleDeleteEmployeeSuccess}
          message={
            "Are you sure you want to remove this employee? This action cannot be undone and will permanently delete their records from the system."
          }
        />
      )}
    </div>
  );
}

export default ManageEmployees;
