import React from 'react'
// react native comps
import { Text, TouchableOpacity, StyleSheet } from "react-native";
// colors
import { purple } from '../utils/colors'

const TextButton = (props) => {

    // if there is a style prop, set it to an empty object
    const { children, onPress, style = {} } = props

    return (
        <TouchableOpacity onPress={onPress}>
            <Text
            // the last style in the array has precedence, so you can use this to inherit styles.
                style={[styles.reset, style]}
            > 
                {children} 
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple,
    }
})

export default TextButton;