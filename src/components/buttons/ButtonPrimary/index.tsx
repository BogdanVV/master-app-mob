import {
  ActivityIndicator,
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
  isLoading?: boolean
}

export const ButtonPrimary = ({
  bgColor = '#60a5fa',
  titleColor = '#fff',
  onPress,
  title,
  disabled = false,
  isLoading = false,
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
      {isLoading ? (
        <ActivityIndicator size={24} color="#fff" />
      ) : (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    // paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 50,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
})
