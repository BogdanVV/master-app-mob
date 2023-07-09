import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

export const TodoItemContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #fff;
  border-radius: 10px;
  padding: 16px;
`
export const TodoDescription = styled.Text`
  color: #fff;
  font-size: 16px;
`
export const TodoTitle = styled(TodoDescription)`
  font-size: 20px;
  font-weight: 700;
`
export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`
export const StarIcon = styled(Icon)``
export const ChevronsContainer = styled.View`
  flex-direction: row;
  gap: 2px;
`
export const DaysOfWeekContainer = styled.View`
  flex-direction: row;
  gap: 2px;
`
export const DayOfWeek = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#fff' : '#52525b')};
`
export const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`
