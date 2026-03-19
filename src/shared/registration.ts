export type RegistrationCountryOption = {
    label: string;
    value: string;
};

export type RegistrationPayload = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    password: string;
};

const RESTRICTED_COUNTRIES = new Set([
    "Afghanistan",
    "Belarus",
    "Central African Republic",
    "Cuba",
    "Democratic Republic of the Congo",
    "Haiti",
    "Iran",
    "Iraq",
    "Mali",
    "Myanmar",
    "North Korea",
    "Russia",
    "Somalia",
    "South Sudan",
    "Sudan",
    "Syria",
    "Venezuela",
    "Yemen",
    "Zimbabwe",
]);

const COUNTRY_NAMES = [
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Costa Rica",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of the Congo",
    "Romania",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Vietnam",
    "Zambia",
];

export const registrationCountryOptions: RegistrationCountryOption[] = COUNTRY_NAMES
    .filter((country) => !RESTRICTED_COUNTRIES.has(country))
    .map((country) => ({ label: country, value: country }));

const allowedRegistrationCountries = new Set(
    registrationCountryOptions.map((country) => country.value)
);

export function trimRegistrationValue(value: unknown): string {
    return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function normalizeRegistrationEmail(value: unknown): string {
    return trimRegistrationValue(value).toLowerCase();
}

export function isAllowedRegistrationCountry(value: unknown): boolean {
    return allowedRegistrationCountries.has(trimRegistrationValue(value));
}

export function isValidDateOfBirth(value: unknown): boolean {
    const normalized = trimRegistrationValue(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return false;

    const parsed = new Date(`${normalized}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) return false;

    return parsed.toISOString().slice(0, 10) === normalized;
}

export function sanitizeRegistrationPayload(
    payload: Partial<RegistrationPayload>
): RegistrationPayload {
    return {
        firstName: trimRegistrationValue(payload.firstName),
        lastName: trimRegistrationValue(payload.lastName),
        email: normalizeRegistrationEmail(payload.email),
        phoneNumber: trimRegistrationValue(payload.phoneNumber),
        dateOfBirth: trimRegistrationValue(payload.dateOfBirth),
        street: trimRegistrationValue(payload.street),
        city: trimRegistrationValue(payload.city),
        country: trimRegistrationValue(payload.country),
        postCode: trimRegistrationValue(payload.postCode),
        password: typeof payload.password === "string" ? payload.password : "",
    };
}
