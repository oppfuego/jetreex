import type { Metadata } from "next";
import enOffPage from "@/pageSchemas/extra/offPage";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enOffPage.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enOffPage, sv: enOffPage }} />;
}
