import React from 'react'
// react native comps
import { Text, TouchableOpacity } from "react-native";

const TextButton = (props) => {

    const { children, onPress } = props

    return ( 
        <TouchableOpacity onPress={onPress}>
            <Text> {children} </Text>
        </TouchableOpacity>
    )
}


export default TextButton;