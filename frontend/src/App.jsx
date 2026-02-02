import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Employee from "./pages/Employee/Employee.jsx";
import { jwtDecode } from "jwt-decode";
import ROLES from "./Constants/roles.js";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const decodedToken = token === null ? null : jwtDecode(token);
  const user =
    decodedToken === null
      ? null
      : {
          id: decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ],
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        };

  return (
    <div className="page-layout">
      <Header
        isLoggedIn={token !== null}
        onLogoutSuccess={() => setToken(null)}
      />
      <MainContent>
        {decodedToken === null ? (
          <Login onLoginSuccess={(token) => setToken(token)} />
        ) : user.role === ROLES.ADMIN ? (
          <Admin />
        ) : (
          <Employee userId={user.id} />
        )}
        {/* <Employee />
          <Routes>
            <Route
              path="/"
              element={<Login onLoginSuccess={(token) => setToken(token)} />}
            />
            <Route path="/employee" element={<Employee userId={userId} />} />
          </Routes> */}
      </MainContent>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
