// import { AsyncStorage } from 'react-native'     // deprecated
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CALENDAR_STORAGE_KEY } from './_calendar'

export const submitEntry = ( { key, entry } ) => {
    // merge a strngified JSON of the [key]: entry property into the CALENDAR_STORAGE_KEY
    return AsyncStorage.mergeItem( CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export const removeEntry = ( key ) => {
    // remove an item at the key from the AsyncStorage
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then( (results) => {
            const data = JSON.parse(results)
            // delete the data at the specific key
            data[key] = undefined
            delete data[key]
            // set the data (now without the key) back at CALENDAR_STORAGE_KEY)
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}

// for reseting an entry on a specific date
export const getDailyReminderValue = () => {
    // return a key that'll be set as the default entry value
    return {
        today: "Don't forget to log your data for today"
    }
}