import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
// comps
import AddEntry from './AddEntry';
// data
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
// redux, actions
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, receiveEntries } from '../actions'

const History = () => {

    // dispatch
    const dispatch = useDispatch()

    // call once on component mount
    useEffect(() => {
        const key = timeToString()
        // fetch all entries
        fetchCalendarResults()
            // add them to the store state
            .then(entries => dispatch(receiveEntries(entries)))
            // check if entries include an entry for today
            .then(({ entries }) => {      // pass entries as an object
                console.log(entries)
                // there 0sn't an entry for today, then add a new entry, and set it to the reminder
                if (!entries[key]) {
                    console.log("I'm here")
                    dispatch(addEntry({
                        [key]: getDailyReminderValue()
                    }))
                    console.log("I'm there")
                }
            })

    }, [])

    // state from store
    const allentries = useSelector(state => state.entries)
    console.log('entries at end: ', allentries)



    return (
        <View>
            <Text> History </Text>
            <Text> {JSON.stringify(allentries)} </Text>
        </View>
    )

}

export default History
