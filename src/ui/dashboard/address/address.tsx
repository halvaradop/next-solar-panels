import { InternalAddressProps } from "@/lib/@types/props"
import { Label, Input } from "@/ui/common/form/index"
import { Message } from "@/ui/common/message"

export const InternalAddress = ({ state }: InternalAddressProps) => {
    return (
        <>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Country
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="country"
                    />
                    <Message schema={state.schema} index="country" />
                </Label>
                <Label className="w-full">
                    State/Province
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="state"
                    />
                    <Message schema={state.schema} index="state" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    City
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="city"
                    />
                    <Message schema={state.schema} index="city" />
                </Label>
                <Label className="w-full">
                    Postbox
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
                    <Message schema={state.schema} index="postbox" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Street
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="street"
                    />
                    <Message schema={state.schema} index="street" />
                </Label>
                <Label className="w-full">
                    Street Number
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="postbox"
                    />
                    <Message schema={state.schema} index="postbox" />
                </Label>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-5">
                <Label className="w-full">
                    Latitude
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="latitude"
                    />
                    <Message schema={state.schema} index="latitude" />
                </Label>
                <Label className="w-full">
                    Longitude
                    <Input
                        className="focus-within:border-black focus-within:ring-black"
                        fullWidth
                        variant="outline"
                        name="longitude"
                    />
                    <Message schema={state.schema} index="longitude" />
                </Label>
            </div>
        </>
    )
}
