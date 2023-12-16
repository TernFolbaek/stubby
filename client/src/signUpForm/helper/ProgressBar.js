import React from "react";
import Icon from '@mdi/react';
import { mdiCheckCircleOutline } from '@mdi/js';

const ProgressBar = ({ currentStep, totalSteps }) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const Checkmark = () => (
        <Icon path={mdiCheckCircleOutline} size={2} className="bg-purple-500" />
    );

    return (
        <div className="w-1/3 mx-auto relative py-4 overflow-visible">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
            <div 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-purple-500" 
                style={{ width: `${progressPercentage}%`, transition: 'width 0.8s ease' }}
            ></div>

            {/* Dots */}
            {Array.from({ length: totalSteps }, (_, index) => (
                <div
                    key={index}
                    className={`absolute ${index === 0 ? '-left-1' : index === totalSteps - 1 ? '-right-1' : 'left-1/2'} top-1 transform -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full ${
                        currentStep > index ? 'bg-purple-500' : 'bg-gray-300'
                    } z-10 flex justify-center items-center`}
                >
                    {currentStep > index + 1 && <Checkmark />}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
