import React, { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { StepConnector } from './StepConnector';
const StepperContext = createContext({ activeStep: 0 });
export const useStepperContext = () => useContext(StepperContext);
export const Stepper = ({ activeStep, orientation = 'horizontal', alternativeLabel = false, style, children, connector, }) => {
    const steps = React.Children.toArray(children);
    const isHorizontal = orientation === 'horizontal';
    // Получить состояние шага (учитывает ручные пропсы и автоматический режим)
    const getStepState = (idx) => {
        const step = steps[idx];
        if (!step || typeof step !== 'object' || !('props' in step)) {
            return { completed: false, disabled: false, isActive: false };
        }
        const props = step.props || {};
        return {
            completed: typeof props.completed === 'boolean' ? props.completed : idx < activeStep,
            disabled: typeof props.disabled === 'boolean' ? props.disabled : idx > activeStep,
            isActive: typeof props.isActive === 'boolean' ? props.isActive : idx === activeStep,
        };
    };
    return (React.createElement(StepperContext.Provider, { value: { activeStep } },
        React.createElement(View, { style: [
                isHorizontal ? styles.horizontal : styles.vertical,
                style,
            ] }, steps.map((step, idx) => {
            const prev = getStepState(idx);
            const next = getStepState(idx + 1);
            return (React.createElement(React.Fragment, { key: idx },
                React.isValidElement(step)
                    ? React.cloneElement(step, { index: idx })
                    : step,
                idx < steps.length - 1 && (typeof connector === 'function'
                    ? connector({
                        index: idx,
                        activeStep,
                        completedPrev: prev.completed,
                        completedNext: next.completed,
                        disabledPrev: prev.disabled,
                        disabledNext: next.disabled,
                        isActivePrev: prev.isActive,
                        isActiveNext: next.isActive,
                    })
                    : React.cloneElement(connector || React.createElement(StepConnector, { style: isHorizontal ? styles.connectorHorizontal : styles.connectorVertical }), { key: 'connector-' + idx }))));
        }))));
};
const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    connectorHorizontal: {
        height: 2,
        width: 32,
        backgroundColor: '#ccc',
    },
    connectorVertical: {
        width: 2,
        height: 32,
        backgroundColor: '#ccc',
    },
});
