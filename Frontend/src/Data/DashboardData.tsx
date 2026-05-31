const data = [
    { date: 'Jan 2025', appointments: 54 },
    { date: 'Feb 2025', appointments: 88 },
    { date: 'Mar 2025', appointments: 41 },
    { date: 'Apr 2025', appointments: 97 },
    { date: 'May 2025', appointments: 76 },
    { date: 'Jun 2025', appointments: 32 },
    { date: 'Jul 2025', appointments: 115 },
    { date: 'Aug 2025', appointments: 68 },
    { date: 'Sep 2025', appointments: 82 },
    { date: 'Oct 2025', appointments: 59 },
    { date: 'Nov 2025', appointments: 103 },
    { date: 'Dec 2025', appointments: 47 },
];

const doctorData = [
    { date: 'Jan 2025', doctors: 14 },
    { date: 'Feb 2025', doctors: 28 },
    { date: 'Mar 2025', doctors: 19 },
    { date: 'Apr 2025', doctors: 33 },
    { date: 'May 2025', doctors: 12 },
    { date: 'Jun 2025', doctors: 26 },
    { date: 'Jul 2025', doctors: 22 },
    { date: 'Aug 2025', doctors: 39 },
    { date: 'Sep 2025', doctors: 15 },
    { date: 'Oct 2025', doctors: 30 },
    { date: 'Nov 2025', doctors: 18 },
    { date: 'Dec 2025', doctors: 24 },
];

const patientData = [
    { date: 'Jan 2025', patients: 172 },
    { date: 'Feb 2025', patients: 398 },
    { date: 'Mar 2025', patients: 241 },
    { date: 'Apr 2025', patients: 354 },
    { date: 'May 2025', patients: 199 },
    { date: 'Jun 2025', patients: 436 },
    { date: 'Jul 2025', patients: 280 },
    { date: 'Aug 2025', patients: 121 },
    { date: 'Sep 2025', patients: 312 },
    { date: 'Oct 2025', patients: 405 },
    { date: 'Nov 2025', patients: 267 },
    { date: 'Dec 2025', patients: 356 },
];

const diseaseData = [
    { name: 'Dengue', value: 400, color: 'indigo.6' },
    { name: 'Malaria', value: 300, color: 'yellow.6' },
    { name: 'Tuberculosis', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
];

const patients = [
    { name: 'John Doe', email: 'john@example.com', location: 'New York', bloodGroup: 'A+' },
    { name: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', bloodGroup: 'B+' },
    { name: 'Mike Johnson', email: 'mike@example.com', location: 'Chicago', bloodGroup: 'O+' },
    { name: 'Emily Davis', email: 'emily@example.com', location: 'Houston', bloodGroup: 'AB+' }
]

const medicines = [
    { name: 'Paracetamol', dosage: '500mg', stock: 100, manufacturer: 'Pharma Inc.', },
    { name: 'Ibuprofen', dosage: '200mg', stock: 50, manufacturer: 'HealthCorp', },
    { name: 'Amoxicillin', dosage: '250mg', stock: 75, manufacturer: 'MediLife', },
    { name: 'Cetirizine', dosage: '10mg', stock: 30, manufacturer: 'AllergyFree', },
    { name: 'Azithromycin', dosage: '500mg', stock: 20, manufacturer: 'Antibiotics Co.', }
]

const doctors = [
    { name: 'John Doe', email: 'john@example.com', location: 'New York', department: 'Cardiology' },
    { name: 'Jane Smith', email: 'jane@example.com', location: 'Los Angeles', department: 'Neurology' },
    { name: 'Mike Johnson', email: 'mike@example.com', location: 'Chicago', department: 'Pediatrics' },
    { name: 'Emily Davis', email: 'emily@example.com', location: 'Houston', department: 'Orthopedics' }
]

const appointments = [
    { time: '09:00 AM', patient: 'John Doe', reason: 'General Checkup', doctor: 'Dr. Smith' },
    { time: '10:00 AM', patient: 'Jane Smith', reason: 'Dental Cleaning', doctor: 'Dr. Brown' },
    { time: '11:00 AM', patient: 'Mike Johnson', reason: 'Eye Exam', doctor: 'Dr. Green' },
    { time: '01:00 PM', patient: 'Emily Davis', reason: 'Physical Therapy', doctor: 'Dr. White' },
    { time: '02:00 PM', patient: 'Chris Wilson', reason: 'Vaccination', doctor: 'Dr. Black' },
]
export { data, doctorData, patientData, diseaseData, patients, medicines, doctors, appointments };