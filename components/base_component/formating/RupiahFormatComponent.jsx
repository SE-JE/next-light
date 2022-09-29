import React from 'react'

export default function RupiahFormatComponent({ amount }) {
    return (
        <>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)}</>
    )
}
