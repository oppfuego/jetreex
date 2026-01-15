import { PageSchema } from "@/components/constructor/page-render/types";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: "Cookies Policy – Jetreex",
        description:
            "Jetreex Cookies Policy: how we use cookies, storage technologies, consent, and your choices.",
        keywords: [
            "cookies policy",
            "jetreex",
            "gdpr",
            "cookies",
            "consent",
            "tracking",
        ],
        canonical: "/cookies-policy",
        ogImage: {
            title: "Jetreex – Cookies Policy",
            description:
                "Cookies and consent policy for Jetreex SEO platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },

    blocks: [
        {
            type: "text",
            title: "Cookies Policy",
            description: "Effective date: 05 November 2025",
        },

        {
            type: "text",
            title: "1. Overview",
            description:
                "This Cookies Policy explains how Jetreex (“we”, “us”, “our”) uses cookies and similar technologies on jetreex.co.uk and related services. It complements our Privacy Policy.",
            bullets: [
                "Controller: GROVELEY LIMITED (Company No. 16021027), Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF.",
                "Contact: info@jetreex.co.uk",
                "Context: Cookies support secure sessions, preferences, analytics, and (if enabled) marketing.",
            ],
        },

        {
            type: "text",
            title: "2. What Are Cookies?",
            description:
                "Cookies are small files placed on your device that help websites function, remember preferences, measure performance, and—where you consent—enable analytics and marketing.",
        },

        {
            type: "text",
            title: "3. Categories We Use",
            bullets: [
                "Necessary / Essential – core functionality and security (no consent required).",
                "Functional – preferences such as language or saved project inputs.",
                "Performance / Analytics – usage and error metrics.",
                "Marketing / Advertising – attribution and remarketing (only with consent).",
                "Security / Anti-abuse – fraud and bot detection.",
            ],
        },

        {
            type: "text",
            title: "4. Typical Cookies & Storage Keys",
            bullets: [
                "session_id — authenticated session (Necessary, Session).",
                "csrf_token — CSRF protection (Necessary, Session).",
                "consent_state — stores consent choices (6–12 months).",
                "ui_prefs — language and theme (Functional, ~6 months).",
                "perf_metrics — performance logs (Analytics, 1–3 months).",
                "campaign_src — campaign attribution (Marketing, 1–3 months).",
                "jetreex_wallet_hint (localStorage) — remembers wallet view (Functional).",
                "jetreex_project_prefs (localStorage) — saves project inputs (Functional).",
            ],
        },

        {
            type: "text",
            title: "5. Consent & Lawful Basis",
            description:
                "Essential cookies do not require consent. Non-essential cookies are set only after consent, unless a strictly configured analytics tool relies on legitimate interests. Details appear in our Privacy Policy.",
        },

        {
            type: "text",
            title: "6. Managing Consent",
            bullets: [
                "Use the cookie banner or Cookie Settings link to manage preferences.",
                "Withdraw consent at any time; changes apply going forward.",
                "Clearing cookies or using private browsing may affect functionality.",
            ],
        },

        {
            type: "text",
            title: "7. Changes & Contact",
            description:
                "We may update this Policy. Material changes will be notified. For questions, contact info@jetreex.co.uk.",
        },
    ],
};

export default cookiePolicyEn;
