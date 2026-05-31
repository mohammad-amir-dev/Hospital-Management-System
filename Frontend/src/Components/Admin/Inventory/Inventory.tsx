import { ActionIcon, Badge, Button, Fieldset, Group, NumberInput, SegmentedControl, Select, SelectProps, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconEdit, IconLayoutGrid, IconSearch, IconTable } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { getAllMedicines } from "../../../Service/MedicineService";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { DateInput } from "@mantine/dates";
import { addStock, getAllStocks, updateStock } from "../../../Service/InventoryService";
import InvCard from "./InvCard";
import { Toolbar } from "primereact/toolbar";
import { useMediaQuery } from "@mantine/hooks";



const Inventory = () => {
    const [view, setView] = useState("table");
    const matches = useMediaQuery('(max-width: 768px)');
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
    const [medicine, setMedicine] = useState<any[]>([]);

    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [medicineMap, setMedicineMap] = useState<Record<string, any>>({});


    // medicineId, batchNo, quantity, expiryDate, 
    const form = useForm({
        initialValues: {
            id: null,
            medicineId: '',
            batchNo: '',
            quantity: 0,
            expiryDate: ""
        },
        validate: {
            medicineId: (value) => (value ? null : 'Medicine is required'),
            batchNo: (value) => (value ? null : 'Batch number is required'),
            quantity: (value) => (value > 0 ? null : 'Quantity must be positive'),
            expiryDate: (value) => (value ? null : 'Expiry date is required'),
        }
    })

    useEffect(() => {
        getAllMedicines().then((res) => {
            setMedicine(res);
            setMedicineMap(res.reduce((acc: any, item: any) => {
                acc[item.id] = item;
                return acc;
            }, {}));
            console.log(res);
        }).catch((err) => {
            console.error("Error fetching reports:", err);
        });
        fetchData()

    }, []);
    const fetchData = () => {
        getAllStocks().then((res) => {
            setData(res);
            console.log(res);
        }).catch((err) => {
            console.error("Error fetching reports:", err);
        });


    }
    const onEdit = (rowData: any) => {
        setEdit(true);
        form.setValues({
            ...rowData,
            medicineId: String(rowData.medicineId),
            batchNo: rowData.batchNo,
            quantity: rowData.quantity,
            expiryDate: new Date(rowData.expiryDate)
        });
    }

    const handleSubmit = (values: any) => {
        let update = false;
        let method;
        if (values.id) {
            update = true;
            method = updateStock;
        } else {
            method = addStock;
        }

        setLoading(true);
        method(values)
            .then((_res) => {
                successNotification(`Stock ${update ? "updated" : "added"} successfully`);
                form.reset();
                setEdit(false);
                fetchData();
            })
            .catch((err) => {
                errorNotification(err?.response?.data?.errorMessage || `Failed to ${update ? "update" : "add"} Stock`);
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

                <Button variant="filled" onClick={() => setEdit(true)} >Add Stock</Button>
                <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };
    const startToolbarTemplate = () => {
        return (

            <Button variant="filled" onClick={() => setEdit(true)} >Add Stock</Button>
        );
    };
    const rightToolbarTemplate = () => {
        return (
            <div className="md:flex hidden  flex-wrap gap-2 justify-end items-center">

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
            <ActionIcon onClick={() => onEdit(rowData)} >
                <IconEdit size={20} stroke={1.5} />
            </ActionIcon>

        </div>
    };
    const header = renderHeader()

    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }: any) => (
        <Group flex="1" gap="xs">
            <div className="flex gap-2 items-center">

                {option.label}
                {option?.manufacturer && <span style={{ marginLeft: 'auto', fontSize: '0.8em', color: 'gray' }}>{option.manufacturer}</span>}
            </div>
            {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
        </Group>
    );

    const statusBody = (rowData: any) => {
        const isExpired = new Date(rowData.expiryDate) < new Date();
        return <Badge color={isExpired ? "red" : "green"}>{isExpired ? "Expired" : "Active"}</Badge>;
    }
    //name, dosage, category, type, manufacturer, unitPrice
    return (
        <div>
            {!edit ? <div>
                <Toolbar className="mb-4 !p-1" start={startToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                {view == "table" && !matches ? <DataTable stripedRows value={data} size='small' paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id"

                    filterDisplay="menu" globalFilterFields={['doctorName', 'notes']}
                    emptyMessage="No appointment found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">

                    <Column field="name" header="Medicine" body={(rowData) => <span> {medicineMap["" + rowData.medicineId]?.name} <span className="text-xs text-gray-600">{medicineMap["" + rowData.medicineId]?.manufacturer}</span></span>} />

                    <Column field="batchNo" header="Batch No." />
                    <Column field="initialQuantity" header="Quantity" />
                    <Column field="quantity" header="Remaining Quantity" />
                    <Column field="expiryDate" header="Expiry Date" />
                    <Column field="status" header="Status" body={statusBody} />



                    <Column headerStyle={{ textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />

                </DataTable> : <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        data?.map((appointment) => (<InvCard key={appointment.id} medicineMap={medicineMap}  {...appointment} onEdit={() => onEdit(appointment)} />))
                    }
                    {
                        data.length === 0 && <div className='col-span-4 text-center text-gray-500'>No medicine found.</div>
                    }
                </div>} </div>
                : <form onSubmit={form.onSubmit(handleSubmit)} className="grid gap-5">

                    <Fieldset className="grid gap-4 sm:grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Medicine information</span>} radius="md">
                        <Select renderOption={renderSelectOption} {...form.getInputProps("medicineId")} label="Medicine" placeholder="Select medicine" data={medicine.map(item => ({ ...item, value: "" + item.id, label: item.name }))} />
                        <TextInput {...form.getInputProps("batchNo")} label="Batch No." placeholder="Enter batch number" withAsterisk />
                        <NumberInput {...form.getInputProps("quantity")} min={0} clampBehavior="strict" label="Quantity" placeholder="Enter quantity" />
                        <DateInput {...form.getInputProps("expiryDate")} minDate={new Date()} label="Expiry Date" placeholder="Enter expiry date" withAsterisk />

                    </Fieldset>

                    <div className="flex items-center gap-5 justify-center">
                        <Button loading={loading} type="submit" className="w-full" variant="filled" color="primary">{form.values?.id ? "Update" : "Add"} Stock</Button>
                        <Button loading={loading} onClick={cancel} variant="filled" color="red" >Cancel</Button>
                    </div>
                </form>}
        </div >
    )
}

export default Inventory




