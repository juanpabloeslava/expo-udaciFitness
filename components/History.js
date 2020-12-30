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
// calendar
import { Agenda as UdaciFitnessCalendar } from 'react-native-calendars'

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
                // there isn't an entry for today, then add a new entry, and set it to the reminder
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
    const entries = useSelector(state => state.entries)

    const renderItem = ( { today, ...metrics }, formattedDate, key ) => (   // gets passed an obj. It's either the state from sotre(metrics), or 'getDailyReminderValue' from ./utils/helpers (today)
        <View>
            {
                today
                    ? <Text> { JSON.stringify(today) } </Text>
                    : <Text> { JSON.stringify(metrics) } </Text>
            }
        </View>
    )

    const renderEmptyDate = ( formattedDate ) => (
        <View>
            <Text> No data for this day </Text>
        </View>
    )

    return (
        <View>
            {/* <Text> History </Text>
            <Text> {JSON.stringify(entries)} </Text> */}
            <UdaciFitnessCalendar 
                items={entries}
                // receives a function that returns some JSX that will be rendered when the calendar ants to show a specific date
                renderItem={renderItem}
                // if the afforedmentioned date is empty, then return the following
                renderEmptyDate={renderEmptyDate}
            />
        </View>
    )

}

export default History
