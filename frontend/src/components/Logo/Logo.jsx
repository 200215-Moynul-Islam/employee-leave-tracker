import "./Logo.css";
import { Calendar } from "lucide-react";

function Logo() {
  return (
    <div className="logo-container">
      <Calendar size={24} color="#195DE6" className="logo-icon" />
      <span className="logo-text">EmployeeLeaveTracker</span>
    </div>
  );
}

export default Logo;
