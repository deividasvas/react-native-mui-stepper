import React, { createContext, useContext } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { StepConnector } from './StepConnector';

interface StepperContextType {
  activeStep: number;
}

const StepperContext = createContext<StepperContextType>({ activeStep: 0 });
export const useStepperContext = () => useContext(StepperContext);

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

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  orientation = 'horizontal',
  alternativeLabel = false,
  style,
  children,
  connector,
}) => {
  const steps = React.Children.toArray(children);
  const isHorizontal = orientation === 'horizontal';

  // Получить состояние шага (учитывает ручные пропсы и автоматический режим)
  const getStepState = (idx: number) => {
    const step = steps[idx];
    if (!step || typeof step !== 'object' || !('props' in step)) {
      return { completed: false, disabled: false, isActive: false };
    }
    const props = (step as any).props || {};
    return {
      completed: typeof props.completed === 'boolean' ? props.completed : idx < activeStep,
      disabled: typeof props.disabled === 'boolean' ? props.disabled : idx > activeStep,
      isActive: typeof props.isActive === 'boolean' ? props.isActive : idx === activeStep,
    };
  };

  return (
    <StepperContext.Provider value={{ activeStep }}>
      <View style={[
        isHorizontal ? styles.horizontal : styles.vertical,
        style,
      ]}>
        {steps.map((step, idx) => {
          const prev = getStepState(idx);
          const next = getStepState(idx + 1);
          return (
            <React.Fragment key={idx}>
              {React.isValidElement(step)
                ? React.cloneElement(step, { index: idx } as any)
                : step}
              {idx < steps.length - 1 && (
                typeof connector === 'function'
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
                  : React.cloneElement(
                      connector || <StepConnector style={isHorizontal ? styles.connectorHorizontal : styles.connectorVertical} />, 
                      { key: 'connector-' + idx }
                    )
              )}
            </React.Fragment>
          );
        })}
      </View>
    </StepperContext.Provider>
  );
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