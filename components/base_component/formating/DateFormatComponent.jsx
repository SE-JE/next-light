import moment from 'moment'
import React from 'react'

export default function DateFormatComponent({ date, format }) {
    return (
        <>{moment(date).locale("id").format(format ? format : "DD MMM YYYY")}</>
    )
}
