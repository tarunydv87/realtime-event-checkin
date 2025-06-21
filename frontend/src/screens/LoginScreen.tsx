import React from 'react'
import { View, Text, Button, Alert, StyleSheet } from 'react-native'
import { useAuth } from '../state/auth'

const LoginScreen = ({ navigation }: any) => {
  const handleLogin = () => {
    // Pre-generated JWT with userId 'admin-id'
    const token = 'enter you token' //  Generate using jwt.sign({ userId: 'admin-id' }, 'secret')
    useAuth.getState().setToken(token)

    Alert.alert('Logged in with mock token ✅')
    navigation.replace('EventList')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button title="Login with Mock Token" onPress={handleLogin} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
})
