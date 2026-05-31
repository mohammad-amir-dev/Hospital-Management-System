import { ActionIcon, Button, Fieldset, Group, MultiSelect, NumberInput, SegmentedControl, Select, SelectProps, Textarea, TextInput } from "@mantine/core";
import { dosageFrequencies, medicineTypes, symptoms, tests } from "../../../Data/DropdownData";
import { useForm } from "@mantine/form";
import { IconCheck, IconLayoutGrid, IconSearch, IconTable, IconTrash } from "@tabler/icons-react";
import { createAppointmentReport, getReportsByPatientId, isReportExists } from "../../../Service/AppointmentService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { formatDate } from "../../../Utility/DateUtitlity";
import { FilterMatchMode } from "primereact/api";
import { getAllMedicines } from "../../../Service/MedicineService";
import { Toolbar } from "primereact/toolbar";
import ReportCard from "./ReportCard";
import { useMediaQuery } from "@mantine/hooks";

type Medicine = {
    name: string;
    medicineId?: string | number | undefined;
    dosage: string;
    frequency: string;
    duration: number; // in days
    route: string; // e.g., oral, intravenous
    type: string; // e.g., tablet, syrup, injection
    instructions: string;
    prescriptionId?: number;
}


const ApReport = ({ appointment }: any) => {

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [allowAdd, setAllowAdd] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [medicine, setMedicine] = useState<any[]>([]);
    const [view, setView] = useState("table");
    const matches = useMediaQuery('(max-width: 768px)');

    const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});
    const form = useForm({
        initialValues: {
            symptoms: [],
            tests: [],
            diagnosis: '',
            referral: '',
            notes: '',
            prescription: {
                medicines: [] as Medicine[]
            }
        },
        validate: {
            symptoms: (value) => (value.length > 0 ? null : 'Please select at least one symptom'),
            diagnosis: (value) => (value?.trim() ? null : 'Diagnosis is required'),
            prescription: {
                medicines: {
                    name: value => (value?.trim() ? null : 'Medicine name is required'),
                    dosage: value => (value?.trim() ? null : 'Dosage is required'),
                    frequency: value => (value ? null : 'Frequency is required'),
                    duration: value => (value > 0 ? null : 'Duration must be greater than 0'),
                    // route: value => (value ? null : 'Route is required'),
                    type: value => (value ? null : 'Type is required'),
                    instructions: value => (value?.trim() ? null : 'Instructions are required')
                }
            }

        }
    })

    useEffect(() => {
        getAllMedicines().then((res) => {
            console.table(res);
            setMedicine(res);
            setMedicineMap(res.reduce((acc: any, item: any) => {
                acc[item.id] = item;
                return acc;
            }, {}));
        }).catch((err) => {
            console.error("Error fetching reports:", err);
        });

    }, []);
    const insertMedicine = () => {
        form.insertListItem('prescription.medicines', { name: '', dosage: '', frequency: '', duration: 0, route: '', type: '', instructions: '' });
    }
    const removeMedicine = (index: number) => {
        form.removeListItem('prescription.medicines', index);
    }
    useEffect(() => {
        fetchData()

    }, [appointment?.patientId, appointment.id]);
    const fetchData = () => {
        getReportsByPatientId(appointment?.patientId).then((res) => {

            setData(res);
        }).catch((err) => {
            console.error("Error fetching reports:", err);
        });
        isReportExists(appointment.id).then((res) => {
            setAllowAdd(!res);

        }).catch((err) => {
            console.error("Error checking report existence:", err);
            setAllowAdd(true);

        });

    }
    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }: any) => (
        <Group flex="1" gap="xs">
            <div className="flex gap-2 items-center">
                {option.label}
                {option?.manufacturer && <span style={{ marginLeft: 'auto', fontSize: '0.8em', color: 'gray' }}>{option.manufacturer} - {option.dosage}</span>}
            </div>
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
        </Group>
    );
    const handleSubmit = (values: typeof form.values) => {
        let data = {
            ...values,
            doctorId: appointment.doctorId,
            patientId: appointment.patientId,
            appointmentId: appointment.id,
            prescription: {
                medicines: values.prescription.medicines.map(med => ({
                    ...med, medicineId: med.medicineId === "OTHER" ? null : med.medicineId
                })),

                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                appointmentId: appointment.id,
            }
        }

        setLoading(true);
        createAppointmentReport(data)
            .then((res) => {
                successNotification("Report created successfully");
                form.reset();
                setEdit(false);
                setAllowAdd(false);
                fetchData();
            })
            .catch((err) => {
                errorNotification(err?.response?.data?.errorMessage || "Failed to create report");
            }).finally(() => {
                setLoading(false);
            })
    }

    const handleChangeMed = (medId: any, index: number) => {
        if (medId && medId !== "OTHER") {
            form.setFieldValue(`prescription.medicines.${index}.medicineId`, medId);
            form.setFieldValue(`prescription.medicines.${index}.name`, medicineMap[medId]?.name || '');
            form.setFieldValue(`prescription.medicines.${index}.dosage`, medicineMap[medId]?.dosage || '');
            form.setFieldValue(`prescription.medicines.${index}.type`, medicineMap[medId]?.type || '');
        }
        else {
            form.setFieldValue(`prescription.medicines.${index}.medicineId`, "OTHER");
            form.setFieldValue(`prescription.medicines.${index}.name`, null);
            form.setFieldValue(`prescription.medicines.${index}.dosage`, null);
            form.setFieldValue(`prescription.medicines.${index}.type`, null);
        }
    }

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">

                {allowAdd && <Button variant="filled" onClick={() => setEdit(true)} >Add Report</Button>}
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };
    const actionBodyTemplate = (rowData: any) => {
        return <div className='flex gap-2'>
            {/* <ActionIcon onClick={() => navigate("/doctor/appointments/" + rowData.appointmentId)} >
                <IconEye size={20} stroke={1.5} />
            </ActionIcon> */}

        </div>
    };
    const startToolbarTemplate = () => {
        return allowAdd && <Button variant="filled" onClick={() => setEdit(true)} >Add Report</Button>
    };
    const rightToolbarTemplate = () => {
        return (
            <div className="md:flex hidden flex-wrap gap-2 justify-end items-center">

                <SegmentedControl
                    value={view}
                    size={matches ? "xs" : "md"}
                    color='primary'
                    onChange={setView}
                    data={[
                        { label: <IconTable />, value: 'table' },
                        { label: <IconLayoutGrid />, value: 'card' }
                    ]}
                />
                <TextInput className='lg:block hidden' leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };


    const header = renderHeader()
    return (
        <div>
            {!edit ? <div>
                <Toolbar className="mb-4 !p-1" start={startToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                {view == "table" && !matches ? <DataTable stripedRows value={data} size='small' paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                    filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                    emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                    <Column field="doctorName" header="Doctor" />

                    <Column field="diagnosis" header="Diagnosis" />
                    <Column field="reportDate" header="Report Date" sortable body={(rowData) => formatDate(rowData.createdAt)} />


                    <Column field="notes" header="Notes" />
                    <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />

                </DataTable> : <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        data?.map((appointment) => (<ReportCard key={appointment.id}  {...appointment} />))
                    }
                    {
                        data.length === 0 && <div className='col-span-4 text-center text-gray-500'>No appointment found.</div>
                    }
                </div>} </div>
                : <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                    <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Personal information</span>} radius="md">
                        <MultiSelect {...form.getInputProps("symptoms")} className="col-span-2" withAsterisk
                            label="Symptoms"
                            placeholder="Pick symptoms"
                            data={symptoms}
                        />
                        <MultiSelect {...form.getInputProps("tests")} className="col-span-2"
                            label="Tests"
                            placeholder="Pick tests"
                            data={tests}
                        />
                        <TextInput {...form.getInputProps("diagnosis")} className="col-span-2 sm:col-span-1" label="Diagnosis" placeholder="Enter diagnosis" withAsterisk />
                        <TextInput {...form.getInputProps("referral")} className="col-span-2 sm:col-span-1" label="Referral" placeholder="Enter referral details" />
                        <Textarea {...form.getInputProps("notes")} className="col-span-2" label="Notes" placeholder="Enter any additional notes" />
                    </Fieldset>
                    <Fieldset className="grid gap-5" legend={<span className="text-lg font-medium text-primary-500">Prescription</span>} radius="md">
                        {
                            form.values.prescription.medicines.map((med: Medicine, index: number) => (<Fieldset legend={<div className="flex  items-center gap-5">
                                <h1 className="text-lg font-medium">Medicine {index + 1}</h1>
                                <ActionIcon onClick={() => removeMedicine(index)} variant="filled" color="red" size="md" className="mb-2">
                                    <IconTrash />
                                </ActionIcon>
                            </div>} className="grid gap-4  col-span-2 sm:grid-cols-2">

                                <Select renderOption={renderSelectOption} {...form.getInputProps(`prescription.medicines.${index}.medicineId`)} label="Medicine" placeholder="Select medicine" onChange={(value: any) => handleChangeMed(value, index)} data={[...medicine.filter((x: any) => !form.values.prescription.medicines.some((item1: any, idx) => item1.medicineId == x.id && idx != index)).map(item => ({ ...item, value: "" + item.id, label: item.name })), { label: "Other", value: "OTHER" }]} withAsterisk />
                                {med.medicineId == "OTHER" && <TextInput {...form.getInputProps(`prescription.medicines.${index}.name`)} label="Medicine" placeholder="Enter medicine name" withAsterisk />}
                                <TextInput disabled={med.medicineId != "OTHER"} {...form.getInputProps(`prescription.medicines.${index}.dosage`)} label="Dosage" placeholder="Enter dosage" withAsterisk />
                                <Select {...form.getInputProps(`prescription.medicines.${index}.frequency`)} label="Frequency" placeholder="Enter frequency" withAsterisk data={dosageFrequencies} />
                                <NumberInput {...form.getInputProps(`prescription.medicines.${index}.duration`)} label="Duration (days)" placeholder="Enter duration in days" withAsterisk />
                                {/* <Select {...form.getInputProps(`prescription.medicines.${index}.route`)} label="Route" placeholder="Select route" withAsterisk data={["Oral", "Intravenous", "Topical", "Inhalation"]} /> */}
                                <Select {...form.getInputProps(`prescription.medicines.${index}.type`)} label="Type" placeholder="Select type" withAsterisk data={medicineTypes} disabled={med.medicineId != "OTHER"} />
                                <TextInput {...form.getInputProps(`prescription.medicines.${index}.instructions`)} label="Instructions" placeholder="Enter instructions" withAsterisk />
                            </Fieldset>
                            ))
                        }
                        <div className="flex items-start col-span-2 justify-center">

                            <Button onClick={insertMedicine} variant="outline" color="primary" className="col-span-2">Add Medicine</Button>
                        </div>
                    </Fieldset>
                    <div className="flex items-center gap-5 justify-center">
                        <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">Submit Report</Button>
                        <Button loading={loading} variant="filled" color="red" >Cancel</Button>
                    </div>
                </form>}
        </div >
    )
}

export default ApReport

// private String name;
// private Long medicineId;
// private String dosage;
// private String frequency;
// private Integer duration; // in days
// private String route; // e.g., oral, intravenous
// private String type; // e.g., tablet, syrup, injection
// private String instructions;
// private Long prescriptionId;
