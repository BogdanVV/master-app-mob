import { PropsWithChildren } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps extends PropsWithChildren {
  isVisible: boolean
  toggleModal: () => void
}

export const AppModal = ({ isVisible, toggleModal, children }: IProps) => {
  return (
    <Modal animationType="slide" visible={isVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <ScrollView>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Icon name="close-outline" color="#fff" size={32} />
              </TouchableOpacity>
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    maxHeight: 500,
    borderWidth: 2,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#1a1a1a',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingVertical: 24,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 6,
  },
})
