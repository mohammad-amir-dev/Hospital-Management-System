import Appointments from "./Appointment"
import DiseaseChart from "./DiseaseChart"
import Metrices from "./Metrices"
import PatientMetrics from "./PatientMetrics"
import Patients from "./Patients"
import Welcome from "./Welcome"

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid lg:grid-cols-2 gap-5">
                <Welcome />
                <Metrices />
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
                <DiseaseChart />
                <div className="lg:col-span-2">

                    <PatientMetrics />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-5 ">
                <Patients /><Appointments />
            </div>

        </div>
    )
}

export default Dashboard