// npm install @react-native-community/slider --save
import React from 'react';
// react native comps
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider';
// colors
import { gray } from '../utils/colors'

const MetricSlider = (props) => {

    const { max, unit, step, value, onChange } = props

    return (
        <View style={styles.row}>
            <Slider
                style={styles.slider}
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
            />
            <View style={styles.metricCounter}>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
                <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        flex: 1
    }
})

export default MetricSlider;
