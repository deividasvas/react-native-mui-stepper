import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useStepContext } from './Step';

interface StepLabelProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const StepLabel: React.FC<StepLabelProps> = ({ children, style }) => {
  const { completed, disabled } = useStepContext();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.circle, completed && styles.completed, disabled && styles.disabled]} />
      <Text style={styles.label}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1976d2',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  completed: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  disabled: {
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  label: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
  },
}); 