// yarn add @react-native-async-storage/async-storage
// yarn add redux react-redux
// yarn add redux-thunk     --> not yet
// npm i --save redux-logger
// npm install --save redux-devtools-extension

// npm install --save react-native-calendars
// npm install udacifitness-calendar-fix

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
// comps
import AddEntry from './components/AddEntry'
import History from './components/History'
// redux
import { Provider } from 'react-redux'
import store from './store'

export default function App() {

  return (
    <Provider store={store} >
      <View style={{ flex: 1 }}>
        <View style={{height: 30}}/>  
        <History />
        {/* <AddEntry /> */}
      </View>
    </Provider>
  )

}
