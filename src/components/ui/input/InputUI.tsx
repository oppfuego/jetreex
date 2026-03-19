import * as React from "react";
import Input, { InputProps } from "@mui/joy/Input";
import { useField } from "formik";
import styles from "./InputUI.module.scss";

type SelectOption = {
    label: string;
    value: string;
};

type FormikInputProps = InputProps & {
    name: string;
    formik?: boolean;
    options?: SelectOption[];
};

const inputSx = {
    "--Input-radius": "12px",
    minHeight: "48px",
    backgroundColor: "#fff",
    borderColor: "var(--border-color)",
    boxShadow: "none",
    "&:hover": {
        borderColor: "var(--border-color)",
    },
    "&:focus-within": {
        borderColor: "var(--primary-color)",
        boxShadow: "0 0 0 3px rgba(196, 129, 74, 0.18)",
    },
    "& input::placeholder": {
        color: "var(--text-secondary)",
        opacity: 1,
    },
};

const InputUI: React.FC<FormikInputProps> = ({ formik, ...props }) => {
    if (formik && props.name) {
        const [field, meta] = useField(props.name);
        const hasError = !!meta.error && meta.touched;

        if (props.type === "select") {
            const { options = [], placeholder, autoComplete, id } = props;

            return (
                <div className={styles.fieldWrapper}>
                    <select
                        {...field}
                        id={id}
                        autoComplete={autoComplete}
                        className={`${styles.select} ${hasError ? styles.hasError : ""} ${!field.value ? styles.placeholder : ""}`}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {hasError && <div className={styles.errorText}>{meta.error}</div>}
                </div>
            );
        }

        return (
            <div className={styles.fieldWrapper}>
                <Input {...field} {...props} error={hasError} sx={inputSx} />
                {hasError && <div className={styles.errorText}>{meta.error}</div>}
            </div>
        );
    }

    return <Input {...props} sx={inputSx} />;
};

export default InputUI;
