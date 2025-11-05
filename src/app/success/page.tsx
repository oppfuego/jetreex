import type { Metadata } from "next";

import enExtraSuccess from "@/pageSchemas/extra/onPage";

import PageCreator from "@/components/features/page-creator/PageCreator";
import {metadataFromSchema} from "@/utils/fromSchema";

export async function generateMetadata(): Promise<Metadata> {
    return await metadataFromSchema(enExtraSuccess.meta);
}

export default function Page() {
    return <PageCreator schemaMap={{ sv: enExtraSuccess, en: enExtraSuccess }} />;
}
