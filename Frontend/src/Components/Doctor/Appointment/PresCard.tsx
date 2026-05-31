import { IconClock, IconMedicineSyrup, IconNote, IconUserHeart } from "@tabler/icons-react";
import { formatDate } from "../../../Utility/DateUtitlity";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PresCard = ({ appointmentId, doctorName, notes, reason, status, prescriptionDate, medicines, handleMedicine }: any) => {
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
        <div onClick={() => navigate("/doctor/appointments/" + appointmentId)} className="border p-4 flex flex-col gap-2 hover:bg-primary-50 transition duration-300 ease-in-out rounded-xl hover:shadow-[0_0_5px_1px_blue] !shadow-primary-500  cursor-pointer space-y-2">

            <div className="flex text-xs items-center gap-2 ">
                <IconUserHeart className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{doctorName}</div>
            </div>



            <div className="flex text-xs items-center gap-2 ">
                <IconClock className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{formatDate(prescriptionDate)}</div>
            </div>
            <div className="flex text-xs items-center gap-2 ">
                <IconMedicineSyrup className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div className="flex gap-2 items-center">{medicines.length} <Button onClick={() => handleMedicine(medicines)} size="compact-xs">View Meds</Button></div>
            </div>
            {notes && <div className="flex text-xs items-center gap-2 ">
                <IconNote className="text-primary-700 bg-primary-100 p-1 rounded-full" size={24} />
                <div>{notes}</div>
            </div>}


        </div>

    )
}

export default PresCard



