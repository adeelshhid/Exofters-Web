import React from "react";
import companylogo from "../../Images/companylogo.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-circle"></div>
        <img src={companylogo} alt="Exofters" className="loader-logo" />
      </div>
    </div>
  );
};

export default Loading;
