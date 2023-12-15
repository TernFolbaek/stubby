import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="w-1/3 mx-auto relative  overflow-visible ">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
            <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-purple-500" 
                style={{ width: `${progressPercentage}%`, transition: 'width 0.8s ease' }}
            ></div>

            {/* Start Dot */}
            <div
                className={`absolute -left-1 -top-3 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full ${
                    currentStep > 0 ? 'bg-purple-500' : 'bg-gray-300'
                } z-10`}
            ></div>

            {/* Middle Dot */}
            <div
                className={`absolute left-1/2 -top-3 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full ${
                    currentStep > 1 ? 'bg-purple-500' : 'bg-gray-300'
                } z-10`}
            ></div>

            {/* End Dot */}
            <div
                className={`absolute -right-1 -top-3 transform -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full ${
                    currentStep > 2 ? 'bg-purple-500' : 'bg-gray-300'
                } z-10`}
            ></div>
        </div>
    );
};

export default ProgressBar;
