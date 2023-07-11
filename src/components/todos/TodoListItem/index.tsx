import { ITodo } from 'src/store/todos'
import { DAYS_OF_WEEK_FULL, DAYS_OF_WEEK_SHORT } from 'src/constants'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getPriorityIconProps } from '@utils'

type Props = {
  todo: ITodo
  isChecked: boolean
  onCheckPress: (id: number) => void
  onTodoPress: (id: number) => void
}

export const TodoListItem = ({
  todo,
  isChecked,
  onCheckPress,
  onTodoPress,
}: Props) => {
  const priorityIconProps = getPriorityIconProps(todo?.priority)

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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onTodoPress(todo.id)}
    >
      <View style={styles.infoContainer}>
        <View style={styles.topInfoContainer}>
          <Text style={styles.title}>{todo.title}</Text>
          <Icon
            name={priorityIconProps.name}
            color={priorityIconProps.color}
            size={24}
          />
        </View>
        <View>
          <Text style={styles.description}>{todo.description}</Text>
        </View>
        {todo.isDaily || todo.activeDays?.length > 0 ? (
          <View style={styles.daysOfWeekContainer}>
            {DAYS_OF_WEEK_SHORT.map((day, index) => (
              <Text
                key={`${day}-${index}`}
                style={
                  activeDaysIndexes.includes(index)
                    ? styles.dayActive
                    : styles.dayInactive
                }
              >
                {day}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => onCheckPress(todo.id)}
        activeOpacity={0.7}
        style={styles.checkboxContainer}
      >
        <View style={styles.checkbox}>
          {isChecked && <Icon name="check" color="#fff" />}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingLeft: 16,
    flexDirection: 'row',
    position: 'relative',
  },
  infoContainer: {
    borderRightWidth: 1,
    borderColor: '#fff',
    flex: 1,
    marginVertical: 10,
    gap: 6,
  },
  checkboxContainer: {
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  topInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  checkbox: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dayActive: { color: '#fff' },
  dayInactive: { color: '#71717a' },
})
