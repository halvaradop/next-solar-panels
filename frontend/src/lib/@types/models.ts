import { NumberRange } from "@halvaradop/ts-utility-types/utilities"

export enum State {
    ACTIVE,
    INACTIVE,
}

export enum StakeHolderType {
    CLIENT,
    SUPPLIER,
    SERVICE_PROVIDER,
    GOVT_INSTANCE,
}

export enum PointType {
    FIELD,
    ZONE,
    MEASUREMENT,
    POI,
}

export enum ActionType {
    INSERT,
    UPDATE,
    DELETE,
}

export interface DateAt {
    date: Date
    updateAt: Date
}

export interface Coordinate {
    latitude: number
    longitude: number
}

export interface Picture extends DateAt {
    idPicture: number
    designation: string
    pictureFile: string
}

export interface StakeHolder {
    idStakeHolder: string
    name: string
    industry: string
    email: string
    password: string
    fax: string
    www: string
    state: State
    type: StakeHolderType
    address: Address
    picture: Picture
    contactPerson: ContactPerson
}

/**
 * @unstable
 */
export interface PhoneStakeHolder {
    idPhone: number
    number: string
    stakeHolder: StakeHolder
}

export interface Address extends Coordinate {
    idAddress: number
    country?: string
    state?: string
    city?: string
    postbox?: string
    street?: string
    number?: string
    isActive: State
}

export interface Role {
    idRole: number
    name: string
    date: State
}

export interface ContactPerson {
    idContactPerson: string
    firstName: string
    lastName: string
    fax: string
    www: string
    email: string
    password: string
    state: State
    role: Role
}

export interface PhoneContactPerson {
    idPhone: number
    number: string
    contactPerson: ContactPerson
}

export interface Project {
    idProject: string
    state: State
    designation: string
    address: Address
    stakeHolder: StakeHolder
    contactPerson: ContactPerson
}

export interface Field {
    idField: string
    designation: string
    fence: boolean
    connectionEarthingFence: boolean
    externalCurrentInfluence: boolean
    state: State
    address: Address
    project: Project
}

export interface PositionData extends Coordinate {
    idPositionData: string
    pointType: PointType
    pileDesignation: string
    pointDesignation: string
    grounding: boolean
    field: Field
}

export interface PositionMeasurement extends DateAt {
    idPositionMeasurement: string
    designation: string
    potentialVr: number
    potentialVOn: number
    potentialVOff: number
    coatingThickness: number
    materialTrickness: number
    contactPerson: ContactPerson
}

export interface PositionResistivity extends DateAt {
    idPositionResistiviy: string
    designation: string
    depth: number
    orientation: number
    value: number
    measurementInstrument: string
    contactPerson: ContactPerson
}

export interface PositionSoilData extends DateAt, Record<`z${NumberRange<1, 15>}`, number> {
    idPositionSoilData: string
    b0: number
    b1: number
    chlorides: number
    contactPerson: ContactPerson
}

export interface Linkage extends DateAt {
    idLinkage: string
    positionData: PositionData
}

export interface PositionMeasurementOnLinkage {
    idLinkage: string
    idPositionMeasurement: string
}

export interface PositionResistivityOnLinkage {
    idLinkage: string
    idPositionResistiviy: string
}

export interface PositionSoilDataOnLinkage {
    idLinkage: string
    idPositionSoilData: string
}

export interface AuditLog {
    idAudit: number
    tableName: string
    actionType: ActionType
    date: Date
    state: State
    contactPerson: ContactPerson
}

export interface Material {
    idMaterial: number
    materialType: string
    ePotential: number
    valency: number
    molarMass: number
}

export interface Constants {
    idContacts: number
    name: string
    symbol: string
    value: number
    unit: string
}

export interface Zone extends Coordinate {
    idZone: number
    name: string
}

/**
 * TODO: add missing idProject
 */
export interface PvStructure {
    idPvStructure: number
    designation: string
    baseMaterial: number
    baseMatrialThickness: string
    materialTypeLayerOne: string
    thicknessTypeLayerOne: string
    materialTypeLayerTwo: string
    thicknessTypeLayerTwo: string
    foundationTypeTwo: string
    concreteType: string
    foundationElectrical: string
    length: string
}
