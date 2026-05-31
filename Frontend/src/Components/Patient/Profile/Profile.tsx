import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroup, bloodGroups } from "../../../Data/DropdownData";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtitlity";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { arrayToCSV } from "../../../Utility/OtherUtility";
import { DropzoneButton } from "../../Utility/Dropzone/DropzoneButton";
import useProtectedImage from "../../Utility/Dropzone/useProtectedImage";

const patient: any = {
    name: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-05-15",
    phone: "+91 9876543210",
    address: "123, Main Street, Mumbai, India",
    aadharNo: "1234-5678-9012",
    bloodGroup: "O+",
    allergies: "Peanuts",
    chronicDisease: "Diabetes",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
};

const Profile = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEdit] = useState(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        getPatient(user.profileId).then((data) => {
            setProfile({ ...data, allergies: data.allergies ? (JSON.parse(data.allergies)) : null, chronicDisease: data.chronicDisease ? (JSON.parse(data.chronicDisease)) : null });
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            aadharNo: '',
            profilePictureId: '',
            bloodGroup: '',
            allergies: [],
            chronicDisease: [],
        },

        validate: {
            dob: (value) => !value ? 'Date of Birth is required' : undefined,
            phone: (value) => !value ? 'Phone number is required' : undefined,
            address: (value) => !value ? 'Address is required' : undefined,
            aadharNo: (value) => !value ? 'Aadhar number is required' : undefined,
        },
    });
    const handleEdit = () => {
        form.setValues({ ...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease ?? [], allergies: profile.allergies ?? [] });
        setEdit(true);
    }
    const handleSubmit = (e: any) => {
        let values = form.getValues();
        form.validate();
        if (!form.isValid()) return;
        console.log(values);
        updatePatient({ ...profile, ...values, allergies: values.allergies ? JSON.stringify(values.allergies) : null, chronicDisease: values.chronicDisease ? JSON.stringify(values.chronicDisease) : null }).then((data) => {
            successNotification("Profile updated successfully");
            setProfile({ ...profile, ...values });
            setEdit(false);
        }).catch((error) => {
            console.log(error);
            errorNotification(error.response.data.errorMessage);
        })
    }

    const url = useProtectedImage(profile.profilePictureId);
    const matches = useMediaQuery('(max-width: 768px)');
    return (
        <div className="md:p-10 p-5">
            <div className="flex lg:flex-row flex-col justify-between items-center">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col items-center gap-3">

                        <Avatar variant='filled' src={url} size={matches ? 120 : 150} alt="it's me" />
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
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Aadhar No</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg"> <NumberInput {...form.getInputProps("aadharNo")} maxLength={12} clampBehavior="strict" placeholder="Aadhar number" hideControls /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {profile.aadharNo ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Blood Group</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">   <Select {...form.getInputProps("bloodGroup")} placeholder="Blood group" data={bloodGroups} /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {bloodGroup[profile.bloodGroup] ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Allergies</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">   <TagsInput {...form.getInputProps("allergies")} placeholder="Allergies separated by comma" /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {arrayToCSV(profile.allergies) ?? '-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="md:font-semibold md:text-xl text-lg font-medium">Chronic Disease</Table.Td>
                            {editMode ? <Table.Td className="md:text-xl text-lg">    <TagsInput {...form.getInputProps("chronicDisease")} placeholder="Chronic Disease separated by comma" /></Table.Td> : <Table.Td className="md:text-xl text-lg"> {arrayToCSV(profile.chronicDisease) ?? '-'}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
                <DropzoneButton close={close} form={form} id="profilePictureId" />
            </Modal>
        </div>
    )
}

export default Profile