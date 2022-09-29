import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { ButtonComponent, TableComponent } from '../'
import { get } from '../../../pages/api/crud';

export default function Table({ title, urlPath, searchColumn, exceptColumns, exceptSorts, topBar }) {
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRow, setTotalRow] = useState(0);
    const [sort, setSort] = useState({ selector: "created_at", direction: "desc" });
    const [search, setSearch] = useState("");
    const [srcColumn, setSrcColumn] = useState(null);
    const [filter, setFilter] = useState([]);
    const [isNull, setIsNull] = useState(false);

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

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

        if (response.status == 200) {
            let responseData = response.data;
            let newColumns = [];

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

            setColumns(newColumns)
            setData(responseData)

            setTimeout(() => {
                setLoading(false)
            }, 1000);

        }

    }, [paginate, page, sort, search, filter]);

    return (
        <div className='container mx-auto p-8'>
            <h1 className='text-xl font-bold mb-4'>{title}</h1>

            <TableComponent
                topBar={topBar}
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
        </div>
    )
}
