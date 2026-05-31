import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core';
import { IconHeartbeat } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { useState } from 'react';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            role: "PATIENT",
            email: '',
            password: '',
            confirmPassword: "",
        },

        validate: {
            name: (value) => (!value ? "Name is required" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                !value
                    ? "Password is required"
                    : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)
                        ? "Password must be 8-15 characters long and include uppercase, lowercase, number, and special character"
                        : null,

            confirmPassword: (value, values) => (value === values.password ? null : "Passwords don't match")
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        setLoading(true);
        registerUser(values).then((_data) => {
            successNotification("Registered Successfully.");
            navigate('/login');
        }).catch((error) => {
            errorNotification(error.response.data.errorMessage);
        }).finally(() => setLoading(false))
    };

    return (
        <div style={{ background: 'url("/bg.png")' }} className='h-screen  w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
            <div className='flex items-center gap-1 py-3 text-pink-500'>
                <IconHeartbeat size={45} stroke={2.5} />
                <span className='text-4xl font-semibold font-heading' >Pulse</span>
            </div>
            <div className='sm:w-[450px] w-[380px] backdrop-blur-md sm:p-10 p-5 py-8 rounded-lg'>
                <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-5 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white focus-within:[&_.mantine-Input-input]:!border-pink-400 [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-white [&_input]:!text-white'>
                    <div className='self-center text-xl font-medium text-white font-heading'>Register</div>
                    <SegmentedControl {...form.getInputProps("role")} fullWidth size="md" radius="md" color='pink' bg="none" className='[&_*]:!text-white border border-white' data={[{ label: 'Patient', value: "PATIENT" }, { label: 'Doctor', value: "DOCTOR" }, { label: 'Admin', value: "ADMIN" },]} />
                    <TextInput {...form.getInputProps('name')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Name" />
                    <TextInput {...form.getInputProps('email')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Email" />
                    <PasswordInput {...form.getInputProps('password')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Password" />
                    <PasswordInput {...form.getInputProps('confirmPassword')} className='transition duration-300' variant="unstyled" size="md" radius="md" placeholder="Confirm Password" />
                    <Button loading={loading} radius="md" size='md' type='submit' color="pink">Register</Button>
                    <div className='self-center text-sm text-neutral-100'>Have an account? <Link to="/login" className="hover:underline">Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage 