import { PropsWithChildren } from 'react'
import { Modal } from 'react-native'
import {
  ContentContainer,
  ModalContainer,
  CloseButtonContainer,
  CloseButton,
} from './styled'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps extends PropsWithChildren {
  isVisible: boolean
  toggleModal: () => void
}

export const AppModal = ({ isVisible, toggleModal, children }: IProps) => {
  return (
    <Modal animationType="slide" visible={isVisible} transparent>
      <ModalContainer>
        {/* <ScrollView>
          <ContentContainer>
            {children}
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
            <Text style={{ color: '#fff', paddingVertical: 100 }}>123</Text>
          </ContentContainer>
        </ScrollView> */}
        <ContentContainer>
          <ScrollView>
            <CloseButtonContainer>
              <CloseButton onPress={toggleModal}>
                <Icon name="close-outline" color="#fff" size={32} />
              </CloseButton>
            </CloseButtonContainer>
            {children}
          </ScrollView>
        </ContentContainer>
      </ModalContainer>
    </Modal>
  )
}
