import { ITodo, TodoPriorities } from 'src/store/todos'
import {
  TodoDescription,
  TodoItemContainer,
  TodoTitle,
  TopContainer,
  ChevronsContainer,
  StarIcon,
  DaysOfWeekContainer,
  DayOfWeek,
  BottomContainer,
} from './styled'
import { DAYS_OF_WEEK_FULL, DAYS_OF_WEEK_SHORT } from 'src/constants'

type Props = {
  todo: ITodo
}

export const TodoListItem = ({ todo }: Props) => {
  const getPriority = (): number => {
    if (todo.priority === TodoPriorities.LOW) {
      return 1
    } else if (todo.priority === TodoPriorities.MEDIUM) {
      return 2
    } else {
      return 3
    }
  }

  const getActiveDaysIndexes = (): number[] => {
    if (todo.isDaily) {
      return [0, 1, 2, 3, 4, 5, 6]
    }
    if (todo.activeDays.length > 0) {
      return todo.activeDays.map(activeDay =>
        DAYS_OF_WEEK_FULL.findIndex(d => d === activeDay),
      )
    }

    return []
  }
  const activeDaysIndexes = getActiveDaysIndexes()

  return (
    <TodoItemContainer activeOpacity={0.7}>
      <TopContainer>
        <TodoTitle>{todo.title}</TodoTitle>
        <ChevronsContainer>
          {Array(getPriority())
            .fill(1)
            .map((_, i) => (
              <StarIcon key={i} name="star" color="#fbbf24" size={16} />
            ))}
        </ChevronsContainer>
      </TopContainer>
      <BottomContainer>
        <TodoDescription>{todo.description}</TodoDescription>
        <DaysOfWeekContainer>
          {(todo.activeDays?.length > 0 || todo.isDaily) &&
            DAYS_OF_WEEK_SHORT.map((d, i) => (
              <DayOfWeek
                key={`${d}${i}`}
                isActive={activeDaysIndexes.includes(i)}
              >
                {d}
              </DayOfWeek>
            ))}
        </DaysOfWeekContainer>
      </BottomContainer>
    </TodoItemContainer>
  )
}
