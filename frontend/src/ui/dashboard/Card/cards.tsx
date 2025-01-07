"use client"
import { CardProps } from "@/lib/@types/props"
import campo from "@/public/campo.jpg"
import dynamic from "next/dynamic"
import { useEffect } from "react"

import "leaflet/dist/leaflet.css"

// Carga dinámica de componentes (sin SSR)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

import { useMap } from "react-leaflet"
import L from "leaflet"

const RedrawMap = () => {
    const map = useMap()
    useEffect(() => {
        map.invalidateSize()
    }, [map])

    return null
}

const customIcon = new L.Icon({
    iconUrl: campo.src,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
})

export const CardInformation = ({ project }: CardProps) => {
    return (
        <div className="flex flex-col md:flex-row items-start border rounded-lg p-6 bg-gray-50 mx-auto shadow-md">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-black-600">
                    {project?.designation} <span className="text-gray-600 text-base">(Client Ref: {})</span>
                </h2>
                <p className="text-gray-800">
                    <strong>Location:</strong> {project?.address?.city}
                </p>
                <p className="text-gray-800">
                    <strong>Coordinates:</strong> {project?.address?.latitude}, {project?.address?.longitude}
                </p>
                <p className="text-gray-800">
                    <strong>Number of fields:</strong> {project?.field?.length}
                </p>
                <p className="text-gray-800">
                    <strong>Conducted analyses:</strong> {} (above-ground and underground system)
                </p>
                <p className="text-gray-800">
                    <strong>Project manager:</strong> {project?.contactPerson?.firstName} {project?.contactPerson?.lastName}
                </p>
            </div>

            <div className="relative w-64 h-64 overflow-hidden border border-gray-300">
                <MapContainer center={[52.5245, 13.4106]} zoom={5} scrollWheelZoom={false} className="w-full h-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[52.5245, 13.4106]} icon={customIcon}>
                        <Popup>
                            Your Project <br /> Hear
                        </Popup>
                    </Marker>
                    <RedrawMap />
                </MapContainer>
            </div>
        </div>
    )
}
