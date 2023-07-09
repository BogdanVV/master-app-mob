import { Image } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  margin-vertical: 32px;
  padding-horizontal: 32px;
`
export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.textMain};
  font-size: ${({ theme }) => theme.font.size.l};
  text-align: center;
`
export const Email = styled.Text`
  color: ${({ theme }) => theme.colors.textMain};
  text-align: center;
`
export const Avatar = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 1000px;
  margin-bottom: 16px;
`
