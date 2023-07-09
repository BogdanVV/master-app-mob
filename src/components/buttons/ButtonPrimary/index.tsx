import { TouchableOpacityProps } from 'react-native'
import { StyledPrimaryButton, PrimaryButtonTitle } from './styled'

export interface IPrimaryButtonProps extends TouchableOpacityProps {
  bgColor?: string
  titleColor?: string
  title: string
  disabled?: boolean
}

export const ButtonPrimary = ({
  bgColor = '#60a5fa',
  titleColor = '#fff',
  onPress,
  title,
  disabled = false,
}: IPrimaryButtonProps) => {
  return (
    <StyledPrimaryButton
      activeOpacity={0.7}
      onPress={disabled ? () => undefined : onPress}
      bgColor={bgColor}
      titleColor={titleColor}
      title={title}
      disabled={disabled}
    >
      <PrimaryButtonTitle titleColor={titleColor}>{title}</PrimaryButtonTitle>
    </StyledPrimaryButton>
  )
}
