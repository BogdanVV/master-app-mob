import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

export const ContentContainer = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 20px;
`
export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 16px;
  padding-vertical: 16px;
`
export const OptionButtonTitle = styled.Text`
  color: #fff;
  font-size: 16px;
`
export const OptionButtonIcon = styled(Icon)``
