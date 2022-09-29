import React from 'react'
import { TablePlusComponent } from '../components/base_component'

export default function TablePlus() {
    return (
        <>
            <TablePlusComponent
                title="Title of Table"
                urlPath={"users"}
                exceptColumns={['id']}
                exceptSorts={['name', 'gender', 'date']}
            />
        </>
    )
}
