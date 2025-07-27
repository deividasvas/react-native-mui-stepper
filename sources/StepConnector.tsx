import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface StepConnectorProps {
  style?: ViewStyle;
}

export const StepConnector: React.FC<StepConnectorProps> = ({ style }) => {
  return <View style={[styles.connector, style]} />;
};

const styles = StyleSheet.create({
  connector: {
    flex: 1,
    zIndex: 1,
    width: 32,
    backgroundColor: '#ccc',
  },
}); 