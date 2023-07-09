import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 32px;
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
export const SignUpHint = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.m};
`
export const SignUpLink = styled(SignUpHint)`
  color: #1d4ed8;
  font-weight: 700;
`
export const SubmitButtonContainer = styled.View`
  margin-top: 24px;
`
