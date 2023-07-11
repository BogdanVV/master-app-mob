import { AppTextInput, ButtonPrimary } from '@components'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResponseError } from '@types'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

export interface ISignupForm {
  email: string
  password: string
  passwordConfirmation: string
  name: string
  // TODO: any
  image?: any
}

const signupFormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(5, { message: 'Too short' })
      .max(20, { message: 'Too long' }),
    passwordConfirmation: z.string(),
    name: z
      .string()
      .min(5, { message: 'Too short' })
      .max(20, { message: 'Too long' }),
    image: z.any(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'passwords do not match',
    path: ['passwordConfirmation'],
  })

interface IProps {
  isSigningUp: boolean
  onSubmit: (data: ISignupForm) => void
  signUpError: ResponseError
}

export const SignupForm = ({ isSigningUp, onSubmit, signUpError }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      image: null,
    },
    mode: 'onBlur',
  })

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="name"
            label="Name"
            error={errors.name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
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
            placeholder="email"
            label="Email"
            error={errors.email}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="password"
            label="Password"
            error={errors.password}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="passwordConfirmation"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="confirm password"
            label="Confirm password"
            error={errors.passwordConfirmation}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      <View style={styles.submitButtonContainer}>
        <ButtonPrimary
          title="SUBMIT"
          disabled={!isValid || isSigningUp}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {signUpError ? (
        <Text style={styles.errorMessage}>Failed to sign up.</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 16,
  },
  errorMessage: {
    color: '#dc2626',
  },
  submitButtonContainer: {
    marginTop: 24,
  },
})
