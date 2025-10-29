import React from "react";
import Images from "../../ImageExport";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-circle"></div>
        <img src={Images.companylogo} alt="Exofters" className="loader-logo" />
      </div>
    </div>
  );
};

export default Loading;
