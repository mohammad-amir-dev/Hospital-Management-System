import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice';
import { setUser } from '../Slices/UserSlice';
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!value ? "Password is required" : null)
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true)

    loginUser(values).then((_data) => {
      successNotification("Logged in Successfully.");
      dispatch(setJwt(_data))
      dispatch(setUser(jwtDecode(_data)));

    }).catch((error) => {
      errorNotification(error?.response?.data?.errorMessage);
    }).finally(() => setLoading(false))
  };

  return (
    <div style={{ background: 'url("/bg.png")' }} className='h-screen  w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
      <div className='flex items-center gap-1 py-3 text-pink-500'>
        <IconHeartbeat size={45} stroke={2.5} />
        <span className='text-4xl font-semibold font-heading' >Pulse</span>
      </div>
      <div className='sm:w-[450px] w-[380px] backdrop-blur-md sm:p-10 p-4  py-8 rounded-lg'>
        <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white focus-within:[&_.mantine-Input-input]:!border-pink-400 [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:!text-white'>
          <div className='self-center text-xl font-medium text-white font-heading'>Login</div>
          <TextInput {...form.getInputProps('email')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Email" />
          <PasswordInput {...form.getInputProps('password')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Password" />
          <Button loading={loading} radius="md" size='md' type='submit' color="pink">Login</Button>
          <div className='self-center text-sm text-neutral-100'>Don't have an account? <Link to="/register" className="hover:underline">Register</Link></div>
        </form>


      </div>
    </div>
  )
}

export default LoginPage 