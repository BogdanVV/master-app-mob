import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'
import { FieldError } from 'react-hook-form'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  value: string
  placeholder: string
  onChange: (text: string) => void
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  secureTextEntry?: boolean
  label?: string
  error?: FieldError
}

export const AppTextInput = ({
  onBlur,
  value,
  onChange,
  placeholder,
  secureTextEntry,
  label,
  error,
}: IProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isValueVisible, setIsValueVisible] = useState<boolean>(
    !secureTextEntry,
  )
  const onBlurExtended = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur(e)
    setIsFocused(false)
  }

  return (
    <View>
      {label ? (
        <Text
          style={[
            styles.label,
            !!error && styles.labelError,
            isFocused && styles.labelFocused,
          ]}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.inputView,
          !!error && styles.inputViewError,
          isFocused && styles.inputViewFocused,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          onBlur={onBlurExtended}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          value={value}
          placeholderTextColor="#9ca3af"
          secureTextEntry={!isValueVisible}
        />
        {secureTextEntry && value ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsValueVisible(prev => !prev)}
          >
            <Icon
              name={isValueVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.errorMessage}>{error?.message || ' '}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    fontWeight: '700',
  },
  labelError: { color: '#dc2626' },
  labelFocused: { color: '#1d4ed8' },
  inputView: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputViewError: {
    borderColor: '#dc2626',
  },
  inputViewFocused: { borderColor: '#1d4ed8' },
  textInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    padding: 0,
  },
  errorMessage: {
    marginTop: 4,
    color: '#dc2626',
    paddingHorizontal: 8,
  },
  visibilityIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
