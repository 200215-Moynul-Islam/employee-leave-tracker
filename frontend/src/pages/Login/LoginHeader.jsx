import "./Login.css";
import { UserLock } from "lucide-react";

function LoginModalHeader() {
  return (
    <div className="login-header">
      <UserLock size={45} color="#195DE6" className="user-lock-icon" />
      <h2>Employee Leave Tracker</h2>
      <p className="login-header-subtitle">
        Enter your credentials to access your account.
      </p>
    </div>
  );
}

export default LoginModalHeader;
