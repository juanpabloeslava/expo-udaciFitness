import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// icons
import { MaterialIcons } from '@expo/vector-icons'

export default function App() {

  useEffect( () => {
    console.log('hi ejposa')
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hola Ejposa</Text>
      <Text>quieres Pizza?</Text>
      <MaterialIcons name='local-pizza' size={100}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
