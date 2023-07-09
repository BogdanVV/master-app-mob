import { BackIcon, Container } from './styled'

interface IProps {
  onPress?: () => void
}

export const BackButton = ({ onPress }: IProps) => {
  return (
    <Container onPress={onPress}>
      <BackIcon name="arrow-back-outline" size={32} />
    </Container>
  )
}
