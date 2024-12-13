"use client"
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer"
import { MyDocumentProps } from "@/lib/@types/props"

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
        lineHeight: 1.5,
        backgroundColor: "#f0f2f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "3px solid #0056b3",
        paddingBottom: 10,
        marginBottom: 20,
    },
    logo: {
        width: 90,
        height: "auto",
    },
    headerInfo: {
        flex: 1,
        marginLeft: 15,
    },
    headerText: {
        fontSize: 10,
        marginBottom: 5,
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 12,
        color: "#0056b3",
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        textTransform: "uppercase",
        color: "#333",
        borderBottom: "2px solid #0056b3",
        paddingBottom: 5,
    },
    table: {
        width: "100%",
        marginTop: 20,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#d6d6d6",
        borderStyle: "solid",
    },
    tableHeader: {
        backgroundColor: "#0056b3",
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        flex: 1,
    },
    tableCell: {
        borderWidth: 1,
        borderColor: "#d6d6d6",
        padding: 10,
        textAlign: "left",
        fontSize: 10,
        flex: 1,
    },
    tableRowInformation: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    tableCellInformation: {
        padding: 8,
        fontSize: 10,
        flex: 1,
        color: "#555",
    },
    boldCell: {
        fontWeight: "bold",
        fontSize: 10,
        color: "#0056b3",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        textAlign: "center",
        fontSize: 8,
        color: "#777",
    },
    suggestionBox: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#fff3cd",
        borderRadius: 5,
        border: "1px solid #ffeeba",
    },
    suggestionTitle: {
        fontWeight: "bold",
        fontSize: 12,
        color: "#856404",
        marginBottom: 5,
    },
    suggestionText: {
        fontSize: 10,
        color: "#856404",
    },
})

const splitValue = (value: string | undefined): string[] => {
    const safeValue = value ?? ""
    return safeValue.split("|")
}

export const MyDocument = ({ positionSoilData }: MyDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <Text style={[styles.headerText, styles.boldText]}>ACHE ENGINEERING GmbH</Text>
                    <Text style={styles.headerText}>Renewable energy - Corrosion protection</Text>
                    <Text style={styles.headerText}>Röntgenweg 9, D-35638 Leun</Text>
                    <Text style={styles.headerText}>Phone: +49 (0) 6473-92254-0</Text>
                    <Text style={styles.headerText}>Fax: +49 (0) 6473-92254-29</Text>
                </View>
                <View>
                    <Text style={styles.headerText}>Fecha: {new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Result Of Sample</Text>

            <View style={styles.table}>
                <View style={styles.tableRowInformation}>
                    <Text style={[styles.tableCellInformation, styles.boldCell]}>User</Text>
                    <Text style={styles.tableCellInformation}>
                        {positionSoilData.contactPerson?.firstName} {positionSoilData.contactPerson?.lastName}
                    </Text>
                    <Text style={[styles.tableCellInformation, styles.boldCell]}>Zone</Text>
                    <Text style={styles.tableCellInformation}>{positionSoilData.field?.designation}</Text>
                </View>
                <View style={styles.tableRowInformation}>
                    <Text style={[styles.tableCellInformation, styles.boldCell]}>Coordinates</Text>
                    <Text style={styles.tableCellInformation}>
                        {positionSoilData.field?.latitude} , {positionSoilData.field?.longitude}
                    </Text>
                    <Text style={[styles.tableCellInformation, styles.boldCell]}>Fecha</Text>
                    <Text style={styles.tableCellInformation}>{positionSoilData.date.toString()}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Results</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Steel Loss Rates</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Galvanising Loss Rates</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.steel)[0]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.steel)[1]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.galvanising)[0]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.galvanising)[1]}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Soil Class and Corrosion Analysis</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Soil Class</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Corrosion Stress</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Pitting Corrosion Probability</Text>
                    <Text style={[styles.tableCell, styles.tableHeader]}>Surface Corrosion Probability</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.valueb0)[0]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.valueb0)[1]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.valueb1)[0]}</Text>
                    <Text style={styles.tableCell}>{splitValue(positionSoilData.valueb1)[1]}</Text>
                </View>
            </View>

            <View style={styles.suggestionBox}>
                <Text style={styles.suggestionTitle}>Tip/Warning</Text>
                <Text style={styles.suggestionText}>{positionSoilData.message}</Text>
            </View>

            <Text style={styles.footer}>Responsable del análisis: Nombre del responsable</Text>
        </Page>
    </Document>
)
