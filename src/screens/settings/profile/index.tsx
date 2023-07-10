import { BackButton, ScreenLayout } from '@components'
import { StackNavigationProp } from '@react-navigation/stack'
import { IRNFile, SettingsStackType } from '@types'
import { useAppAuth } from 'src/store/auth'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import { UpdateProfileForm } from '@forms'
import { CameraModeSelectModal } from 'src/components/settings/CameraModeSelectModal'

interface IProps {
  navigation: StackNavigationProp<SettingsStackType, 'Profile'>
}

export interface IProfileForm {
  name?: string
  email?: string
  avatar?: IRNFile
}

export const ProfileSettingsScreen = ({ navigation }: IProps) => {
  const [isCameraModeModal, setIsCameraModeModal] = useState<boolean>(false)
  const [newAvatar, setNewAvatar] = useState<IRNFile | null>(null)
  const {
    isUpdatingProfile,
    user,
    updateProfile,
    loadUserInfo,
    isLoadingUserInfo,
    loadUserInfoError,
  } = useAppAuth(state => ({
    isUpdatingProfile: state.isUpdatingProfile,
    user: state.user,
    updateProfile: state.updateProfile,
    loadUserInfo: state.loadUserInfo,
    isLoadingUserInfo: state.isLoadingUserInfo,
    loadUserInfoError: state.loadUserInfoError,
  }))
  const isAndroid = Platform.OS === 'android'
  const avatarUrl = isAndroid
    ? user?.profileImageURL?.replace('localhost', '10.0.2.2')
    : user?.profileImageURL

  const goBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: IProfileForm) => {
    updateProfile(data, goBack)
  }

  const toggleCameraModeModal = () => {
    setIsCameraModeModal(prev => !prev)
  }

  const onGallerySelect = () => {
    toggleCameraModeModal()
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
      onImagePickFinish,
    )
  }
  const onTakePhotoSelect = () => {
    toggleCameraModeModal()
    launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
      saveToPhotos: true,
    })
  }

  const onImagePickFinish = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      toggleCameraModeModal()
      return
    }

    console.log('response>>>', response)
    if (
      response.assets?.[0]?.fileName &&
      response.assets?.[0]?.type &&
      response.assets?.[0]?.uri
    ) {
      setNewAvatar({
        name: response.assets[0].fileName,
        type: response.assets[0].type,
        uri: isAndroid
          ? response.assets?.[0].uri
          : response.assets?.[0].uri.replace('file://', ''),
      })
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        loadUserInfo(user?.id)
      }
    }, [user?.id]),
  )

  useFocusEffect(
    useCallback(() => {
      if (loadUserInfoError) {
        Toast.show({
          type: 'error',
          text2: loadUserInfoError.message,
          visibilityTime: 5000,
        })
      }
    }, [loadUserInfoError]),
  )

  return (
    <ScreenLayout>
      <CameraModeSelectModal
        isVisible={isCameraModeModal}
        toggleModal={toggleCameraModeModal}
        onGallerySelect={onGallerySelect}
        onTakePhotoSelect={onTakePhotoSelect}
      />
      <View style={styles.headerContainer}>
        <BackButton onPress={goBack} />
      </View>
      {isLoadingUserInfo ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d4ed8" />
        </View>
      ) : (
        <View style={styles.screenContentContainer}>
          <Text style={styles.title}>Edit your profile FFS</Text>
          <UpdateProfileForm
            avatarUrl={avatarUrl}
            isAndroid={isAndroid}
            isUpdatingProfile={isUpdatingProfile}
            onAvatarPress={toggleCameraModeModal}
            onSubmit={onSubmit}
            user={user}
            newAvatar={newAvatar}
          />
        </View>
      )}
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContentContainer: {
    padding: 16,
    gap: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
})
