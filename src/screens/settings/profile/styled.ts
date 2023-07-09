import styled from 'styled-components/native'
import { ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const HeaderContainer = styled.View`
  padding: 16px;
`
export const ScreenContentContainer = styled.View`
  padding: 16px;
  gap: 16px;
`
export const Title = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.font.size.l};
  text-align: center;
  margin-bottom: 16px;
`
export const FormContainer = styled.View`
  gap: 16px;
`
export const SubmitButtonContainer = styled.View`
  margin-top: 24px;
`
export const LoadingIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const AvatarTouchableContainer = styled.TouchableOpacity`
  align-self: center;
`
export const Avatar = styled(ImageBackground)`
  width: 150px;
  height: 150px;
  border-radius: 1000px;
  overflow: hidden;
  margin-bottom: 16px;
  justify-content: flex-end;
  /* align-items: center; */
  align-self: center;
`
export const CameraIconContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  padding-vertical: 4px;
`
export const CameraIcon = styled(Icon)``
