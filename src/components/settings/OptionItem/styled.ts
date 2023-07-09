import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Container = styled.TouchableOpacity`
  padding-horizontal: 32px;
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-color: #18181b;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
  /* background-color: #27272a; */
  flex-direction: row;
  gap: 16px;
  align-items: center;
`
export const OptionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.m};
`
export const OptionIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.textMain};
`
