import { PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

export const ScreenLayout = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <ScrollView contentContainerStyle={styles.fullScrollView}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  fullScrollView: {
    flex: 1,
  },
})
