import React from 'react'
// react native comps
import { View, Text, TouchableOpacity } from "react-native";

const SubmitEntry = ({ onPress }) => {
    return ( 
        <TouchableOpacity onPress={onPress}>
            <Text> SUBMIT </Text>
        </TouchableOpacity>
    )
}

export default SubmitEntry;