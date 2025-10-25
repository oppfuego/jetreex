import { StyleSheet } from "@react-pdf/renderer";

const biz = {
    primary: "#1F2937",
    accent: "#2563EB",
    secondary: "#F3F4F6",
    border: "#D1D5DB",
    text: "#111827",
    gray: "#6B7280",
    light: "#FFFFFF",
};

export const pdfStylesBusiness = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: biz.light,
        fontFamily: "Helvetica",
        fontSize: 11.5,
        lineHeight: 1.6,
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: biz.accent,
        paddingBottom: 10,
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        color: biz.primary,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    meta: {
        fontSize: 10,
        color: biz.gray,
        marginTop: 5,
    },
    mainHeading: {
        fontSize: 16,
        color: biz.primary,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginTop: 18,
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 14,
        color: biz.accent,
        fontWeight: "bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: biz.border,
        paddingBottom: 4,
        marginTop: 18,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 11.3,
        color: biz.text,
        marginBottom: 6,
        textAlign: "justify",
        lineHeight: 1.65,
    },
    boldParagraph: {
        fontSize: 11.3,
        color: biz.primary,
        fontWeight: "bold",
        marginBottom: 6,
    },
    // Инлайн-жирный для вложенного <Text>
    boldInline: {
        fontWeight: "bold",
        color: biz.primary,
    },
    // Небольшой вертикальный отступ после заголовков
    headingSpacer: {
        height: 6,
    },
    bulletItem: {
        fontSize: 11.3,
        color: biz.text,
        marginBottom: 4,
        paddingLeft: 10,
        lineHeight: 1.5,
        textAlign: "left",
    },
    infoTitle: {
        fontSize: 12,
        color: biz.primary,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 4,
    },
    table: {
        width: "100%",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: biz.border,
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 8,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableHeader: {
        flex: 1,
        backgroundColor: biz.primary,
        color: biz.light,
        fontWeight: "bold",
        fontSize: 10.5,
        padding: 6,
        textAlign: "center",
    },
    tableCell: {
        flex: 1,
        padding: 6,
        fontSize: 10.5,
        color: biz.text,
        borderRightWidth: 1,
        borderRightColor: biz.border,
    },
    footer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: biz.border,
        paddingTop: 10,
    },
    footerText: {
        fontSize: 10,
        color: biz.gray,
        textAlign: "center",
    },
        // ...існуючі стилі Reviewed

        /* === AI Version Styling === */
        pageAI: {
            padding: 50,
            backgroundColor: "#F9FAFB",
            fontFamily: "Helvetica",
        },
        headerAI: {
            backgroundColor: "#111827",
            color: "#F9FAFB",
            borderRadius: 6,
            padding: 20,
            marginBottom: 20,
        },
        titleAI: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#60A5FA",
            textTransform: "uppercase",
        },
        subtitleAI: {
            fontSize: 16,
            color: "#E5E7EB",
            marginTop: 4,
        },
        metaAI: {
            fontSize: 10,
            color: "#9CA3AF",
            marginTop: 2,
        },
        dividerAI: {
            borderBottomWidth: 1.5,
            borderBottomColor: "#60A5FA",
            marginVertical: 12,
        },
        infoCardAI: {
            backgroundColor: "#E0F2FE",
            borderLeftWidth: 4,
            borderLeftColor: "#2563EB",
            padding: 10,
            borderRadius: 6,
            marginBottom: 20,
        },
        infoCardTitle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#1E3A8A",
            marginBottom: 6,
        },
        sectionAI: {
            marginBottom: 20,
        },
        sectionHeaderAI: {
            fontSize: 13,
            color: "#1E40AF",
            fontWeight: "bold",
            textTransform: "uppercase",
            borderBottomWidth: 1,
            borderBottomColor: "#93C5FD",
            paddingBottom: 4,
            marginBottom: 6,
        },
        aiInsightBox: {
            backgroundColor: "#F0F9FF",
            borderColor: "#BFDBFE",
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
        },
        aiInsightLabel: {
            color: "#3B82F6",
            fontSize: 10,
            marginBottom: 3,
        },
        aiHintBox: {
            marginTop: 6,
            backgroundColor: "#DBEAFE",
            padding: 6,
            borderRadius: 4,
        },
        aiHintText: {
            fontSize: 9.5,
            color: "#1E3A8A",
            fontStyle: "italic",
        },
        footerAI: {
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#93C5FD",
            paddingTop: 8,
            textAlign: "center",
        },
        footerTextAI: {
            fontSize: 10,
            color: "#2563EB",
        },
        footerSubAI: {
            fontSize: 8,
            color: "#9CA3AF",
        },

});
