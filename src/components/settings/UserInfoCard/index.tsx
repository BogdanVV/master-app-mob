import { IUser } from '@types'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'

interface IProps {
  user: IUser | null
}

export const UserInfoCard = ({ user }: IProps) => {
  const isAndroid = Platform.OS === 'android'
  const avatarUrl = isAndroid
    ? user?.profileImageURL?.replace('localhost', '10.0.2.2')
    : user?.profileImageURL

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri:
            avatarUrl ||
            `http://${
              isAndroid ? '10.0.2.2' : 'localhost'
            }:9999/profile-image/default_avatar.jpeg`,
        }}
      />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 32,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  email: {
    color: '#fff',
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 1000,
    marginBottom: 16,
  },
})
