import React from 'react';
// react native comps
import { View, Text, TouchableOpacity } from "react-native";
// icons
import { Entypo } from "@expo/vector-icons";

const MetricStepper = (props) => {

    const { max, unit, step, value, onIncrement, onDecrement } = props

    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <Entypo name='minus' size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}>
                    <Entypo name='plus' size={30} color={'black'} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

export default MetricStepper;