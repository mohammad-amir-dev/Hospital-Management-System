import { ActionIcon, Button, Fieldset, NumberInput, SegmentedControl, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconLayoutGrid, IconSearch, IconTable } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { AddMedicine, getAllMedicines, updateMedicine } from "../../../Service/MedicineService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { medicineCategories, medicineTypes } from "../../../Data/DropdownData";
import { capitalizeFirstLetter } from "../../../Utility/OtherUtility";
import { Toolbar } from "primereact/toolbar";
import MedCard from "./MedCard";
import { useMediaQuery } from "@mantine/hooks";

type Medicine = {
    name: string;
    medicineId?: number;
    dosage: string;
    frequency: string;
    duration: number; // in days
    route: string; // e.g., oral, intravenous
    type: string; // e.g., tablet, syrup, injection
    instructions: string;
    prescriptionId?: number;
}


const Medicine = () => {

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
    const matches = useMediaQuery('(max-width: 768px)');
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [view, setView] = useState("table");

    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            id: null,
            name: '',
            dosage: '',
            category: '',
            type: '',
            manufacturer: '',
            unitPrice: ""
        },
        validate: {
            name: (value) => (value ? null : 'Name is required'),
            dosage: (value) => (value ? null : 'Dosage is required'),
            category: (value) => (value ? null : 'Category is required'),
            type: (value) => (value ? null : 'Type is required'),
            manufacturer: (value) => (value ? null : 'Manufacturer is required'),
            unitPrice: (value) => (value ? null : 'Unit Price is required')
        }
    })

    useEffect(() => {
        fetchData()

    }, []);
    const fetchData = () => {
        getAllMedicines().then((res) => {
            setData(res);
        }).catch((err) => {
            console.error("Error fetching reports:", err);
        });


    }
    const onEdit = (rowData: any) => {
        setEdit(true);
        form.setValues({
            ...rowData,
            name: rowData.name,
            dosage: rowData.dosage,
            category: rowData.category,
            type: rowData.type,
            manufacturer: rowData.manufacturer,
            unitPrice: rowData.unitPrice
        });
    }

    const handleSubmit = (values: any) => {
        let update = false;
        let method;
        if (values.id) {
            update = true;
            method = updateMedicine;
        } else {
            method = AddMedicine;
        }

        setLoading(true);
        method(values)
            .then((_res) => {
                successNotification(`Medicine ${update ? "updated" : "added"} successfully`);
                form.reset();
                setEdit(false);
                fetchData();
            })
            .catch((err) => {
                errorNotification(err?.response?.data?.errorMessage || `Failed to ${update ? "update" : "add"} medicine`);
            }).finally(() => {
                setLoading(false);
            })
    }
    const cancel = () => {
        form.reset();
        setEdit(false);
    }
    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">

                <Button variant="filled" onClick={() => setEdit(true)} >Add Medicine</Button>
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };
    const startToolbarTemplate = () => {
        return (
            <Button variant="filled" onClick={() => setEdit(true)} >Add Medicine</Button>
        );
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

    const actionBodyTemplate = (rowData: any) => {
        return <div className='flex gap-2'>
            <ActionIcon onClick={() => onEdit(rowData)} >
                <IconEdit size={20} stroke={1.5} />
            </ActionIcon>

        </div>
    };
    const header = renderHeader()
    //name, dosage, category, type, manufacturer, unitPrice
    return (
        <div>
            {!edit ? <div>
                <Toolbar className="mb-4 !p-1 md:block hidden" end={rightToolbarTemplate}></Toolbar>
                {view == "table" && !matches ? <DataTable stripedRows value={data} size='small' paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                    filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                    emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                    <Column field="name" header="Name" />

                    <Column field="dosage" header="Dosage" />
                    <Column field="stock" header="Stock" />
                    <Column field="category" header="Category" body={rowData => capitalizeFirstLetter(rowData.category)} />
                    <Column field="type" header="Type" body={rowData => capitalizeFirstLetter(rowData.type)} />
                    <Column field="manufacturer" header="Manufacturer" />
                    <Column field="unitPrice" header="Unit Price (₹)" sortable />



                    {/* <Column headerStyle={{ textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} /> */}

                </DataTable> : <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        data?.map((appointment) => (<MedCard key={appointment.id}  {...appointment} />))
                    }
                    {
                        data.length === 0 && <div className='col-span-4 text-center text-gray-500'>No medicine found.</div>
                    }
                </div>} </div>
                : <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">
                    <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Medicine information</span>} radius="md">
                        <TextInput {...form.getInputProps("name")} label="Medicine" placeholder="Enter medicine name" withAsterisk />
                        <TextInput {...form.getInputProps("dosage")} label="Dosage" placeholder="Enter dosage (50mg, 100mg, etc.)" />
                        <Select {...form.getInputProps("category")} label="Category" placeholder="Select category" data={medicineCategories} />
                        <Select {...form.getInputProps("type")} label="Type" placeholder="Select type" data={medicineTypes} />
                        <TextInput  {...form.getInputProps("manufacturer")} label="Manufacturer" placeholder="Enter manufacturer" />
                        <NumberInput {...form.getInputProps("unitPrice")} min={0} clampBehavior="strict" label="Unit Price" placeholder="Enter unit price" />

                    </Fieldset>

                    <div className="flex items-center gap-5 justify-center">
                        <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">{form.values?.id ? "Update" : "Add"} medicine</Button>
                        <Button loading={loading} onClick={cancel} variant="filled" color="red" >Cancel</Button>
                    </div>
                </form>}
        </div >
    )
}

export default Medicine




