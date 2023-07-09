import styled from 'styled-components/native'

export const InputContainer = styled.View``
export const Label = styled.Text<{ isFocused: boolean; isError: boolean }>`
  color: ${({ isFocused, theme, isError }) =>
    isError ? '#dc2626' : isFocused ? '#1d4ed8' : theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.m};
  padding-horizontal: 8px;
  margin-bottom: 8px;
  font-weight: 700;
`
export const InputView = styled.View<{
  isFocused: boolean
  isError: boolean
}>`
  flex-direction: row;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ isFocused, isError }) =>
    isError ? '#dc2626' : isFocused ? '#1d4ed8' : '#fff'};
  padding-horizontal: 16px;
  padding-vertical: 16px;
`
export const StyledTextInput = styled.TextInput<{
  isFocused: boolean
  isError: boolean
}>`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.m};
  flex: 1;
  padding: 0px;
`
export const ErrorMessage = styled.Text`
  margin-top: 4px;
  color: #dc2626;
  padding-horizontal: 8px;
`
export const ToggleVisibilityIconContainer = styled.TouchableOpacity`
  width: 50px;
  align-items: center;
  justify-content: center;
`
