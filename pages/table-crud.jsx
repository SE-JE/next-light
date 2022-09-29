import React from 'react'
import { TableCrudComponent } from '../components/base_component'

export default function TableCrud() {
    return (
        <>
            <TableCrudComponent
                title="Data User"
                urlPath={"users"}
                exceptColumns={['id']}
                exceptSorts={['name', 'gender', 'date']}
            />
        </>
    )
}
