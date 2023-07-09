import { IUser } from '@types'
import { Avatar, Container, Email, Name } from './styled'
import { Platform } from 'react-native'

interface IProps {
  user: IUser | null
}

export const UserInfoCard = ({ user }: IProps) => {
  const isAndroid = Platform.OS === 'android'
  const avatarUrl = isAndroid
    ? user?.profileImageURL?.replace('localhost', '10.0.2.2')
    : user?.profileImageURL

  return (
    <Container>
      <Avatar
        source={{
          uri:
            avatarUrl ||
            `http://${
              isAndroid ? '10.0.2.2' : 'localhost'
            }:9999/profile-image/default_avatar.jpeg`,
        }}
      />
      <Name>{user?.name}</Name>
      <Email>{user?.email}</Email>
    </Container>
  )
}
