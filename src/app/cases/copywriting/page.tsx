import type { Metadata } from "next";
import enCopywriting from "@/pageSchemas/extra/copywriting";
import PageCreator from "@/components/features/page-creator/PageCreator";
import { metadataFromSchema } from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enCopywriting.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ en: enCopywriting, sv: enCopywriting }} />;
}
