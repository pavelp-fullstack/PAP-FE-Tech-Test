import React from "react";
import "./LoadingSpinner.css";
import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <Loader type="Oval" color="#BBBBBB" height={100} width={100} />        
        </div>
    );
};

export default LoadingSpinner;