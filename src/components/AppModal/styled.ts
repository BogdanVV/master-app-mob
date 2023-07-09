import styled from 'styled-components/native'

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: flex-end;
`
export const ContentContainer = styled.View`
  max-height: 500px;
  border-width: 2px;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  background-color: #1a1a1a;
`
export const CloseButtonContainer = styled.View`
  align-items: flex-end;
  padding-right: 16px;
  padding-vertical: 24px;
`
export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 6px;
`
