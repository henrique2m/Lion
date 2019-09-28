import React from 'react';
import "./styles.css";
import logo  from "../../assets/lion.png";
const Header = () => (
   <header id="main-header">
      <div className="containerLogo">
       <img src={logo} alt="lion"></img>
      </div>
      <p>Lion</p>
   </header>
);

export default Header;