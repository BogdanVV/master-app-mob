import { TodoPriorities } from 'src/store/todos'

export const getPriorityIconProps = (
  priority?: string,
): { name: string; color: string } => {
  if (priority === TodoPriorities.LOW) {
    return { name: 'chevron-up', color: '#fff' }
  }
  if (priority === TodoPriorities.MEDIUM) {
    return { name: 'chevron-double-up', color: '#f97316' }
  }
  if (priority === TodoPriorities.HIGH) {
    return { name: 'chevron-triple-up', color: '#dc2626' }
  }
  return { name: 'help-circle-outline', color: '#a1a1aa' }
}
