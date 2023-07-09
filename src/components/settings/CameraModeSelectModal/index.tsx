import { AppModal } from 'src/components/AppModal'
import { ContentContainer, OptionButton, OptionButtonTitle } from './styled'

interface IProps {
  isVisible: boolean
  toggleModal: () => void
  onTakePhotoSelect: () => void
  onGallerySelect: () => void
}

export const CameraModeSelectModal = ({
  isVisible,
  toggleModal,
  onTakePhotoSelect,
  onGallerySelect,
}: IProps) => {
  return (
    <AppModal isVisible={isVisible} toggleModal={toggleModal}>
      <ContentContainer>
        <OptionButton activeOpacity={0.7} onPress={onTakePhotoSelect}>
          <OptionButtonTitle>Take a photo</OptionButtonTitle>
        </OptionButton>
        <OptionButton activeOpacity={0.7} onPress={onGallerySelect}>
          <OptionButtonTitle>Select from gallery</OptionButtonTitle>
        </OptionButton>
      </ContentContainer>
    </AppModal>
  )
}
