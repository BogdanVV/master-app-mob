import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

export const HeaderContainer = styled.View`
  padding-top: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
  margin-bottom: 16px;
`
export const TitleContainer = styled.View`
  padding-horizontal: 16px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.textMain};
  padding-bottom: 6px;
  padding-right: 16px;
`
export const ScreenTitle = styled.Text`
  font-size: ${({ theme }) => theme.font.size.xl};
  color: ${({ theme }) => theme.colors.textMain};
`
export const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.textMain};
`
export const OptionsContainer = styled.View`
  border-top-width: 1px;
  border-color: #18181b;
`
