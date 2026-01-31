import "./Header.css";
import authService from "../../api/auth.service.js";

function LogoutButton({ onLogoutSuccess }) {
  const handleLogout = () => {
    authService.logout();
    onLogoutSuccess();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
