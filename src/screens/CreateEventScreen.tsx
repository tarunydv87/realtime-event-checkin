import React from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { getAuthedClient } from '../api/graphqlClient'

const CREATE_EVENT = gql`
  mutation CreateEvent($name: String!, $location: String!, $startTime: String!) {
    createEvent(name: $name, location: $location, startTime: $startTime) {
      id
      name
    }
  }
`

const CreateEventScreen = ({ navigation }: any) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const client = getAuthedClient()
      return client.request(CREATE_EVENT, {
        name: 'React Native Demo',
        location: 'Noida Campus',
        startTime: String(Date.now() + 3600000), // send as timestamp
      })
    },
    onSuccess: () => {
      Alert.alert('Event created ✅')
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigation.navigate('EventList')
    },
    onError: (err: any) => {
      console.error('Event creation failed:', err)
      Alert.alert('Error', err.message || 'Something went wrong')
    },
  })

  return (
    <View style={styles.container}>
      <Button
        title="Create Event"
        onPress={() => mutation.mutate()}
        disabled={mutation.isPending}
      />
    </View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
