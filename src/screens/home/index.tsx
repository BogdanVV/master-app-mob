import { StyleSheet, Text } from 'react-native'
import { ScreenLayout } from 'src/components/ScreenLayout'

export const HomeScreen = () => {
  return (
    <ScreenLayout>
      <Text style={styles.screenTitle}>Home Screen</Text>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  screenTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
})
