import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStepContext } from './Step';
export const StepLabel = ({ children, style }) => {
    const { completed, disabled } = useStepContext();
    return (React.createElement(View, { style: [styles.container, style] },
        React.createElement(View, { style: [styles.circle, completed && styles.completed, disabled && styles.disabled] }),
        React.createElement(Text, { style: styles.label }, children)));
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
