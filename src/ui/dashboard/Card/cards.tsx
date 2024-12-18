import { CardProps } from "@/lib/@types/props"
import campo from "@/public/campo.jpg"
import Image from "next/image"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

export const CardInformation = async ({ project }: CardProps) => {
    const fieldsLength = project.field?.length ?? 0
    return (
        <div className="flex flex-col md:flex-row items-start border rounded-lg p-6 bg-gray-50 mx-auto shadow-md">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold text-black-600">
                    {project.designation} <span className="text-gray-600 text-base">(Client Ref: {})</span>
                </h2>
                <p className="text-gray-800">
                    <strong>Location:</strong> {project?.address?.city}
                </p>
                <p className="text-gray-800">
                    <strong>Coordinates:</strong> {project?.address?.latitude}, {project?.address?.longitude}
                </p>
                <p className="text-gray-800">
                    <strong>Number of fields:</strong> {project.field?.length}
                </p>
                <p className="text-gray-800">
                    <strong>Conducted analyses:</strong> {} (above-ground and underground system)
                </p>
                <p className="text-gray-800">
                    <strong>Project manager:</strong> {project.contactPerson?.firstName} {project.contactPerson?.lastName}
                </p>
            </div>

            <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}