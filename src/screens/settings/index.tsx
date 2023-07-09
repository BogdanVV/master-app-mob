import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScreenLayout } from 'src/components/ScreenLayout'
import { useAppTheme } from 'src/store/theme'
import {
  HeaderContainer,
  OptionsContainer,
  ScreenTitle,
  StyledIcon,
  TitleContainer,
} from './styled'
import { useAppAuth } from 'src/store/auth'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsStackType } from '@types'
import { OptionItem, UserInfoCard } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'

interface IProps {
  navigation: StackNavigationProp<SettingsStackType>
}

export const SettingsScreen = ({ navigation }: IProps) => {
  const { changeTheme, themeTitle } = useAppTheme(state => ({
    changeTheme: state.changeTheme,
    themeTitle: state.themeTitle,
  }))
  const { logout, user } = useAppAuth(state => ({
    logout: state.logout,
    user: state.user,
  }))

  return (
    <ScreenLayout>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Icon name="cog-outline" size={40} color="#fff" />
          <Text style={styles.screenTitle}>Settings</Text>
        </View>
        {themeTitle === 'dark' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => changeTheme('light')}
          >
            <StyledIcon name="sunny-outline" size={32} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => changeTheme('dark')}
          >
            <StyledIcon name="moon" size={32} />
          </TouchableOpacity>
        )}
      </View>
      <UserInfoCard user={user} />
      <OptionsContainer>
        <OptionItem
          title="Profile"
          iconName="person-outline"
          onPress={() => {
            navigation.navigate('Profile')
          }}
        />
        <OptionItem
          title="Logout"
          iconName="exit-outline"
          onPress={() => logout()}
        />
      </OptionsContainer>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    marginBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 2,
    borderColor: '#fff',
    paddingBottom: 6,
    paddingRight: 16,
  },
  screenTitle: {
    fontSize: 32,
    color: '#fff',
  },
})
