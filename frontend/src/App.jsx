import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import MainContent from "./components/MainContent/MainContent.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="page-layout">
      <Header />
      <MainContent>
      </MainContent>
      <Footer />
    </div>
  );
}

export default App;
