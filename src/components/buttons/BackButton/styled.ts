import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  border-radius: 9999px;
  align-self: flex-start;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
`
export const BackIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.textMain};
`
