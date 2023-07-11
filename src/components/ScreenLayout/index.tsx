import { PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'

interface IProps extends PropsWithChildren {
  onRefresh?: () => void
  isRefreshing?: boolean
}

export const ScreenLayout = ({
  children,
  isRefreshing = false,
  onRefresh,
}: IProps) => {
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <ScrollView
        {...(onRefresh && {
          refreshControl: (
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          ),
        })}
        contentContainerStyle={styles.fullScrollView}
      >
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
