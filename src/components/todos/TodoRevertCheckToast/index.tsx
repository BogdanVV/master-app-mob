import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  SlideInDown,
  SlideOutDown,
  Layout,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  isVisible: boolean
  onUndoPress: () => void
}

export const TodoRevertCheckToast = ({ isVisible, onUndoPress }: IProps) => {
  const bottom = useSharedValue(-300)
  const style = useAnimatedStyle(() => ({
    bottom: withTiming(bottom.value),
  }))
  const timeoutBar = useSharedValue(300)
  const timeoutBarStyle = useAnimatedStyle(() => ({
    width: timeoutBar.value,
  }))

  useEffect(() => {
    if (isVisible) {
      timeoutBar.value = withTiming(0, { duration: 3000 })
    }
    if (!isVisible) {
      timeoutBar.value = withTiming(300)
    }
  }, [isVisible])

  return (
    <Animated.View
      style={[
        style,
        styles.containerHidden,
        isVisible && styles.containerVisible,
      ]}
      entering={SlideInDown}
      exiting={SlideOutDown}
      layout={Layout.springify()}
    >
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.timeoutBar, timeoutBarStyle]} />
        <TouchableOpacity
          style={styles.undoButton}
          activeOpacity={0.7}
          onPress={onUndoPress}
        >
          <Icon name="arrow-undo-outline" color="#fff" size={24} />
          <Text style={styles.title}>UNDO</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerHidden: {
    width: '100%',
    position: 'absolute',
    bottom: -300,
    alignItems: 'center',
    zIndex: 20,
  },
  containerVisible: {
    bottom: 30,
  },
  contentContainer: {
    width: 300,
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    paddingTop: 16,
    paddingBottom: 10,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  timeoutBar: {
    height: 4,
    backgroundColor: '#fff',
    position: 'absolute',
    width: 300,
    top: 0,
    right: 0,
  },
})
