const bloodGroups = [
    { value: "A_POSITIVE", label: "A+" },
    { value: "A_NEGATIVE", label: "A-" },
    { value: "B_POSITIVE", label: "B+" },
    { value: "B_NEGATIVE", label: "B-" },
    { value: "O_POSITIVE", label: "O+" },
    { value: "O_NEGATIVE", label: "O-" },
    { value: "AB_POSITIVE", label: "AB+" },
    { value: "AB_NEGATIVE", label: "AB-" }
];
const bloodGroup: Record<string, string> = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-"
};
const bloodGroupMap = bloodGroup;
const doctorSpecializations = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "General Surgery", "Psychiatry", "Radiology", "Gynecology", "Ophthalmology"];


const doctorDepartments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Surgery", "Psychiatry", "Radiology", "Gynecology", "Ophthalmology", "ENT", "Anesthesiology", "Pathology", "Emergency Medicine"];


const appointmentReasons = [
    "General Consultation",
    "Follow-up Visit",
    "Prescription Refill",
    "Lab Results Review",
    "Chronic Condition Management",
    "Mental Health Counseling",
    "Pre-Surgery Consultation",
    "Post-Surgery Follow-up",
    "Vaccination",
    "Routine Checkup",
    "Diagnostic Test",
    "Second Opinion",
    "Physical Examination",
    "Injury or Pain",
    "Allergy Symptoms",
    "Skin Concerns",
    "Fever or Infection",
    "Health Certificate Request",
    "Maternity/Prenatal Checkup",
    "Pediatric Consultation"
]
const symptoms = [
    "Fever",
    "Cough",
    "Fatigue",
    "Headache",
    "Sore Throat",
    "Shortness of Breath",
    "Chest Pain",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Dizziness",
    "Muscle Pain",
    "Loss of Taste",
    "Loss of Smell",
    "Abdominal Pain",
    "Back Pain",
    "Rash",
    "Joint Pain",
    "Chills",
    "Runny Nose"
];

const tests = [
    "CBC",
    "Chest X-Ray",
    "Blood Sugar",
    "Urine Test",
    "Liver Function Test",
    "Kidney Function Test",
    "ECG",
    "MRI Scan",
    "CT Scan",
    "Thyroid Profile",
    "Lipid Profile",
    "Dengue Test",
    "COVID-19 PCR",
    "Malaria Test",
    "Stool Test",
    "Ultrasound",
    "Vitamin D Test",
    "Hemoglobin Test",
    "Allergy Test"
];
const dosageFrequencies = [
    "1-0-0",  // Morning only
    "0-1-0",  // Afternoon only
    "0-0-1",  // Night only
    "1-1-0",  // Morning & Afternoon
    "1-0-1",  // Morning & Night
    "0-1-1",  // Afternoon & Night
    "1-1-1",  // Morning, Afternoon & Night
    "0-0-0",  // None (used to skip)
    "1-0-0.5", // Morning + half night
    "1-0-0 (SOS)", // Morning if needed
    "1-0-1 (Alt Day)", // Alternate days
];
const freqMap: Record<string, number> = {
    "1-0-0": 1,
    "0-1-0": 1,
    "0-0-1": 1,
    "1-1-0": 2,
    "1-0-1": 2,
    "0-1-1": 2,
    "1-1-1": 3,
    "0-0-0": 0,
    "1-0-0.5": 1.5,
    "1-0-0 (SOS)": 0.5,
    "1-0-1 (Alt Day)": 1
}

const medicineCategories = [
    { label: "Antibiotic", value: "ANTIBIOTIC" },
    { label: "Analgesic", value: "ANALGESIC" },
    { label: "Antihistamine", value: "ANTIHISTAMINE" },
    { label: "Antiseptic", value: "ANTISEPTIC" },
    { label: "Vitamin", value: "VITAMIN" },
    { label: "Mineral", value: "MINERAL" },
    { label: "Herbal", value: "HERBAL" },
    { label: "Homeopathic", value: "HOMEOPATHIC" },
    { label: "Other", value: "OTHER" },
];
const medicineTypes = [
    { label: "Syrup", value: "SYRUP" },
    { label: "Tablet", value: "TABLET" },
    { label: "Capsule", value: "CAPSULE" },
    { label: "Injection", value: "INJECTION" },
    { label: "Ointment", value: "OINTMENT" },
    { label: "Liquid", value: "LIQUID" },
    { label: "Powder", value: "POWDER" },
    { label: "Cream", value: "CREAM" },
    { label: "Spray", value: "SPRAY" },
    { label: "Drops", value: "DROPS" },
];
export { bloodGroups, doctorSpecializations, doctorDepartments, bloodGroup, appointmentReasons, symptoms, tests, dosageFrequencies, medicineCategories, medicineTypes, freqMap, bloodGroupMap };