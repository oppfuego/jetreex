import type { Metadata } from "next";
import enAnalysis from "@/pageSchemas/extra/analysis";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enAnalysis.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enAnalysis, sv: enAnalysis }} />;
}
