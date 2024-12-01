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
                <MyDocument
                    sampleId={order.sampleId}
                    userId={order.userId}
                    date={order.date}
                    soilType={order.soilType}
                    soilResistivity={order.soilResistivity}
                    moistureContent={order.moistureContent}
                    pHValue={order.pHValue}
                    bufferCapacityPH4_3={order.bufferCapacityPH4_3}
                    bufferCapacityPH7_0={order.bufferCapacityPH7_0}
                    sulfurReducingBacteria={order.sulfurReducingBacteria}
                    zoneId={order.zoneId}
                />
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
