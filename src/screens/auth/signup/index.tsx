import {
  AppTextInput,
  BackButton,
  ButtonPrimary,
  ScreenLayout,
} from '@components'
import {
  ErrorMessage,
  FormContainer,
  HeaderContainer,
  ScreenContentContainer,
  SubmitButtonContainer,
  Title,
} from './styled'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppAuth } from 'src/store/auth'

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
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()} />
      </HeaderContainer>
      <ScreenContentContainer>
        <Title>Sign Up</Title>
        <FormContainer>
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
          <SubmitButtonContainer>
            <ButtonPrimary
              title="SUBMIT"
              disabled={!isValid || isSigningUp}
              onPress={handleSubmit(onSubmit)}
            />
          </SubmitButtonContainer>
          {signUpError ? <ErrorMessage>Failed to sign up.</ErrorMessage> : null}
        </FormContainer>
      </ScreenContentContainer>
    </ScreenLayout>
  )
}
