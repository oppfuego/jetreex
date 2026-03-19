import { AlertColor } from "@mui/material/Alert";
import {
    isAllowedRegistrationCountry,
    isValidDateOfBirth,
    normalizeRegistrationEmail,
    registrationCountryOptions,
    sanitizeRegistrationPayload,
    trimRegistrationValue,
} from "@/shared/registration";

export type SignUpValues = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

export const signUpInitialValues: SignUpValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

export const signUpValidation = (values: SignUpValues) => {
    const errors: SignUpErrors = {};
    const sanitized = sanitizeRegistrationPayload(values);

    if (!sanitized.firstName) errors.firstName = "Required";
    if (!sanitized.lastName) errors.lastName = "Required";
    if (!sanitized.dateOfBirth) errors.dateOfBirth = "Required";
    else if (!isValidDateOfBirth(sanitized.dateOfBirth)) errors.dateOfBirth = "Enter a valid date";

    if (!sanitized.email) errors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeRegistrationEmail(values.email))) {
        errors.email = "Enter a valid email";
    }

    if (!sanitized.phoneNumber) errors.phoneNumber = "Required";
    if (!sanitized.street) errors.street = "Required";
    if (!sanitized.city) errors.city = "Required";
    if (!sanitized.country) errors.country = "Required";
    else if (!isAllowedRegistrationCountry(sanitized.country)) {
        errors.country = "Select a valid country";
    }
    if (!sanitized.postCode) errors.postCode = "Required";
    if (!values.password) errors.password = "Required";
    if (!values.confirmPassword) errors.confirmPassword = "Required";
    else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords must match";
    }
    if (!values.terms) errors.terms = "You must agree to the Terms and Conditions";

    return errors;
};

export const signUpOnSubmit = async (
    values: SignUpValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const payload = {
            ...sanitizeRegistrationPayload(values),
            confirmPassword: trimRegistrationValue(values.confirmPassword),
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful!", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: any) {
        showAlert(e?.message || "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};

export const signUpCountryOptions = registrationCountryOptions;
