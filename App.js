import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
// comps
import AddEntry from './components/AddEntry'


export default function App() {

  return (
    <View>
      <AddEntry />
    </View>
  )

}
