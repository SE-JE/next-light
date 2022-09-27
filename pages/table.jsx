import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { ButtonComponent, TableComponent, TableResponsiveComponent } from '../components/base_component'

export default function Table() {
    const [sort, setSort] = useState(null);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState(10);
    const [searchColumn, setSearchColumn] = useState(null);
    const [filter, setFilter] = useState([]);

    const columns = [
        {
            label: "Name",
            selector: "name",
            width: "300px",
            sortable: true,
        },
        {
            label: "Date of Birth",
            selector: "dob"
        },
        {
            label: "Gender",
            selector: "gender",
            filter: {
                type: "checkbox",
                options: [
                    {
                        label: "Male",
                        value: "male"
                    },
                    {
                        label: "Female",
                        value: "female"
                    },
                ]
            }
        },
        {
            label: "Nationality",
            selector: "nationality"
        },
        {
            label: "Religion",
            selector: "religion"
        },
        {
            label: "Registered At",
            selector: "registered_at"
        },
    ]

    const data = [
        {
            name: "Steve Jobs",
            dob: "20 September 2022",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
        {
            name: "Magarate Aristoteles",
            gender: "Female",
            action: (
                <>
                    <ButtonComponent
                        icon={faEye}
                        label={"View"}
                        bg="light__secondary"
                        color="secondary"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faEdit}
                        label={"Edit"}
                        bg="light__warning"
                        color="warning"
                        size={"sm"}
                        rounded
                    />
                    <ButtonComponent
                        icon={faTrash}
                        label={"Delete"}
                        bg="light__danger"
                        color="danger"
                        size={"sm"}
                        rounded
                    />
                </>

            )
        },
    ]
    return (
        <div className='container mx-auto p-8'>
            <h1 className='text-xl font-bold mb-4'>View Table Data</h1>

            <TableComponent
                topBar={(
                    <>
                        <ButtonComponent
                            bg="primary"
                            label="Add New Data"
                            icon={faPlus}
                            size="sm"
                        />
                    </>
                )}
                columns={columns}
                data={data}
                setSort={sort}
                onChangeSort={(e) => setSort(e)}
                setTotalRow={100}
                setPage={page}
                setPaginate={paginate}
                onChangePage={(e) => setPage(e)}
                onChangePaginate={(e) => setPaginate(e)}
                searchColumn={true}
                setSearchColumn={searchColumn}
                onChangeSearchColumn={(e) => setSearchColumn(e)}
                onChangeFilter={(e) => setFilter(e)}
                setFilterValue={filter}
            />
        </div>
    )
}
