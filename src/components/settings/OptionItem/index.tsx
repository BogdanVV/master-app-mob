import { Container, OptionIcon, OptionTitle } from './styled'

interface IProps {
  title: string
  iconName: string
  onPress: () => void
}

export const OptionItem = ({ title, iconName, onPress }: IProps) => {
  return (
    <Container activeOpacity={0.7} onPress={onPress}>
      <OptionIcon name={iconName} size={24} />
      <OptionTitle>{title}</OptionTitle>
    </Container>
  )
}
