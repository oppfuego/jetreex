import { PageSchema } from "@/components/constructor/page-render/types";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: "Privacy Policy – Jetreex",
        description:
            "Jetreex Privacy Policy: how we collect, use, store and protect personal data under UK GDPR.",
        keywords: [
            "privacy policy",
            "jetreex",
            "gdpr",
            "data protection",
            "seo platform",
            "personal data",
        ],
        canonical: "/privacy-policy",
        ogImage: {
            title: "Jetreex – Privacy Policy",
            description:
                "Privacy practices for Jetreex SEO platform under UK GDPR.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Effective date: 05 November 2025",
        },

        {
            type: "text",
            title: "1. Introduction",
            bullets: [
                "Controller: GROVELEY LIMITED (Company No. 16021027), Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF (“Jetreex”, “we”, “us”, “our”).",
                "Contact: info@jetreex.co.uk",
                "Scope: Applies to users of jetreex.co.uk. The Service is intended for individuals aged 18+.",
            ],
            description:
                "This Privacy Policy explains what personal data we collect, why we use it, how long we retain it, and how you can exercise your rights under UK GDPR when using the Service.",
        },

        {
            type: "text",
            title: "2. Personal Data We Collect",
            description:
                "We collect only data necessary to operate, secure, and improve the Service.",
        },

        {
            type: "text",
            title: "2.1 Data You Provide Directly",
            bullets: [
                "Account details: name, company, role, email, phone, preferred language.",
                "Project inputs: website URLs, markets, keywords, briefs, brand guidelines, attachments.",
                "Optional access grants to Third-Party Tools (e.g., GSC, GA, CMS).",
                "Billing data: billing name/address, VAT details where applicable.",
                "Wallet data: token top-ups, currency, and usage history.",
                "Support communications and feedback.",
            ],
        },

        {
            type: "text",
            title: "2.2 Data Collected Automatically",
            bullets: [
                "Technical data: IP address, device/browser type, OS, timezone, language, session identifiers.",
                "Security telemetry: login attempts, MFA events, abuse/fraud signals.",
                "Usage data: feature usage, task IDs, token deductions, error logs and performance metrics.",
            ],
        },

        {
            type: "text",
            title: "2.3 Data from Third Parties",
            bullets: [
                "Payment processors (transaction references and status).",
                "Connected platforms you authorise (e.g., GSC/GA metrics).",
                "Fraud-prevention and verification providers.",
                "Professional advisers (legal, tax, compliance).",
            ],
        },

        {
            type: "text",
            title: "3. Legal Bases for Processing",
            description:
                "We process personal data under UK GDPR on the following bases:",
        },

        {
            type: "text",
            title: "3.1 Performance of a Contract",
            bullets: [
                "Account creation and management.",
                "Provision of SEO Deliverables and Services.",
                "Wallet operation, payments, invoicing and support.",
            ],
        },

        {
            type: "text",
            title: "3.2 Consent",
            bullets: [
                "Marketing communications where you opt in.",
                "Use of feedback or content for product improvement where you opt in.",
            ],
        },

        {
            type: "text",
            title: "3.3 Legitimate Interests",
            bullets: [
                "Security, fraud detection and abuse prevention.",
                "Service analytics and performance improvement.",
                "Essential non-marketing service communications.",
            ],
        },

        {
            type: "text",
            title: "4. AI & Automated Processing",
            bullets: [
                "Automated processing is used to analyse inputs and generate Deliverables.",
                "Limited profiling may occur for performance or risk detection.",
                "We do not make legally significant decisions solely by automated means.",
            ],
        },

        {
            type: "text",
            title: "5. Sharing & International Transfers",
            description:
                "We share data only where necessary with payment processors, hosting providers, analytics tools, and professional advisers. Where data is transferred outside the UK/EEA, appropriate safeguards (UK adequacy decisions or SCCs) are applied. We do not sell personal data.",
        },

        {
            type: "text",
            title: "6. Retention",
            bullets: [
                "Wallet and transaction records: 24 months to 6 years where required.",
                "Account data: while active and typically up to 24 months after closure.",
                "Security and access logs: 6–24 months.",
            ],
        },

        {
            type: "text",
            title: "7. Your Rights",
            bullets: [
                "Access, rectification, erasure, and restriction.",
                "Data portability.",
                "Object to processing based on legitimate interests.",
                "Withdraw consent at any time.",
            ],
            description:
                "To exercise your rights, contact info@jetreex.co.uk. We aim to respond within one month.",
        },

        {
            type: "text",
            title: "8. Security",
            description:
                "We use encryption, access controls, monitoring, backups, and vendor safeguards to protect personal data. No system is completely secure, but we continuously improve our protections.",
        },

        {
            type: "text",
            title: "9. Changes & Complaints",
            description:
                "We may update this Policy. Material changes will be notified. You may lodge a complaint with the UK Information Commissioner’s Office (ICO) if you are dissatisfied with our response.",
        },
    ],
};

export default privacyPolicySchema;
