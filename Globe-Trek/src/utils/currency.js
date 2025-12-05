import { COUNTRY_TO_CURRENCY, SUPPORTED_CURRENCIES } from "../data/currencies";

// 1) Given a country name from the geocoding API, get it's currency code
export function getCurrencyCodeForCountry (countryName) {

    if (!countryName) return null;
    return COUNTRY_TO_CURRENCY[countryName] || null;
}

// 2) Return a list of options for a dropdown (user picks their base currency)
export function getCurrencyOptions() {
    return Object.values(SUPPORTED_CURRENCIES);
}

// 3) Given a code ("USD"), get full metadata (label, symbol)
export function getCurrencyMeta(code) {

    if (!code) return null;
    return SUPPORTED_CURRENCIES[code] || {code, label: code, symbol: ""};
}