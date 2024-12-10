"use client"
import { useEffect, useState, useActionState } from "react"
import { useSession } from "next-auth/react"
import { Project } from "@prisma/client"
import { addFieldsAction } from "@/lib/actions"
import { AddFieldsActionState } from "@/lib/@types/types"
import { addAddressAction } from "@/lib/actions"
import { AddAddressActionState } from "@/lib/@types/types"
import { getProjectsByStakeHolderId, getContactPersonById } from "@/lib/services"
import { Button, Form, InputList, Label, SelectGeneric } from "@/ui/common/form-elements"
import { merge } from "@/lib/utils"
import dataJson from "@/lib/data.json"

const { fieldInputs } = dataJson
const { addressInputs } = dataJson

export const AddField = () => {
    const { data: session } = useSession()
    const [projects, setProjects] = useState<Project[]>([])
    const [state, formAction] = useActionState(addFieldsAction, {
        message: "",
        isSuccess: false,
    } as AddFieldsActionState)

    const [checkboxes, setCheckboxes] = useState({
        fence: false,
        connectionEarthingFence: false,
        externalCurrentInfluence: false,
    })

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

            const {
                stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
            } = await getContactPersonById(userId)
            const response = await getProjectsByStakeHolderId(idStakeHolder)
            setProjects(response)
        }
        fetchProjects()
    }, [])

    const handleCheckboxChange = (name: keyof typeof checkboxes) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxes((prev) => ({
            ...prev,
            [name]: e.target.checked,
        }))
    }

    const formDataWithCheckboxes = () => {
        const formData = new FormData()

        Object.entries(checkboxes).forEach(([key, value]) => {
            formData.append(key, value ? "1" : "0")
        })

        return formData
    }

    return (
        <Form
            className="w-full min-h-main pt-4"
            action={(formData) => {
                const combinedFormData = new FormData()
                for (const [key, value] of formData.entries()) {
                    combinedFormData.append(key, value)
                }
                for (const [key, value] of formDataWithCheckboxes().entries()) {
                    combinedFormData.append(key, value)
                }
                return formAction(combinedFormData)
            }}
        >
            <h1 className="text-2xl font-bold text-center">Add Fields</h1>
            <InputList inputs={fieldInputs} state={state} />

            <Label className="w-full text-neutral-700" size="sm">
                Fence
                <input
                    type="checkbox"
                    checked={checkboxes.fence}
                    onChange={handleCheckboxChange("fence")}
                    name="fence"
                    value={checkboxes.fence ? "1" : "0"}
                    className="ml-2"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Connection Earthing Fence
                <input
                    type="checkbox"
                    checked={checkboxes.connectionEarthingFence}
                    onChange={handleCheckboxChange("connectionEarthingFence")}
                    name="connectionEarthingFence"
                    value={checkboxes.connectionEarthingFence ? "1" : "0"}
                    className="ml-2"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                External Current Influence
                <input
                    type="checkbox"
                    checked={checkboxes.externalCurrentInfluence}
                    onChange={handleCheckboxChange("externalCurrentInfluence")}
                    name="externalCurrentInfluence"
                    value={checkboxes.externalCurrentInfluence ? "1" : "0"}
                    className="ml-2"
                />
            </Label>
            <Label className="w-full text-neutral-700" size="sm">
                Project
                <SelectGeneric values={projects} id="designation" value="idProject" name="project" />
            </Label>
            <InputList inputs={addressInputs} state={state} />
            <Button className="mt-6" fullWidth>
                Add
            </Button>
            {state.message && (
                <div
                    className={merge("mt-4 p-2 text-green-700 rounded bg-green-100 ", {
                        "text-red-700 bg-red-100": !state.isSuccess,
                    })}
                >
                    {state.message}
                </div>
            )}
        </Form>
    )
}
