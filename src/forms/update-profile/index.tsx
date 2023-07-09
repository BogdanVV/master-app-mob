import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Avatar,
  AvatarTouchableContainer,
  CameraIcon,
  CameraIconContainer,
  FormContainer,
  SubmitButtonContainer,
} from './styled'
import { AppTextInput, ButtonPrimary } from '@components'
import { IRNFile, IUser } from '@types'
import { useEffect } from 'react'

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

  console.log('errors>>>', errors)
  console.log('isValid>>>', isValid)

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
    <FormContainer>
      <AvatarTouchableContainer activeOpacity={0.7} onPress={onAvatarPress}>
        <Avatar
          source={{
            uri: newAvatar
              ? newAvatar.uri
              : avatarUrl ||
                `http://${
                  isAndroid ? '10.0.2.2' : 'localhost'
                }:9999/profile-image/default_avatar.jpeg`,
          }}
        >
          <CameraIconContainer>
            <CameraIcon name="camera-outline" size={24} color="#fff" />
          </CameraIconContainer>
        </Avatar>
      </AvatarTouchableContainer>
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
      <SubmitButtonContainer>
        <ButtonPrimary
          disabled={!isDirty || isUpdatingProfile || !isValid}
          title="SUBMIT"
          onPress={handleSubmit(onSubmit)}
        />
      </SubmitButtonContainer>
    </FormContainer>
  )
}
