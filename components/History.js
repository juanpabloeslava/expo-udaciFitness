import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// comps
import AddEntry from './AddEntry';
import DateHeader from './DateHeader';
// data
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
// redux, actions
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, receiveEntries } from '../actions'
// calendar
import { Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
// colors
import { red, orange, blue, lightPurp, pink, white } from '../utils/colors'

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

    // local state
    const [selectedDate, setSelectedDate] = useState( new Date().toISOString().slice(0,10));
    // state from store
    const entries = useSelector(state => state.entries)

    const renderItem = ({ today, ...metrics }, firstItemInDay) => (   // gets passed an obj. It's either the state from sotre(metrics), or 'getDailyReminderValue' from ./utils/helpers (today)
        <View style={styles.item}>
            {
                today
                    ? <View>
                        {/* <DateHeader date={formattedDate}/> */}
                        <Text style={styles.noDataText}>
                            {today}
                        </Text>
                    </View>
                    : <TouchableOpacity onPress={() => console.log('button pressed')}>
                        <Text>{JSON.stringify(metrics)}</Text>
                    </TouchableOpacity>
            }
        </View>
    )

    const renderEmptyDate = (formattedDate) => (
        <View style={styles.item}>
            <Text style={styles.noDataText}> No data for this day </Text>
        </View>
    )

    return (
        <View>
            {/* <Text> History </Text>
            <Text> {JSON.stringify(entries)} </Text> */}
            <UdaciFitnessCalendar
                items={entries}
                // receives a function that returns some JSX that will be rendered when the calendar ants to show a specific date
                renderItem={(item, firstItemInDay) => renderItem(selectedDate, item, firstItemInDay)}
                // if the afforedmentioned date is empty, then return the following
                renderEmptyDate={renderEmptyDate}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

export default History
