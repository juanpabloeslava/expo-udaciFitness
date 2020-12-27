import React from 'react';
// react native comps
import { View, Text } from "react-native";
// data
import { getMetricMetaInfo } from '../utils/helpers'

const AddEntry = () => {
    return ( 
        <View>
            <Text> Add Entry Component </Text>
            {getMetricMetaInfo('bike').getIcon()}
        </View>
     )
}
 
export default AddEntry