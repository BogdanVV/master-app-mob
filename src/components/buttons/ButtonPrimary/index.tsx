import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export interface IPrimaryButtonProps extends TouchableOpacityProps {
  bgColor?: string
  titleColor?: string
  title: string
  disabled?: boolean
}

export const ButtonPrimary = ({
  bgColor = '#60a5fa',
  titleColor = '#fff',
  onPress,
  title,
  disabled = false,
}: IPrimaryButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? () => undefined : onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? '#d1d5db' : bgColor },
      ]}
    >
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
})
