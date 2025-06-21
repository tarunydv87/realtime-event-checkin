import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  FlatList,
} from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { getAuthedClient } from '../api/graphqlClient'
import { io } from 'socket.io-client'

const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
      name
    }
  }
`

const socket = io('http://localhost:4000')

const EventDetailScreen = ({ route }: any) => {
  const { eventId } = route.params
  const [joined, setJoined] = useState(false)
  const [attendees, setAttendees] = useState([])

  useEffect(() => {
    socket.emit('join-event', eventId)

    socket.on(`event-updates-${eventId}`, (updatedAttendees) => {
      setAttendees(updatedAttendees)
    })

    return () => {
      socket.off(`event-updates-${eventId}`)
    }
  }, [eventId])

  const mutation = useMutation({
    mutationFn: () => getAuthedClient().request(JOIN_EVENT, { eventId }),
    onSuccess: () => {
      setJoined(true)
      Alert.alert('You joined the event 🎉')
    },
    onError: (err: any) => {
      console.error('Join failed:', err)
      Alert.alert(
        'Error',
        err?.response?.errors?.[0]?.message || 'Something went wrong'
      )
    },
  })

  const renderAttendee = ({ item, index }: any) => {
    const initials =
      item?.name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('') || 'NA'

    return (
      <View key={item?.id || index} style={styles.avatar}>
        <Text style={styles.avatarText}>{initials.toUpperCase()}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Detail</Text>
      <Text style={styles.sub}>ID: {eventId}</Text>

      <FlatList
        data={attendees}
        keyExtractor={(item, index) => item?.id || index.toString()}
        renderItem={renderAttendee}
        horizontal
        contentContainerStyle={{ gap: 10, marginVertical: 16 }}
      />

      <Button
        title={joined ? '✅ Joined' : 'Join Event'}
        onPress={() => mutation.mutate()}
        disabled={joined || mutation.isPending}
      />
    </View>
  )
}

export default EventDetailScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  sub: { fontSize: 14, color: '#666', marginVertical: 6 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6c8cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
})
