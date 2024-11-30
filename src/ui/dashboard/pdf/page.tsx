"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { MyDocument } from "@/ui/pdf"
import { Button } from "@halvaradop/ui-button"
import { useEffect, useState } from "react"
import { Order } from "@/lib/@types/types"

const DowloandBotton = ({ order }: { order: Order }) => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ? (
        <PDFDownloadLink
            document={
                <MyDocument sampleId={order.sampleId} B0={order.B0} B1={order.B1} zone={order.name} userId={order.userId} />
            }
            fileName="mi_archivo.pdf"
        >
            <Button variant={"ghost"} className="flex gap-2">
                <p>Invoice</p>
            </Button>
        </PDFDownloadLink>
    ) : (
        <p> cargando ...</p>
    )
}

export default DowloandBotton
