const mocks = [
    {
        id: 1,
        material: "Steel",
        corrosion: "20",
        temperature: "25",
        humidity: "60",
        zone: "1",
        date: "03-11-2024",
    },
    {
        id: 2,
        material: "Steel",
        corrosion: "50",
        temperature: "30",
        humidity: "55",
        zone: "1",
        date: "03-11-2024",
    },
]

export const Table = () => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="w-[10%] p-3 text-start font-medium sm:w-[10%]">Id</th>
                    <th className="w-[30%] p-3 text-start font-medium sm:w-[30%] md:w-[20%]">Material</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium sm:table-cell base:w-[15%]">Corrosion</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium md:table-cell base:w-[15%]">Temperature</th>
                    <th className="hidden w-[15%] p-3 text-start font-medium base:table-cell">Humidity</th>
                    <th className="w-[15%] p-3 text-start font-medium sm:w-[15%] md:w-[10%]">Zone</th>
                    <th className="w-[25%] p-3 text-start font-medium sm:w-[25%] md:w-[20%] base:w-[15]">Date</th>
                </tr>
            </thead>
            <tbody>
                {mocks.map(({ id, material, corrosion, temperature, humidity, zone, date }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={id}>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">{id}</td>
                        <td className="w-[40%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[30%]">
                            {material}
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">
                            {corrosion}%
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t md:table-cell">
                            {temperature}°C
                        </td>
                        <td className="hidden w-[10%] p-3 whitespace-nowrap text-ellipsis border-t base:table-cell">
                            {humidity}%
                        </td>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[15%]">
                            {zone}
                        </td>
                        <td className="w-[30%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[25%]">
                            {date}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
