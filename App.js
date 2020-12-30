// expo r -c

// yarn add @react-native-async-storage/async-storage
// yarn add redux react-redux
// yarn add redux-thunk     --> not yet
// npm i --save redux-logger
// npm install --save redux-devtools-extension

// npm install @react-navigation/native
// npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// npm install @react-navigation/stack
// npm install @react-navigation/bottom-tabs

// expo install expo-constants

// npm install --save react-native-calendars
// npm install udacifitness-calendar-fix

// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants'
// comps
import AddEntry from './components/AddEntry'
import History from './components/History'
import History2 from './components/History2';
// redux
import { Provider } from 'react-redux'
import store from './store'
// icons and colors
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
// navigation
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const NavStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

export default function App() {

  return (
    <Provider store={store} >
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName='AddEntry'
            tabBarOptions={
              {
                activeTintColor: Platform.OS === 'ios' ? purple : white,
                style: {
                  height: 56,
                  backgroundColor: Platform.OS === 'ios' ? white : purple,
                  shadowColor: 'rgba(0, 0, 0, 0.24)',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 6,
                  shadowOpacity: 1
                }
              }
            }
            screenOptions={({ route }) => ({
              tabBarIcon: ({tintColor}) => (
                route.name === 'AddEntry'
                  ? <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
                  : route.name === 'History'
                  ? <FontAwesome name='plus-square' size={30} color={tintColor} />
                  : null
              )
            })}
          >
            <Tabs.Screen
              name='AddEntry'
              component={AddEntry}
            />
            <Tabs.Screen
              name='History'
              component={History}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    </Provider >
  )

}
