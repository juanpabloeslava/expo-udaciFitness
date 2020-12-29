// yarn add @react-native-async-storage/async-storage
// yarn add redux react-redux

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
// comps
import AddEntry from './components/AddEntry'
// redux
import { Provider } from 'react-redux'
import store from './store'

export default function App() {

  return (
    <Provider store={store} >
      <View style={{ flex: 1 }}>
        <AddEntry />
      </View>
    </Provider>
  )

}
