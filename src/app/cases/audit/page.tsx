import type { Metadata } from "next";
import enAudit from "@/pageSchemas/extra/audit";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enAudit.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enAudit, sv: enAudit }} />;
}
