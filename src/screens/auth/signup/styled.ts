import styled from 'styled-components/native'

export const HeaderContainer = styled.View`
  padding: 16px;
`
export const ScreenContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 32px;
  padding: 16px;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.xl};
`
export const FormContainer = styled.View`
  width: 100%;
  gap: 16px;
`
export const ErrorMessage = styled.Text`
  color: #dc2626;
`
export const SubmitButtonContainer = styled.View`
  margin-top: 24px;
`
