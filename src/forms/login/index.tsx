import { AppTextInput, ButtonPrimary } from '@components'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResponseError } from '@types'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { z } from 'zod'

export interface ILoginForm {
  email: string
  password: string
}

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(5, { message: 'Obviously the password is too short to be true' }),
})

interface IProps {
  onSubmit: (data: ILoginForm) => void
  isLoggingIn: boolean
  loginError: ResponseError
}

export const LoginForm = ({ onSubmit, isLoggingIn, loginError }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
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
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            label="Email"
            error={errors.email}
            placeholder="email"
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
            label="Password"
            error={errors.password}
            placeholder="password"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      <View style={styles.submitButtonContainer}>
        <ButtonPrimary
          disabled={!isValid || isLoggingIn}
          title="SUBMIT"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {loginError ? (
        <Text style={styles.errorMessage}>Failed to login</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    gap: 16,
  },
  submitButtonContainer: {
    marginTop: 24,
  },
  errorMessage: {
    color: '#dc2626',
  },
})
