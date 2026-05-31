import { Avatar, Divider } from "@mantine/core";
import { bloodGroupMap } from "../../../Data/DropdownData";
import { IconCalendarHeart, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import useProtectedImage from "../../Utility/Dropzone/useProtectedImage";

const PatientCard = ({ name, email, dob, phone, id, address, aadharNo, bloodGroup, allergies, chronicDisease, profilePictureId }: any) => {
    const getAge = (dob: string) => {
        if (!dob) return "N/A";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    }
    const url = useProtectedImage(profilePictureId);
    return (
        <div className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500  cursor-pointer space-y-2">
            <div className="flex items-center gap-3 ">
                <Avatar size="lg" src={url} name={name} color="initials" variant="filled" />
                <div>

                    <div className="text-sm">{name}</div>
                    <div className="text-xs text-gray-500">
                        {bloodGroupMap[bloodGroup]}
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex text-xs items-center gap-2 ">
                <IconMail className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{email}</div>
            </div>
            {/* <div className="flex justify-between text-xs items-center gap-2">
                <div className="text-gray-600" >Date of Birth:</div>
                <div>{formatDate(dob)}</div>
            </div> */}
            <div className="flex text-xs items-center gap-2 ">
                <IconPhone className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>+91 {phone}</div>
            </div>
            <div className="flex text-xs items-center gap-2 ">
                <IconMapPin className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{address}</div>
            </div>
            <div className="flex text-xs items-center gap-2 ">
                <IconCalendarHeart className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{getAge(dob)} Years</div>
            </div>

            {/* <div className="flex text-xs items-center gap-2 ">
                <IconBriefcase className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{totalExp} Years</div>
            </div> */}

        </div>

    )
}

export default PatientCard




// {
//     "id": 2,
//     "name": "Marshal",
//     "email": "chandra82001@gmail.com",
//     "dob": "2025-02-06",
//     "phone": "2453453453",
//     "address": "India",
//     "aadharNo": "298723489274",
//     "bloodGroup": "B_POSITIVE",
//     "allergies": "[\"Milk\",\"Chicken\",\"cdsc\",\"cvdsfv\"]",
//     "chronicDisease": "[\"Itching\",\"Random\",\"jxhasjx\"]"
// }