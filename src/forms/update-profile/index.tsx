import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { AppTextInput, ButtonPrimary } from '@components'
import { IRNFile, IUser } from '@types'
import { useEffect } from 'react'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  avatarUrl?: string
  isAndroid: boolean
  isUpdatingProfile: boolean
  onSubmit: (data: IProfileForm) => void
  onAvatarPress: () => void
  user: IUser | null
  newAvatar?: IRNFile | null
}

export interface IProfileForm {
  name?: string
  email?: string
  image?: IRNFile
}

const profileFormSchema = z.object({
  name: z.string().min(5).max(15).optional(),
  email: z.string().email().optional().or(z.literal('')),
  image: z
    .object({
      name: z.string().min(1),
      type: z.string().min(1),
      uri: z.string().min(1),
    })
    .optional(),
})

export const UpdateProfileForm = ({
  avatarUrl,
  isAndroid,
  isUpdatingProfile,
  onSubmit,
  onAvatarPress,
  user,
  newAvatar,
}: IProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, dirtyFields, isValid },
    watch,
    resetField,
  } = useForm<IProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    setValue('email', user?.email)
    setValue('name', user?.name)
  }, [user])

  useEffect(() => {
    if (newAvatar) {
      console.log('newAvatar>>>', newAvatar)
      setValue('image', newAvatar, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    }

    if (!newAvatar && watch('image')) {
      resetField('image')
    }
  }, [newAvatar])

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onAvatarPress}>
        <ImageBackground
          style={styles.avatar}
          source={{
            uri: newAvatar
              ? newAvatar.uri
              : avatarUrl ||
                `http://${
                  isAndroid ? '10.0.2.2' : 'localhost'
                }:9999/profile-image/default_avatar.jpeg`,
          }}
        >
          <View style={styles.cameraIconContainer}>
            <Icon name="camera-outline" size={24} color="#fff" />
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            label="Name"
            error={dirtyFields.name ? errors.name : undefined}
            placeholder="name"
            onBlur={onBlur}
            onChange={onChange}
            value={value || ''}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            label="Email"
            error={dirtyFields.email ? errors.email : undefined}
            placeholder="email"
            onBlur={onBlur}
            onChange={onChange}
            value={value || ''}
          />
        )}
      />
      <View style={styles.submitButtonContainer}>
        <ButtonPrimary
          disabled={!isDirty || isUpdatingProfile || !isValid}
          title="SUBMIT"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  submitButtonContainer: {
    marginTop: 24,
  },
  avatarTouchableContainer: {
    alignSelf: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  cameraIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    paddingVertical: 4,
  },
})
