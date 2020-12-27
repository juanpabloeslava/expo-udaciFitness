import React, { useState, useEffect } from 'react';
// react native comps
import { View, Text } from "react-native";
// data
import { getMetricMetaInfo } from '../utils/helpers'

const AddEntry = () => {

    // const [run, setRun] = useState(0);
    // const [bike, setBike] = useState(0);
    // const [swim, setSwim] = useState(0);
    // const [sleep, selSleep] = useState(0);
    // const [eat, setEat] = useState(0);

    const [state, setState] = useState({
        // increment and decrement
        run: 0,
        bike: 0,
        swim: 0,
        // slider
        sleep: 0,
        eat: 0,
    });

    useEffect( () => {
        console.log('state: ', state)
    }, [])

    const increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        //  increase the metric with the step value
        const increase = state[metric] + step
        // set the new state
        setState({
            //do not modifiy the original state, instead, return a copy
            ...state,
            // return the new value for the metric: if it's greater than the max value, return the max value, if it's not, then increase
            [metric]: increase > max 
                ? max
                : increase
        })
    }
    
    const decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)
        //  decrease the metric with the step value
        const decrease = state[metric] - step
        // set the new state
        setState({
            ...state,
            [metric]: decrease < 0
                ? 0
                : decrease
        })
    }

    const slider = ( metric, value) => {
        setState({
            [metric]: value
        })
    }

    return ( 
        <View>
            <Text> Add Entry Component </Text>
            {getMetricMetaInfo('bike').getIcon()}
        </View>
     )
}
 
export default AddEntry