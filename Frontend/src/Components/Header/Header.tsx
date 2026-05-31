import { Button } from '@mantine/core';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../Slices/JwtSlice';
import { removeUser } from '../../Slices/UserSlice';
import SideDrawer from '../SideDrawer/SideDrawer';
import { useMediaQuery } from '@mantine/hooks';

const Header = () => {
    const dispatch = useDispatch();
    const jwt = useSelector((state: any) => state.jwt);
    const handleLogout = () => {
        dispatch(removeJwt());
        dispatch(removeUser())
    }
    const matches = useMediaQuery('(max-width: 768px)');

    return (
        <div className='bg-light shadow-lg w-full h-16 flex justify-between px-5 items-center'>
            {matches && <SideDrawer />}
            <div></div>
            <div className='flex gap-5 items-center'>
                {jwt ? <Button color='red' onClick={handleLogout} >Logout</Button> : <Link to="login"><Button  >Login</Button></Link>}
                {jwt && <>
                    {/* <ActionIcon variant="transparent" size="md" aria-label="Settings">
                    <IconBellRinging style={{ width: '90%', height: '90%' }} stroke={2} />
                </ActionIcon> */}
                    <ProfileMenu /></>}

            </div>
        </div>
    )
}

export default Header