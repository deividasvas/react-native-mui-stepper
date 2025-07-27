import React from 'react';
import { ViewStyle } from 'react-native';
interface StepperContextType {
    activeStep: number;
}
export declare const useStepperContext: () => StepperContextType;
interface StepperProps {
    activeStep: number;
    orientation?: 'horizontal' | 'vertical';
    alternativeLabel?: boolean;
    style?: ViewStyle;
    children: React.ReactNode;
    connector?: React.ReactElement | ((props: {
        index: number;
        activeStep: number;
        completedPrev: boolean;
        completedNext: boolean;
        disabledPrev: boolean;
        disabledNext: boolean;
        isActivePrev: boolean;
        isActiveNext: boolean;
    }) => React.ReactElement);
}
export declare const Stepper: React.FC<StepperProps>;
export {};
