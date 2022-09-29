import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { ButtonComponent, TableComponent, ModalRightComponent, FormPlusComponent } from '../'
import { get } from '../../../pages/api/crud';

export default function TableCrudComponent({
    title,
    urlPath,
    searchColumn,
    exceptColumns,
    exceptSorts,
    customForm,
}) {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRow, setTotalRow] = useState(0);
    const [sort, setSort] = useState({ selector: "created_at", direction: "desc" });
    const [search, setSearch] = useState("");
    const [srcColumn, setSrcColumn] = useState(null);
    const [filter, setFilter] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const [forms, setForms] = useState([]);

    useEffect(async () => {
        setLoading(true)

        let response = await get(urlPath, {
            paginate: paginate,
            page: page,
            sortBy: sort?.selector,
            sortDirection: sort?.direction,
            search: search,
            filter: JSON.stringify(filter)
        });

        if (response?.status == 200) {
            let responseData = response.data.data;

            if (responseData?.at(0)) {
                let newColumns = [];
                let newData = [];

                Object.keys(responseData.at(0)).map((keyName) => {
                    if ((!exceptColumns || !exceptColumns.includes(keyName))) {
                        newColumns.push({
                            label: keyName.charAt(0).toUpperCase() + keyName.slice(1),
                            selector: keyName,
                            width: "200px",
                            sortable: (!exceptSorts || !exceptSorts.includes(keyName))
                        });
                    }

                })

                if (response.data.filters) {
                    Object.keys(response.data.filters).map((keyName) => {
                        newColumns.filter((col) => col.selector == keyName).at(0).filters = response.data.filters[keyName]
                    });
                }

                if (response.data.total_row) {
                    setTotalRow(response.data.total_row)
                }

                if (!customForm) {
                    let newForms = [];

                    Object.keys(responseData.at(0)).map((keyName) => {
                        if ((!exceptColumns || !exceptColumns.includes(keyName))) {
                            newForms.push({
                                label: keyName.charAt(0).toUpperCase() + keyName.slice(1),
                                name: keyName,
                                placeholder: "Please enter " + keyName + "...",
                                validate: {
                                    required: true,
                                },
                            });
                        }
                    })

                    setForms(newForms)
                }

                setColumns(newColumns)

                responseData.map((item, key) => {
                    newData.push({
                        ...item,
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
                    })
                })


                setData(newData)
            } else {
                setData([]);
            }

            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } else {
            setIsError(true)

            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

    }, [paginate, page, sort, search, filter, refresh]);

    return (
        <>
            <div className='container mx-auto p-8'>
                <h1 className='text-xl font-bold mb-4'>{title}</h1>

                {!isError ? (
                    <TableComponent
                        topBar={(
                            <>
                                <ButtonComponent
                                    bg="primary"
                                    label="Add New Data"
                                    icon={faPlus}
                                    size="sm"
                                    onClick={(e) => setModalForm(true)}
                                />
                            </>
                        )}
                        columns={columns}
                        data={data}
                        setSort={sort}
                        onChangeSort={(e) => setSort(e)}
                        setTotalRow={totalRow}
                        setPage={page}
                        setPaginate={paginate}
                        onChangePage={(e) => setPage(e)}
                        onChangePaginate={(e) => setPaginate(e)}
                        searchColumn={searchColumn}
                        setSearchColumn={srcColumn}
                        onChangeSearchColumn={(e) => setSrcColumn(e)}
                        onChangeFilter={(e) => setFilter(e)}
                        setFilterValue={filter}
                        loading={loading}
                        onChangeSearch={(e) => setSearch(e)}
                        setSearch={search}
                    />
                ) : (
                    <div className='flex flex-col items-center justify-center gap-8 p-5'>
                        <img
                            src='/500.svg'
                            width={"350px"}
                            alt='server error'
                        />
                        <h1 className='text-2xl font-bold'>Server Disconnect</h1>
                    </div>
                )}
            </div>

            <ModalRightComponent
                title={"Add New " + title}
                subTitle={"Masukkan data secara valid dan benar!"}
                show={modalForm}
                onClose={(e) => setModalForm(false)}
            >
                <FormPlusComponent
                    submitUrl="users"
                    confirmation
                    forms={forms}
                    defaultValue={null}
                    onSuccess={() => {
                        setModalForm(false)
                        setRefresh(!refresh)
                    }}
                />
            </ModalRightComponent>
        </>
    )
}
