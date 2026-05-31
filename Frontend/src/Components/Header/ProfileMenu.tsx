import { Menu, Text, rem, Avatar } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../Service/UserService';
import useProtectedImage from '../Utility/Dropzone/useProtectedImage';
import { useMediaQuery } from '@mantine/hooks';

const ProfileMenu = () => {
  const matches = useMediaQuery('(max-width: 768px)');
  const user = useSelector((state: any) => state.user);
  const [picId, setPicId] = useState<string | null>(null);
  useEffect(() => {
    if (!user) return;
    getUserProfile(user.id).then((data) => {

      setPicId(data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  const url = useProtectedImage(picId);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className='flex items-center gap-3 cursor-pointer'>
          {!matches && <span className='font-medium text-lg text-neutral-900'>{user.name}</span>}
          <Avatar variant='filled' src={url} size={45} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;