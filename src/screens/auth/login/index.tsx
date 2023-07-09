import { AppTextInput, ButtonPrimary, ScreenLayout } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Button, View } from 'react-native'
import { useAppAuth } from 'src/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Container,
  ErrorMessage,
  FormContainer,
  SignUpHint,
  SignUpLink,
  SubmitButtonContainer,
  Title,
} from './styled'
import { ENV, CHEAT_LOGIN_EMAIL, CHEAT_LOGIN_PASSWORD } from '@env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackType } from '@types'

interface IProps {
  navigation: StackNavigationProp<AuthStackType, 'Login'>
}

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

export const LoginScreen = ({ navigation }: IProps) => {
  const { isLoggingIn, login, isRefreshingToken, loginError } = useAppAuth(
    state => ({
      isLoggingIn: state.isLoggingIn,
      login: state.login,
      isRefreshingToken: state.isRefreshingToken,
      loginError: state.loginError,
    }),
  )
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

  const onSubmit = (data: ILoginForm) => login(data)

  if (isRefreshingToken) {
    return (
      <ScreenLayout>
        <Container>
          <ActivityIndicator />
        </Container>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout>
      <Container>
        <Title>Login</Title>
        <FormContainer>
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
          <SubmitButtonContainer>
            <ButtonPrimary
              disabled={!isValid || isLoggingIn}
              title="SUBMIT"
              onPress={handleSubmit(onSubmit)}
            />
          </SubmitButtonContainer>
          {loginError ? <ErrorMessage>Failed to login</ErrorMessage> : null}
        </FormContainer>
        {ENV === 'dev' && (
          <Button
            title="CHEAT LOGIN"
            onPress={() =>
              login({
                email: CHEAT_LOGIN_EMAIL,
                password: CHEAT_LOGIN_PASSWORD,
              })
            }
          />
        )}
        <View>
          <SignUpHint>Don't have account yet?</SignUpHint>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup')
            }}
            activeOpacity={0.7}
          >
            <SignUpLink>Sign up</SignUpLink>
          </TouchableOpacity>
        </View>
      </Container>
    </ScreenLayout>
  )
}
