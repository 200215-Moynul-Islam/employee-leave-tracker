import "./Admin.css";
import { useState } from "react";
import Container from "../../components/Container/Container";
import AdminPageHeader from "../../components/AdminPageHeader/AdminPageHeader.jsx";
import ManageEmployees from "../../components/ManageEmployees/ManageEmployees.jsx";
import LeaveRequests from "../../components/LeaveRequests/LeaveRequests.jsx";

function Admin() {
  const tabs = [
    { id: "employees", label: "Manage Employees" },
    { id: "requests", label: "Leave Requests" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="admin-page">
      <Container>
        <AdminPageHeader
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
          }}
        />
        {activeTab === "employees" && <ManageEmployees />}
        {activeTab === "requests" && <LeaveRequests />}
      </Container>
    </div>
  );
}

export default Admin;
