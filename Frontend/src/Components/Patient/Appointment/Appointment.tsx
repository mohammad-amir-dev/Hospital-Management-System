
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ActionIcon, Button, LoadingOverlay, Modal, SegmentedControl, Select, Text, Textarea, TextInput } from '@mantine/core';
import { IconLayoutGrid, IconPlus, IconSearch, IconTable, IconTrash } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { getDoctorDropdown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../../Data/DropdownData';
import { useSelector } from 'react-redux';
import { cancelAppointment, getAppointmentsByPatient, scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';
import { formatDateWithTime } from '../../../Utility/DateUtitlity';
import { modals } from '@mantine/modals';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { Toolbar } from 'primereact/toolbar';
import ApCard from './ApCard';
interface Country {
    name: string;
    code: string;
}

interface Representative {
    name: string;
    image: string;
}

interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string | Date;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

const Appointment = () => {
    const [view, setView] = useState("table");
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [tab, setTab] = useState<string>('Today');
    const [doctors, setDoctors] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const user = useSelector((state: any) => state.user);
    const matches = useMediaQuery('(max-width: 768px)');
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        doctorName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        reason: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { value: null, matchMode: FilterMatchMode.IN },


    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

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

    // [{ label: 'Unqualified', value: 'unqualified' },]

    useEffect(() => {

        fetchData();
        getDoctorDropdown().then((data) => {
            setDoctors(data.map((doctor: any) => ({
                value: "" + doctor.id,
                label: doctor.name
            })));
        }).catch((error) => {
            console.error("Error fetching doctors:", error);
        }
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const fetchData = () => {
        getAppointmentsByPatient(user.profileId).then((data) => {
            setAppointments(getCustomers(data));
        }).catch((error) => {
            console.error("Error fetching appointments:", error);
        });
    }

    const getCustomers = (data: Customer[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };


    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters: any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const form = useForm({

        initialValues: {
            doctorId: '',
            patientId: user.profileId,
            appointmentTime: new Date(),
            reason: '',
            notes: ""
        },

        validate: {
            doctorId: (value) => !value ? 'Doctor is required' : undefined,
            appointmentTime: (value) => !value ? 'Appointment time is required' : undefined,
            reason: (value) => !value ? 'Reason for appointment is required' : undefined,

        },
    });

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <Button leftSection={<IconPlus />} onClick={open} variant="filled">Schedule Appointment</Button>

                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };




    const statusBodyTemplate = (rowData: Customer) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };




    const handleDelete = (rowData: any) => {
        modals.openConfirmModal({
            title: <span className='text-xl font-serif font-semibold'>Are You sure</span>,
            centered: true,
            children: (
                <Text size="sm">
                    You want to cancel this appointment? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },

            onConfirm: () => {

                cancelAppointment(rowData.id).then(() => {
                    successNotification("Appointment cancelled successfully");
                    setAppointments(appointments.map((appointment) => appointment.id == rowData.id ? { ...appointment, status: "CANCELLED" } : appointment));
                }).catch((error) => {
                    errorNotification(error.response?.data?.errorMessage || "Failed to cancel appointment");
                });
            },
        });
    }

    const actionBodyTemplate = (rowData: any) => {
        return <div className='flex gap-2'>
            {/* <ActionIcon >
                <IconEdit size={20} stroke={1.5} />
            </ActionIcon> */}
            <ActionIcon color='red' onClick={() => handleDelete(rowData)}>
                <IconTrash size={20} stroke={1.5} />
            </ActionIcon>

        </div>
    };

    const header = renderHeader();
    const handleSubmit = (values: any) => {
        setLoading(true);
        scheduleAppointment(values).then((data) => {
            close();
            form.reset();
            fetchData(); // Refresh the appointments list
            successNotification("Appointment scheduled successfully");

        }).catch((error) => {
            errorNotification(error.response?.data?.errorMessage || "Failed to schedule appointment");
        }).finally(() => {
            setLoading(false);
        });

    }
    const timeTemplate = (rowData: any) => {
        return <span>{formatDateWithTime(rowData.appointmentTime)}</span>
    }
    const leftToolbarTemplate = () => {
        return (
            <Button leftSection={<IconPlus />} size={matches ? "xs" : "md"} onClick={open} variant="filled">Schedule </Button>

        );
    };

    const rightToolbarTemplate = () => {
        return <div className='md:flex hidden gap-5 items-center'>
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
            <TextInput className='lg:block hidden' leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /></div>;
    };
    const centerToolbarTemplate = () => {
        return <SegmentedControl
            value={tab}
            size={matches ? "xs" : "md"}
            variant='filled'
            color={tab === "Today" ? "blue" : tab === "Upcoming" ? "green" : "red"}
            onChange={setTab}
            data={["Today", "Upcoming", "Past"]}
        />
    }

    const filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentTime);

        const today = new Date();
        // Remove time from today
        today.setHours(0, 0, 0, 0);

        const appointmentDay = new Date(appointmentDate);
        appointmentDay.setHours(0, 0, 0, 0); // Strip time from appointment date

        if (tab === "Today") {
            return appointmentDay.getTime() === today.getTime();
        } else if (tab === "Upcoming") {
            return appointmentDay.getTime() > today.getTime();
        } else if (tab === "Past") {
            return appointmentDay.getTime() < today.getTime();
        }

        return true; // Default case, show all appointments
    });
    return (
        <div className="card">
            <Toolbar className="mb-4 md:p-3 p-1" start={leftToolbarTemplate} center={centerToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
            {view == "table" && !matches ? <DataTable stripedRows value={filteredAppointments} size='small' paginator rows={10}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                filters={filters} filterDisplay="menu" globalFilterFields={['doctorName', 'reason', 'notes', 'status']}
                emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                <Column field="doctorName" header="Doctor" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="appointmentTime" header="Appointment Time" sortable style={{ minWidth: '14rem' }} body={timeTemplate} />
                <Column field="reason" header="Reason" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="notes" header="Notes" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />

                <Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter />

                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable> : <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                {
                    filteredAppointments?.map((appointment) => (<ApCard key={appointment.id} {...appointment} />))
                }
                {
                    filteredAppointments.length === 0 && <div className='col-span-4 text-center text-gray-500'>No appointment found.</div>
                }
            </div>}

            <Modal opened={opened} size="lg" onClose={close} title={<div className='text-xl font-semibold text-primary-500'>Schedule Appointment</div>} centered>
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-cols-1 gap-5'>
                    <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder='Select Doctor' />
                    <DateTimePicker minDate={new Date()} {...form.getInputProps("appointmentTime")} withAsterisk label="Appointment Time" placeholder="Pick date and time" />
                    <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason for Appointment" placeholder="Enter reason for appointment" />
                    <Textarea {...form.getInputProps("notes")} label="Additional Notes" placeholder="Enter any additional notes" />
                    <Button type="submit" variant="filled" fullWidth >Submit</Button>
                </form>
            </Modal>
        </div>
    );
}


export default Appointment;