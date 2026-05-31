import { useMediaQuery } from '@mantine/hooks';
import Sidebar from '../Components/Doctor/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';

const DoctorDashboard = () => {
    const matches = useMediaQuery('(max-width: 768px)');
    return (
        <div className='flex'>
            {!matches && <Sidebar />}
            <div className='w-full overflow-hidden flex flex-col'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default DoctorDashboard