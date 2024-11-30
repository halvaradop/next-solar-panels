"use client"

import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer"
import logoAche from "@/public/logoAche.png"

Font.register({
    family: "Arial",
    src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.70/fonts/Roboto-Regular.ttf",
})

const styles = StyleSheet.create({
    page: {
        padding: 30,

        fontSize: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 50,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 10,
    },
    log: {
        width: 80,
        height: "auto",
    },
    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 8,
        color: "#666",
    },
    tableCell: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        textAlign: "center",
    },
    text: {
        marginBottom: 10,
    },
})
interface MyDocumentProps {
    sampleId: string
    B0: number
    B1: number
    zone: string
    userId: string
}

export const MyDocument = ({ sampleId, B0, B1, zone, userId }: MyDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View>
                    <Image src={logoAche.src} style={styles.log}></Image>
                </View>
                <View>
                    <Text style={styles.text}>ID: {sampleId}</Text>
                </View>
                <Text>Results {userId}</Text>
                <View>
                    <Text
                        style={{ fontSize: 10 }}
                        render={({ pageNumber, totalPages }) => `
          Page: ${pageNumber} of ${totalPages}`}
                    />
                </View>
            </View>

            <Text style={styles.title}>Resul corrocion</Text>
            <Text style={styles.text}>Validation</Text>

            <Text style={styles.text}>Text okd description</Text>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>B0</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{B0}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>B1</Text>
                    <Text style={styles.tableCell}>{B1}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Zone</Text>
                    <Text style={styles.tableCell}>{zone}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}></Text>
                    <Text style={styles.tableCell}></Text>
                </View>
            </View>
            <Text style={styles.footer}>Ache Enngenirei</Text>
        </Page>
    </Document>
)
