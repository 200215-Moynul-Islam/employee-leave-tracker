import React from "react";
import "./AdminPageHeader.css";

function AdminPageHeader({ tabs, activeTab, onTabChange }) {
  return (
    <div className="page-header-wrapper">
      <h2 className="page-header-title">Corporate Leave Management</h2>
      <p className="page-header-subtitle">
        Manage employee profiles and track organizational leave requests.
      </p>

      <nav className="page-header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`page-header-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default AdminPageHeader;
