import type { Metadata } from "next";
import enOnPage from "@/pageSchemas/extra/onPage";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enOnPage.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enOnPage, sv: enOnPage }} />;
}
