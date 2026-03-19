"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    SignUpValues,
    signUpCountryOptions,
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (
                values,
                { setSubmitting }: FormikHelpers<SignUpValues>
            ) => signUpOnSubmit(values, { setSubmitting }, showAlert, router)}
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account"
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "firstName", type: "text", label: "First name", placeholder: "Enter your first name", autoComplete: "given-name" },
                        { name: "lastName", type: "text", label: "Last name", placeholder: "Enter your last name", autoComplete: "family-name" },
                        { name: "dateOfBirth", type: "date", label: "Date of birth", autoComplete: "bday" },
                        { name: "email", type: "email", label: "Email", placeholder: "Enter your email", autoComplete: "email" },
                        { name: "phoneNumber", type: "text", label: "Phone number", placeholder: "Enter your phone number", autoComplete: "tel" },
                        { name: "street", type: "text", label: "Street", placeholder: "Enter your street address", autoComplete: "address-line1" },
                        { name: "city", type: "text", label: "City", placeholder: "Enter your city", autoComplete: "address-level2" },
                        {
                            name: "country",
                            type: "select",
                            label: "Country",
                            placeholder: "Select your country",
                            autoComplete: "country-name",
                            options: signUpCountryOptions,
                        },
                        { name: "postCode", type: "text", label: "Post code", placeholder: "Enter your post code", autoComplete: "postal-code" },
                        { name: "password", type: "password", label: "Password", placeholder: "Create a password", autoComplete: "new-password" },
                        { name: "confirmPassword", type: "password", label: "Confirm password", placeholder: "Confirm your password", autoComplete: "new-password" },
                    ]}
                    submitLabel="Sign Up"
                    showTerms
                    twoColumnLayout
                />
            )}
        </Formik>
    );
}
