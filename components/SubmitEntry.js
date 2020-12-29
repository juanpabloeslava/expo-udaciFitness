import React from 'react'
// react native comps
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
// colors
import { white, purple } from "../utils/colors";

const SubmitEntry = props => {
    
    const { children, onPress } = props

    return ( 
        <TouchableOpacity style={ Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn } onPress={onPress}>
            <Text style={styles.submitBtnText}> {children} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
    }
});

export default SubmitEntry;