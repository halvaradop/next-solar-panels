import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const Page = async () => {
    const Companys = await prisma.company.findMany()
    console.log("Companys", Companys)

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Empresas</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white text-left">
                            <th className="py-3 px-6 font-semibold">ID</th>
                            <th className="py-3 px-6 font-semibold">Registro</th>
                            <th className="py-3 px-6 font-semibold">Dirección</th>
                            <th className="py-3 px-6 font-semibold">Nombre</th>
                            <th className="py-3 px-6 font-semibold">Descargas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Companys.map((Company) => (
                            <tr key={Company.ID} className="border-b hover:bg-gray-100 transition">
                                <td className="py-4 px-6">{Company.ID}</td>
                                <td className="py-4 px-6">{Company.RESGISTRION_NUMBER}</td>
                                <td className="py-4 px-6">{Company.ADDRESS}</td>
                                <td className="py-4 px-6">{Company.NAME}</td>
                                <td className="py-4 px-6">
                                    {" "}
                                    <button
                                        onClick={() => {}}
                                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Descargar Archivo
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page
