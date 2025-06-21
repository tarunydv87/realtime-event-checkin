import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { getAuthedClient } from '../api/graphqlClient'

const GET_EVENTS = gql`
  query {
    events {
      id
      name
      location
      startTime
    }
  }
`

const EventListScreen = ({ navigation }: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const client = getAuthedClient()
      return client.request(GET_EVENTS)
    },
  })

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading events...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading events</Text>
      </View>
    )
  }

  const events = data?.events || []

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Create Event"
        onPress={() => navigation.navigate('CreateEvent')}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('EventDetail', { eventId: item.id })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sub}>{item.location}</Text>
            <Text style={styles.sub}>
              {item.startTime && !isNaN(new Date(item.startTime).getTime())
                ? new Date(item.startTime).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'Invalid date'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default EventListScreen

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: {
    padding: 16,
    backgroundColor: '#eef',
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  sub: { fontSize: 14, color: '#555' },
})
