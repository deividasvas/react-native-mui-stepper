import React from 'react';
import { ViewStyle } from 'react-native';
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
export declare const useStepContext: () => StepContextType;
export declare const Step: React.FC<StepProps>;
export {};
