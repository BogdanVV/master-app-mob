import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  title: string
  iconName: string
  onPress: () => void
}

export const OptionItem = ({ title, iconName, onPress }: IProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Icon name={iconName} size={24} color="#fff" />
      <Text style={styles.optionTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#18181b',
    backgroundColor: '#27272a',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  optionTitle: {
    color: '#fff',
    fontSize: 16,
  },
})
