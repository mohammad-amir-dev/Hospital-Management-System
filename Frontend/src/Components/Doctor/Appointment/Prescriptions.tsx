import { ActionIcon, Card, Divider, Grid, Modal, SegmentedControl, Text, TextInput, Title } from "@mantine/core";
import { IconEye, IconLayoutGrid, IconMedicineSyrup, IconSearch, IconTable } from "@tabler/icons-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useEffect, useState } from "react";
import { getPrescriptionsByPatientId } from "../../../Service/AppointmentService";
import { formatDate } from "../../../Utility/DateUtitlity";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Toolbar } from "primereact/toolbar";
import PresCard from "./PresCard";

const Prescriptions = ({ appointment }: any) => {
    const [view, setView] = useState("table");
    const [data, setData] = useState<any[]>([]);
    const matches = useMediaQuery('(max-width: 768px)');
    const [opened, { open, close }] = useDisclosure(false);
    const [medicineData, setMedicineData] = useState<any[]>([]);
    const navigate = useNavigate();
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
    useEffect(() => {
        if (!appointment?.patientId) return;
        getPrescriptionsByPatientId(appointment?.patientId).then((res) => {
            console.log("Prescriptions Data:", res);
            setData(res);
        }).catch((err) => {
            console.error("Error fetching prescriptions:", err);
        });
    }, [appointment?.patientId]);

    const handleMedicine = (medicine: any[]) => {
        console.log("Selected Medicines:", medicine);
        open();
        setMedicineData(medicine);
    }
    const rightToolbarTemplate = () => {
        return (
            <div className="md:flex hidden  flex-wrap gap-5 justify-end items-center">

                <SegmentedControl
                    value={view}
                    color='primary'
                    size={matches ? "xs" : "md"}
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

    const actionBodyTemplate = (rowData: any) => {
        return <div className='flex gap-2'>
            <ActionIcon onClick={() => navigate("/doctor/appointments/" + rowData.appointmentId)} >
                <IconEye size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red" onClick={() => handleMedicine(rowData.medicines)} >
                <IconMedicineSyrup size={20} stroke={1.5} />
            </ActionIcon>

        </div>
    };

    return (
        <div>
            <Toolbar className="mb-4 !p-1" end={rightToolbarTemplate}></Toolbar>
            {view == "table" && !matches ? <DataTable stripedRows value={data} size='small' paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                <Column field="doctorName" header="Doctor" />

                <Column field="prescriptionDate" header="Prescription Date" sortable body={(rowData) => formatDate(rowData.prescriptionDate)} />
                <Column field="medicine" header="Medicines" body={(rowData) => rowData.medicines?.length ?? 0} />

                <Column field="notes" header="Notes" style={{ minWidth: '14rem' }} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />

            </DataTable> : <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                {
                    data?.map((appointment) => (<PresCard key={appointment.id} handleMedicine={handleMedicine} {...appointment} />))
                }
                {
                    data.length === 0 && <div className='col-span-4 text-center text-gray-500'>No prescription found.</div>
                }
            </div>}
            <Modal opened={opened} size="xl" onClose={close} title="Medicines" centered>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">

                    {
                        medicineData?.map((data: any, index: number) => (
                            <Card key={index} shadow="md" radius="md" padding="lg" withBorder>
                                <Title order={4} mb="sm">
                                    {data.name} ({data.type})
                                </Title>

                                <Divider my="sm" />

                                <Grid>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Dosage:</Text>
                                        <Text>{data.dosage}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Frequency:</Text>
                                        <Text>{data.frequency}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Duration:</Text>
                                        <Text>{data.duration} days</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Route:</Text>
                                        <Text>{data.route}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Prescription ID:</Text>
                                        <Text>{data.prescriptionId}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Text size="sm" fw={500}>Medicine ID:</Text>
                                        <Text>{data.medicineId ?? 'N/A'}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                        <Text size="sm" fw={500}>Instructions:</Text>
                                        <Text>{data.instructions}</Text>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        ))
                    }
                </div>
                {
                    medicineData.length === 0 && (
                        <Text color="dimmed" size="sm" mt="md">
                            No medicines prescribed for this appointment.
                        </Text>
                    )
                }
            </Modal>
        </div>
    )
}

export default Prescriptions

