import styled from 'styled-components/native'
import { IPrimaryButtonProps } from '.'

export const StyledPrimaryButton = styled.TouchableOpacity<IPrimaryButtonProps>`
  background-color: ${({ bgColor, disabled }) =>
    disabled ? '#d1d5db' : bgColor};
  border-radius: 100px;
  color: ${({ titleColor }) => titleColor};
  padding-vertical: 16px;
  padding-horizontal: 20px;
  align-items: center;
  justify-content: center;
  width: auto;
`
export const PrimaryButtonTitle = styled.Text<{ titleColor: string }>`
  color: ${({ titleColor }) => titleColor};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.m};
`
