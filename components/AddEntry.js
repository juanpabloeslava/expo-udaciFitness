import React, { useState, useEffect } from 'react';
// comps
import MetricSlider from './MetricSlider';
import MetricStepper from './MetricStepper';
import DateHeader from './DateHeader';
// comps
import SubmitEntry from './SubmitEntry';
// react native comps
import { Text, View } from "react-native";
// data
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { submitEntry, removeEntry, getDailyReminderValue } from '../utils/api'
// icons
import { MaterialIcons } from "@expo/vector-icons";
import TextButton from './TextButton';
// redux, actions
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, receiveEntries } from '../actions'

const AddEntry = (props) => {

    // state and dispatch
    const dispatch = useDispatch()
    const stateRaw = useSelector( state => state)
    const entries = useSelector( state => state.entries )

    // alreadyLogged section
    const key = timeToString()
    const alreadyLogged = (stateRaw[key] && typeof stateRaw[key].today === 'undefined') ? true : undefined
    
    const [state, setState] = useState({
        // increment and decrement
        run: 0,
        bike: 0,
        swim: 0,
        // slider
        sleep: 0,
        eat: 0,
    });

    // call once on component mount
    useEffect(() => {
        console.log('state called in AddEntry: ', state)
        console.log('props in AddEntry: ', props)
        console.log('dispatch: ', dispatch)
        console.log('state.entries: ', entries)
        // console.log('checkAlreadyLogged: ', checkAlreadyLogged)
        console.log('alreadyLogged: ', alreadyLogged)
    }, [])

    const increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        //  increase the metric with the step value
        const increase = state[metric] + step
        // update the state based on the previous state
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
            ...state,
            [metric]: value
        })
    }

    const submit = () => {
        const key = timeToString()
        const entry = state

        // reset state
        setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        })

        // for later:
        // update redux store
        dispatch(addEntry({
            [key]: entry
        }))
        // navigate to home
        // save info to DB
        submitEntry(key,entry)
        // clear local notification
    }

    const resetDay = () => {
        const key = timeToString()
      
        // for later:
        // update redux
        dispatch(addEntry({
            // reset the value for that day to the reminder to log the data for the day 
            // { today: "Don't forget to log your data for today" }
            [key]: getDailyReminderValue()
        }))
        // navigate to home
        // save info to DB
        removeEntry(key)
        // clear local notification
    }

    const metaInfo = getMetricMetaInfo()
    const entryDate = new Date().toLocaleDateString()

    // if user has already logged his info for the day, let him know and give him an option to reset the data
    if ( alreadyLogged ) {
        return (
            <View>
                <MaterialIcons name='tag-faces' size={30} />
                <Text> You already logged your info for today </Text>
                <TextButton onPress={resetDay}>
                    Reset
                </TextButton>
            </View>
        )
    }

    return (
        <View>
            <DateHeader date={entryDate} />
            {
                // make an array of the properties of the metaInfo object. 
                Object.keys(metaInfo).map(key => {
                    // key represents each one of the possible metrics: 'run, bike, swim, sleep, eat'
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
                                        onChange={(value) => slider(key, value)}
                                        {...rest}
                                    />
                                    : <MetricStepper
                                        value={value}
                                        onIncrement={() => increment(key)}
                                        onDecrement={() => decrement(key)}
                                        {...rest}
                                    />
                            }

                        </View>
                    )
                })
            }
            <SubmitEntry 
                onPress={submit}/>
        </View>
    )
}

// export default connect()(AddEntry)
export default AddEntry