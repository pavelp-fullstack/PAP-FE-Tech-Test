import React from "react";
import "./ErrorInfo.css";

const ErrorInfo = ({ error }) => {
 
    return (
      <div className="error-info">
        <div className="error-details">
            <h1>Sorry, something went wrong...</h1>
            <p>Our support team already got a signal and is into the problem already.</p>
            <p>{error.message ? `ERROR: ${error.message}` : ""}</p>
        </div>
      </div>
    );
  }

  export default ErrorInfo;