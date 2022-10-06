import { faCheckCircle, faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { ButtonComponent, TableComponent, ModalRightComponent, FormPlusComponent, ModalConfirmComponent } from '../'
import { destroy, get } from '../../../pages/api/crud';

export default function TableCrudComponent({
    title,
    urlPath,
    searchColumn,
    exceptColumns,
    exceptSorts,
    exceptForms,
    includeForms,
    customForm,
    changeForm,
}) {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [modalForm, setModalForm] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);
    const [modalDeleteError, setModalDeleteError] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

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
    const [dataSelected, setDataSelected] = useState(false);

    const [forms, setForms] = useState([]);


    useEffect(() => {
        if (customForm) {
            setForms(customForm);
        }
    }, [customForm]);

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

        if (response?.status == 200 || response?.status == 204) {
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
                        if ((!exceptColumns || !exceptColumns.includes(keyName) || !exceptForms.includes(keyName))) {
                            let custom = changeForm[keyName] ? changeForm[keyName] : {};
                            newForms.push({
                                type: custom.type ? custom.type : "text",
                                label: custom.label ? custom.label : keyName.charAt(0).toUpperCase() + keyName.slice(1),
                                name: keyName,
                                placeholder: custom.placeholder ? custom.placeholder : "Please enter " + keyName + "...",
                                options: custom.options ? custom.options : [],
                                validate: custom.validate ? custom.validate : {
                                    required: true,
                                },
                            });
                        }
                    })

                    if (includeForms && includeForms[0]) {
                        newForms = [...newForms, ...includeForms];
                    }

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
                                    onClick={() => {
                                        setModalView(true)
                                        setDataSelected(key)
                                    }}
                                />
                                <ButtonComponent
                                    icon={faEdit}
                                    label={"Edit"}
                                    bg="light__warning"
                                    color="warning"
                                    size={"sm"}
                                    rounded
                                    onClick={() => {
                                        setModalForm(true)
                                        setDataSelected(key)
                                    }}
                                />
                                <ButtonComponent
                                    icon={faTrash}
                                    label={"Delete"}
                                    bg="light__danger"
                                    color="danger"
                                    size={"sm"}
                                    rounded
                                    onClick={() => {
                                        setModalDelete(true)
                                        setDataSelected(key)
                                    }}
                                />
                            </>
                        )
                    })
                })


                setData(newData)
            } else {
                if (!customForm) {
                    let newForms = [];

                    response.data.columns.map((column) => {
                        newForms.push({
                            label: column.charAt(0).toUpperCase() + column.slice(1),
                            name: column,
                            placeholder: "Please enter " + column + "...",
                            validate: {
                                required: true,
                            },
                        });
                    })

                    setForms(newForms)
                }
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

    // useEffect(() => {
    //     if (forms && forms[0] && changeForm) {
    //         let formsUpdate = [];

    //         forms.map((form, key) => {
    //             formsUpdate.push({

    //             })
    //         })
    //     }
    // }, [forms, changeForm]);

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
                title={dataSelected === false ? "Add New " + title : "Edit " + title}
                subTitle={"Enter valid and correct data!"}
                show={modalForm}
                onClose={(e) => {
                    setModalForm(false)
                    setDataSelected(false)
                }}
            >
                <FormPlusComponent
                    submitUrl={dataSelected === false ? urlPath : urlPath + "/" + data?.at(dataSelected).id}
                    method={dataSelected === false ? "post" : "put"}
                    confirmation
                    forms={forms}
                    defaultValue={dataSelected === false ? null : data?.at(dataSelected)}
                    onSuccess={() => {
                        setModalForm(false)
                        setRefresh(!refresh)
                        setDataSelected(false)
                    }}
                />
            </ModalRightComponent>

            <ModalRightComponent
                title={"Detail " + title}
                show={modalView}
                onClose={(e) => {
                    setModalView(false)
                    setDataSelected(false)
                }}
            >
                <div className='flex flex-col gap-4'>
                    {columns.map((column, key) => {
                        return (
                            <div className='flex justify-between gap-4 py-4 border-b' key={key}>
                                <h6 className='text-lg'>{column.label} :</h6>
                                <p className='text-lg font-semibold'>{data?.at(dataSelected) ? data?.at(dataSelected)[column.selector] : "-"}</p>
                            </div>
                        )
                    })}

                </div>
            </ModalRightComponent>

            <ModalConfirmComponent
                title={"Are You Sure Deleted " + title}
                show={modalDelete}
                onClose={(e) => {
                    setModalDelete(false)
                    setDataSelected(false)
                    setDataSelected(false)
                }}
                onSubmit={async () => {
                    setLoadingDelete(true)

                    if (dataSelected !== false) {
                        let response = await destroy(urlPath + "/" + data?.at(dataSelected).id);

                        if (response?.status == 200 || response?.status == 201) {
                            setModalDeleteError(false)
                            setLoadingDelete(false)
                            setModalDeleteSuccess(true)
                            setDataSelected(false)
                            setModalDelete(false)
                        } else {
                            setModalDeleteSuccess(false)
                            setModalDeleteError(true)
                            setLoadingDelete(false)
                            setModalDelete(false)
                        }
                    }

                }}
                submitLoading={loadingDelete}
            >
                <p className='text-center'>Deleted data cannot be recovered!</p>
            </ModalConfirmComponent>

            <ModalConfirmComponent
                show={modalDeleteSuccess}
                onClose={() => {
                    setModalDeleteSuccess(false)
                    setRefresh(!refresh)
                }}
                icon={faCheckCircle}
                title="Request Done"
                bg={"success"}
                color="gray"
                noAction
            >
                <p className='text-center text-lg mb-8 -mt-4'>Successfully deleted data!</p>

                <div className='flex justify-center'>
                    <ButtonComponent
                        label={"Done"}
                        bg="primary"
                        onClick={() => {
                            setModalDeleteSuccess(false)
                            setRefresh(!refresh)
                        }}
                    />
                </div>
            </ModalConfirmComponent>

            <ModalConfirmComponent
                show={modalDeleteError}
                onClose={(e) => setModalDeleteError(false)}
                title="Something Wrong!"
                noAction
            >
                <p className='text-center text-lg mb-8'>Check your connection and try again later!</p>

                <div className='flex justify-center'>
                    <ButtonComponent
                        label={"Yes understand"}
                        bg="primary"
                        onClick={() => setModalDeleteError(false)}
                    />
                </div>
            </ModalConfirmComponent>
        </>
    )
}
