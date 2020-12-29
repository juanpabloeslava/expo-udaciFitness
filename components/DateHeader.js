import React from 'react';
import { Text } from 'react-native'
// colors
import { purple } from '../utils/colors'

const DateHeader = ( { date} ) => {
    return ( 
        <Text style={{color: purple, fontSize: 25}}>
            {date}
        </Text>
     )
}
 
export default DateHeader;