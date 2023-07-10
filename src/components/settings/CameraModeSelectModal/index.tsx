import { AppModal } from 'src/components/AppModal'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.7}
          onPress={onTakePhotoSelect}
        >
          <Text style={styles.optionButtonTitle}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          activeOpacity={0.7}
          onPress={onGallerySelect}
        >
          <Text style={styles.optionButtonTitle}>Select from gallery</Text>
        </TouchableOpacity>
      </View>
    </AppModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 16,
  },
  optionButtonTitle: {
    color: '#fff',
    fontSize: 16,
  },
})
