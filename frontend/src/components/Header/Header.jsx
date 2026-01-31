import "./Header.css";
import { useState } from "react";
import Logo from "../Logo/Logo.jsx";
import Container from "../Container/Container.jsx";
import LogoutButton from "./LogoutButton.jsx";

function Header({ isLoggedIn, setIsLoggedIn }) {
  return (
    <header className="header">
      <Container className="header-container">
        <Logo />
        {isLoggedIn && (
          <LogoutButton onLogoutSuccess={() => setIsLoggedIn(false)} />
        )}
      </Container>
    </header>
  );
}

export default Header;
