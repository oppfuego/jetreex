import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME}`,
        description: `Common questions about ${COMPANY_NAME} SEO services — audits, optimisation, link building, local SEO, and reporting.`,
        keywords: [
            "SEO FAQ",
            "SEO audit",
            "link building",
            "local SEO questions",
            "SEO services explanation",
            "how SEO works",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} SEO FAQ`,
            description: `Answers to the most common questions about SEO and how ${COMPANY_NAME} helps your business grow organically.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [

        // 🌟 Highlight Strip — коротко про принципи
        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                { icon: "📈", text: "Real Measurable Growth", subtext: "Rankings, traffic & conversions" },
                { icon: "🔍", text: "Transparent Process", subtext: "Clear reports every month" },
                { icon: "🤝", text: "Human Expertise", subtext: "No automation — only specialists" },
            ],
        },

        // ❓ FAQ section
        {
            type: "faq",
            items: [
                {
                    question: `What is ${COMPANY_NAME}?`,
                    answer: `${COMPANY_NAME} is a full-service SEO agency helping businesses improve their visibility on Google through audits, optimisation, and link building.`,
                },
                {
                    question: "How long does it take to see SEO results?",
                    answer:
                        "SEO is a long-term process. You can expect visible improvements in 4–8 weeks, with consistent growth after 3–6 months depending on your niche.",
                },
                {
                    question: "What’s included in your SEO packages?",
                    answer:
                        "Each package includes technical SEO, on-page optimisation, link building, keyword analysis, and reporting — tailored to your goals and website size.",
                },
                {
                    question: "Do you guarantee top rankings on Google?",
                    answer:
                        "No one can guarantee exact rankings. But we guarantee steady growth, transparent work, and measurable KPIs every month.",
                },
                {
                    question: "What is a technical SEO audit?",
                    answer:
                        "A deep analysis of your site’s structure, speed, indexing, and errors that impact search visibility. We provide a full report with clear fixes.",
                },
                {
                    question: "Do you offer link building services?",
                    answer:
                        "Yes, we build high-quality backlinks from trusted, relevant sources — all manually researched and tracked in monthly reports.",
                },
                {
                    question: "Will I get reports on progress?",
                    answer:
                        "Yes, detailed monthly reports include keyword rankings, traffic stats, backlinks, and completed optimisation tasks.",
                },
                {
                    question: "How do I start working with you?",
                    answer:
                        "Just fill out the contact form or email us at " + COMPANY_EMAIL + ". We’ll analyse your site and prepare a free strategy outline.",
                },
                {
                    question: "Is my website access secure?",
                    answer:
                        `Absolutely. ${COMPANY_NAME} follows strict security and confidentiality standards — your credentials are safe with us.`,
                },
            ],
        },

        {
            type: "custom",
            component: "TextWithButton",
            title: "Still Have Questions?",
            buttonText: "Write to Us",
            buttonLink: "/contact-us",
        },
    ],
};

export default faqSchema;
