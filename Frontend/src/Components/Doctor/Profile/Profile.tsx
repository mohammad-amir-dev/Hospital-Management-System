import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doctorDepartments, doctorSpecializations } from "../../../Data/DropdownData";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { getDoctor, updateDoctor } from "../../../Service/DoctorProfileService";
import { useForm } from "@mantine/form";
import { formatDate } from "../../../Utility/DateUtitlity";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
const doctor: any = {
    name: "Dr. John Doe",
    email: "dr.john.doe@example.com",
    dob: "1985-07-20",
    phone: "+91 9123456789",
    address: "456, Oak Avenue, New Delhi, India",
    licenseNo: "DL12345XYZ",
    specialization: "Cardiology",
    department: "Cardiology",
    totalExp: 10, // years of experience
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
};

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);

    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        getDoctor(user.profileId).then((data) => {
            setProfile({ ...data });
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            licenseNo: '',
            specialization: '',
            department: '',
            totalExp: '',
        },

        validate: {
            dob: (value) => !value ? 'Date of Birth is required' : undefined,
            phone: (value) => !value ? 'Phone number is required' : undefined,
            address: (value) => !value ? 'Address is required' : undefined,
            licenseNo: (value) => !value ? 'License number is required' : undefined,
        },
    });
    const handleEdit = () => {
        form.setValues({ ...profile, dob: profile.dob ? new Date(profile.dob) : undefined, });
        setEdit(true);
    }
    const handleSubmit = (e: any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        console.log(values);
        updateDoctor({ ...profile, ...values, }).then((_data) => {
            successNotification("Profile updated successfully");
            setProfile({ ...profile, ...values });
            setEdit(false);
        }).catch((error) => {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    }
    const matches = useMediaQuery('(max-width: 768px)');
    return (
        <div className="md:p-10 p-5">
            <div className="flex lg:flex-row flex-col justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">

                        <Avatar variant='filled' src="/avatar.png" size={matches ? 120 : 150} alt="it's me" />
                        {editMode && <Button size="sm" onClick={open} variant="filled" >Upload</Button>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="md:text-3xl text-xl font-medium text-neutral-900">{user.name}</div>
                        <div className="md:text-xl text-lg text-neutral-700">{user.email}</div>
                    </div>
                </div>
                {!editMode ? <Button type="button" size={matches ? "sm" : "lg"} onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>Edit</Button> :
                    <Button onClick={handleSubmit} size={matches ? "sm" : "lg"} type="submit" variant="filled" >Submit</Button>}
            </div>
            <Divider my="xl" />
            <div>
                <div className="text-2xl font-medium mb-5 text-neutral-900">Personal Information</div>
                <Table striped stripedColor="primary.1" verticalSpacing="md" withRowBorders={false}>
                    <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Date of Birth</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">    <DateInput {...form.getInputProps("dob")} placeholder="Date of birth"
                            />  </Table.Td> : <Table.Td className="md:text-xl text-lg"> {formatDate(profile.dob) ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Phone</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">  <NumberInput {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" placeholder="Phone number" hideControls /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.phone ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Address</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">   <TextInput {...form.getInputProps("address")} placeholder="Address" /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.address ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">License No</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg"> <TextInput {...form.getInputProps("licenseNo")} placeholder="License number" /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.licenseNo ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Specialization</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">   <Select {...form.getInputProps("specialization")} placeholder="Specialization" data={doctorSpecializations} /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.specialization ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Department</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">    <Select {...form.getInputProps("department")} placeholder="Department" data={doctorDepartments} /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.department ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Total Experience</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">    <NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={50} clampBehavior="strict" placeholder="Total experience" hideControls /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.totalExp ?? '-'} {profile.totalExp ? 'years' : ''}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>

            </Modal>
        </div>
    )
}

export default Profile