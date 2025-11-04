import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_NUMBER } from "@/resources/constants";

const contactPage: PageSchema = {
    meta: {
        title: `Contact Us — ${COMPANY_NAME}`,
        description: `Reach out to ${COMPANY_NAME}. Whether you have questions, need support, or want to collaborate — we’re here to help.`,
        keywords: [
            `${COMPANY_NAME} contact`,
            "support",
            "get in touch",
            "customer service",
        ],
        canonical: "/contact-us",
        ogImage: {
            title: `Contact ${COMPANY_NAME}`,
            description: "Your message matters — let’s talk.",
            bg: "#f9fafb",
            color: "#111827",
        },
    },
    blocks: [
        {
            type: "custom",
            component: "ContactForm",
        },
    ],
};

export default contactPage;
