import { IconClock, IconEmergencyBed, IconNote, IconProgress, IconUserHeart } from "@tabler/icons-react";
import { formatDateWithTime } from "../../../Utility/DateUtitlity";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";

const ApCard = ({ id, doctorName, doctorId, notes, reason, status, appointmentTime }: any) => {
    const navigate = useNavigate();
    const getSeverity = (status: string) => {
        switch (status) {
            case 'CANCELLED':
                return 'danger';

            case 'COMPLETED':
                return 'success';

            case 'SCHEDULED':
                return 'info';

            case 'negotiation':
                return 'warning';
            default:
                return null;
        }
    };
    return (
        <div className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500  cursor-pointer space-y-2">

            <div className="flex text-xs items-center gap-2 ">
                <IconUserHeart className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{doctorName}</div>
            </div>
            {/* <div className="flex justify-between text-xs items-center gap-2">
                <div className="text-gray-600" >Date of Birth:</div>
                <div>{formatDate(dob)}</div>
            </div> */}
            <div className="flex text-xs items-center gap-2 ">
                <IconNote className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{notes}</div>
            </div>
            <div className="flex text-xs items-center gap-2 ">
                <IconEmergencyBed className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{reason}</div>
            </div>
            <div className="flex text-xs items-center gap-2 ">
                <IconClock className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{formatDateWithTime(appointmentTime)}</div>
            </div>

            <div className="flex text-xs items-center gap-2 ">
                <IconProgress className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <Tag value={status} severity={getSeverity(status)} />
            </div>

        </div>

    )
}

export default ApCard



