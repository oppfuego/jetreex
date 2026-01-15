import { PageSchema } from "@/components/constructor/page-render/types";

const refundPolicySchema: PageSchema = {
    meta: {
        title: "Refund & Return Policy – Jetreex",
        description:
            "Jetreex Refund & Return Policy: refunds for tokens, SEO deliverables, wallet top-ups, and consumer rights.",
        keywords: [
            "refund policy",
            "return policy",
            "jetreex",
            "tokens",
            "seo services",
            "wallet",
            "consumer rights",
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: "Jetreex – Refund & Return Policy",
            description:
                "Transparent refund and return policy for Jetreex token-based SEO services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Refund & Return Policy",
            description: "Effective date: 05 November 2025",
        },

        {
            type: "text",
            title: "1. Summary (customer-facing)",
            bullets: [
                "Refunds are assessed under this Policy and applicable UK consumer law.",
                "Typical processing time: 5–10 business days after approval.",
                "Refunds will not exceed the original amount paid for the relevant Order.",
                "Consumed tokens are non-refundable.",
                "Wallet Credit is account-bound, non-transferable, and not exchangeable for cash.",
                "Promotional or bonus credits are non-refundable.",
                "Submit requests to info@jetreex.co.uk with your account email and order reference.",
                "Accepted currencies: GBP (£), EUR (€), USD ($). Payment methods: Visa, Mastercard.",
                "Reference exchange rate: 100 tokens = £1.00 / €1.17 / $1.29.",
            ],
        },

        {
            type: "text",
            title: "2. Scope and Legal Notice",
            description:
                "This Policy governs refunds and cancellations related to purchases made via jetreex.co.uk, including Wallet top-ups and paid SEO features provided by GROVELEY LIMITED (“Jetreex”, “we”, “us”, “our”). Nothing in this Policy overrides your statutory rights under UK law, including the Consumer Contracts Regulations 2013 and the Consumer Rights Act 2015.",
        },

        {
            type: "text",
            title: "3. Key Definitions",
            bullets: [
                "Wallet / Wallet Credit — pre-paid balance (tokens) used to access Jetreex features; not cash or e-money.",
                "Tokens — units consumed to generate or re-generate Deliverables or access paid features.",
                "Deliverables — SEO outputs such as reports, recommendations, drafts, and analyses.",
                "Order / Transaction — a confirmed Wallet top-up or paid feature purchase.",
                "Abuse/Fraud — activity breaching our Terms (e.g., token farming, automated scraping, unauthorised payments).",
            ],
        },

        {
            type: "text",
            title: "4. General Refund Principles",
            description:
                "4.1. Refund cap. Refunds will not exceed the original amount paid for the relevant Order, net of any non-recoverable payment processor fees where permitted by law.\n\n" +
                "4.2. Digital content performance. If you request immediate performance, you acknowledge losing the statutory right to cancel once performance begins.\n\n" +
                "4.3. Consumed tokens. Tokens used for completed actions are non-returnable.\n\n" +
                "4.4. Accuracy of inputs. Re-running tasks due to changed or inaccurate inputs consumes new tokens and is non-refundable.\n\n" +
                "4.5. Currency. Refunds are issued, where possible, to the original payment method and currency.\n\n" +
                "4.6. Promotions. Promotional or bonus credits are non-refundable.\n\n" +
                "4.7. Abuse/Fraud. We may refuse refunds and suspend accounts where abuse or fraud is reasonably suspected.",
        },

        {
            type: "text",
            title: "5. Wallet Top-Ups (Tokens)",
            description:
                "5.1. Wallet top-ups are advance payments for access to the Service and do not accrue interest.\n\n" +
                "5.2. Unused balances are generally non-withdrawable, but in exceptional good-faith cases, a refund of unused tokens may be approved at our discretion.\n\n" +
                "5.3. If a top-up is partially used, only the unused portion may be considered for a discretionary refund.\n\n" +
                "5.4. Wallet Credit cannot be transferred between users or accounts.",
        },

        {
            type: "text",
            title: "6. Quality Issues & Re-runs",
            description:
                "Where a Deliverable is materially defective due to a technical error, our primary remedy is a re-run at no additional token cost. SEO outcomes are not guaranteed and do not constitute a defect.",
        },

        {
            type: "text",
            title: "7. Chargebacks & Disputes",
            description:
                "Chargebacks are treated as disputes. We may submit usage logs and suspend accounts during investigation. Submitting a support request first often leads to faster resolution.",
        },

        {
            type: "text",
            title: "8. Record Keeping",
            description:
                "We retain records related to refunds and disputes for at least 24 months and up to 6 years where required by law, in line with our Privacy Policy.",
        },

        {
            type: "text",
            title: "9. Changes to this Policy",
            description:
                "We may update this Policy periodically. Material changes will be notified and apply prospectively.",
        },

        {
            type: "text",
            title: "10. Contact Details",
            bullets: [
                "GROVELEY LIMITED",
                "Registered office: Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF",
                "Company number: 16021027",
                "Email: info@jetreex.co.uk",
                "Tel: +44 7537 102710",
            ],
        },
    ],
};

export default refundPolicySchema;
