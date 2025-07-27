import React from 'react';
import { StyleSheet, View } from 'react-native';
export const StepConnector = ({ style }) => {
    return React.createElement(View, { style: [styles.connector, style] });
};
const styles = StyleSheet.create({
    connector: {
        // height: 2,
        flex: 1,
        zIndex: 1,
        width: 32,
        backgroundColor: '#ccc',
        // marginHorizontal: 4,
    },
});
