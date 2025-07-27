import React, { createContext, useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { useStepperContext } from './Stepper';

interface StepProps {
  completed?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  index?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

interface StepContextType {
  completed?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}

const StepContext = createContext<StepContextType>({});
export const useStepContext = () => useContext(StepContext);

export const Step: React.FC<StepProps> = ({ completed, disabled, isActive, index, style, children }) => {
  const { activeStep } = useStepperContext();
  const idx = typeof index === 'number' ? index : 0;
  const autoCompleted = typeof completed === 'boolean' ? completed : idx < activeStep;
  const autoIsActive = typeof isActive === 'boolean' ? isActive : idx === activeStep;
  const autoDisabled = typeof disabled === 'boolean' ? disabled : idx > activeStep;

  return (
    <StepContext.Provider value={{ completed: autoCompleted, disabled: autoDisabled, isActive: autoIsActive }}>
      <View style={style}>{children}</View>
    </StepContext.Provider>
  );
}; 