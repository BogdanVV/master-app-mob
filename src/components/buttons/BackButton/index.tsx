import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  onPress?: () => void
}

export const BackButton = ({ onPress }: IProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Icon name="arrow-back-outline" size={32} color="#fff" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  },
})
