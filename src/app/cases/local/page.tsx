import type { Metadata } from "next";
import enLocal from "@/pageSchemas/extra/local";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enLocal.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enLocal, sv: enLocal }} />;
}
