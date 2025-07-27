import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import { useStepperContext } from './Stepper';
const StepContext = createContext({});
export const useStepContext = () => useContext(StepContext);
export const Step = ({ completed, disabled, isActive, index, style, children }) => {
    const { activeStep } = useStepperContext();
    const idx = typeof index === 'number' ? index : 0;
    const autoCompleted = typeof completed === 'boolean' ? completed : idx < activeStep;
    const autoIsActive = typeof isActive === 'boolean' ? isActive : idx === activeStep;
    const autoDisabled = typeof disabled === 'boolean' ? disabled : idx > activeStep;
    return (React.createElement(StepContext.Provider, { value: { completed: autoCompleted, disabled: autoDisabled, isActive: autoIsActive } },
        React.createElement(View, { style: [{ zIndex: 2 }, style] }, children)));
};
