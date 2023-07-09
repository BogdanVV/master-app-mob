import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import {
  ErrorMessage,
  InputContainer,
  Label,
  StyledTextInput,
  InputView,
  ToggleVisibilityIconContainer,
} from './styled'
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
    <InputContainer>
      {label ? (
        <Label isError={!!error} isFocused={isFocused}>
          {label}
        </Label>
      ) : null}
      <InputView isError={!!error} isFocused={isFocused}>
        <StyledTextInput
          isFocused={isFocused}
          placeholder={placeholder}
          onBlur={onBlurExtended}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          value={value}
          placeholderTextColor="#9ca3af"
          secureTextEntry={!isValueVisible}
          isError={!!error}
        />
        {secureTextEntry && value ? (
          <ToggleVisibilityIconContainer
            onPress={() => setIsValueVisible(prev => !prev)}
          >
            <Icon
              name={isValueVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="white"
            />
          </ToggleVisibilityIconContainer>
        ) : null}
      </InputView>
      <ErrorMessage>{error?.message || ' '}</ErrorMessage>
    </InputContainer>
  )
}
