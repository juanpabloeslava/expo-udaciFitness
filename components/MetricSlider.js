// npm install @react-native-community/slider --save
import React from 'react';
// react native comps
import { View, Text } from 'react-native'
import Slider from '@react-native-community/slider';

const MetricSlider = (props) => {

    const { max, unit, step, value, onChange } = props
    
    return (
        <View>
            <Slider 
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0} 
                onValueChange={onChange}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

export default MetricSlider;
