import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/LoginScreen'
import EventListScreen from './src/screens/EventListScreen'
import CreateEventScreen from './src/screens/CreateEventScreen'
import EventDetailScreen from './src/screens/EventDetailScreen'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/api/queryClient'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EventList" component={EventListScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
