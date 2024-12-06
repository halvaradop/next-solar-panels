"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { MyDocument } from "@/ui/pdf"
import { Button } from "@halvaradop/ui-button"
import { useEffect, useState } from "react"
import { Order } from "@/lib/@types/types"

const DowloandButton = ({ samples }: { samples: Order }) => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    const generateFileName = () => {
        const currentDate = new Date().toLocaleDateString().replace(/\//g, "-")
        const customerName = samples.zone?.project?.name.replace(/\s+/g, "_")
        const clientName = samples.zone?.project?.clients?.name.replace(/\s+/g, "_")
        // const orderId = samples.orderId;
        return `${customerName}_${currentDate}.pdf`
    }
    return isClient ? (
        <PDFDownloadLink document={<MyDocument samples={samples} />} fileName={generateFileName()}>
            <Button variant={"ghost"} className="flex gap-2">
                <p>Invoice</p>
            </Button>
        </PDFDownloadLink>
    ) : (
        <p> cargando ...</p>
    )
}

export default DowloandButton
