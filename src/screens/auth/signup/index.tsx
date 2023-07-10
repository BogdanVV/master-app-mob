import {
  AppTextInput,
  BackButton,
  ButtonPrimary,
  ScreenLayout,
} from '@components'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppAuth } from 'src/store/auth'
import { StyleSheet, Text, View } from 'react-native'

interface IProps {
  navigation: StackNavigationProp<AuthStackType, 'Signup'>
}

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

export const SignUpScreen = ({ navigation }: IProps) => {
  const { isSigningUp, signUpError, signUp } = useAppAuth(state => ({
    isSigningUp: state.isSigningUp,
    signUpError: state.signUpError,
    signUp: state.signUp,
  }))
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

  const onSubmit = (data: ISignupForm) => {
    signUp({ email: data.email, name: data.name, password: data.password })
  }

  return (
    <ScreenLayout>
      <View style={styles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.screenContentContainer}>
        <Text style={styles.title}>Sign Up</Text>
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
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
  },
  screenContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 32,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
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
