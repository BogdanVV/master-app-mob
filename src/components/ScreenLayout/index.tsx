import { PropsWithChildren } from 'react'
import { FullScrollView, LayoutContainer } from './styled'

export const ScreenLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutContainer>
      <FullScrollView>{children}</FullScrollView>
    </LayoutContainer>
  )
}
