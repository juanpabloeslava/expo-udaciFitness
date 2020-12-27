import React, { useState, useEffect } from 'react';
// comps
import MetricSlider from './MetricSlider';
import MetricStepper from './MetricStepper';
import DateHeader from './DateHeader';
// react native comps
import { View, Text } from "react-native";
// data
import { getMetricMetaInfo } from '../utils/helpers'

const AddEntry = () => {

    const [state, setState] = useState({
        // increment and decrement
        run: 0,
        bike: 0,
        swim: 0,
        // slider
        sleep: 0,
        eat: 0,
    });

    useEffect(() => {
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

    const slider = (metric, value) => {
        setState({
            [metric]: value
        })
    }

    const metaInfo = getMetricMetaInfo()
    const entryDate = new Date().toLocaleDateString()
    return (
        <View>
            <DateHeader date={entryDate}/>
            {
                // make an array of the properties of the metaInfo object. 
                Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = state[key]
                    // For each element of the array, return that item's icon, and render either a stepper of a slider depending on its type 
                    return (
                        <View key={key}>
                            {
                                // element's icon
                                getIcon()
                            }
                            {
                                // slider or stepper
                                type === 'slider'
                                    ? <MetricSlider
                                        value={value}
                                        onChange={value => slider(key, value)}
                                        {...rest}
                                    />
                                    : <MetricStepper
                                        value={value}
                                        onIncrement={ () => increment(key)}
                                        onDecrement={ () => decrement(key)}
                                        {...rest}
                                    />
                            }

                        </View>
                    )

                })
            }
        </View>
    )
}

export default AddEntry