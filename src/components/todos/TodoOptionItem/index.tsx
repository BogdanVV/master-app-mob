import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  onPress: () => void
  iconName: string
  iconSize?: number
  iconColor?: string
}

export const TodoOptionItem = ({
  iconName,
  onPress,
  iconColor = '#fff',
  iconSize = 24,
}: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: iconColor }]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Icon name={iconName} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    borderWidth: 1,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
