import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../Service/DoctorProfileService";
import DoctorCard from "./DoctorCard";

const Doctor = () => {
    const [doctors, setDoctors] = useState<any[]>([]);

    useEffect(() => {
        getAllDoctors().then((data) => {
            console.log(data);
            setDoctors(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div>
            <div className="text-xl text-primary-500 font-semibold mb-5">Doctors</div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {
                    doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))
                }
            </div>
        </div>
    )
}

export default Doctor