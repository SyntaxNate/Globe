//src/data/currencies.js

export const COUNTRY_TO_CURRENCY = {
    "United States": "USD",
    "Canada": "CAD",
    "United Kingdom": "GBP",
    "France": "EUR",
    "Germany": "EUR",
    "Italy": "EUR",
    "Spain": "EUR",
    "Japan": "JPY",
    "China": "CNY",
    "Mexico": "MXN",
    "Australia": "AUD",
    "Brazil": "BRL",
    "Switzerland": "CHF",
    "India": "INR",
    "South Africa": "ZAR",
};


//human-friendly metadata for a currency picker
export const SUPPORTED_CURRENCIES = {
  USD: { code: "USD", label: "US Dollar", symbol: "$" },
  EUR: { code: "EUR", label: "Euro", symbol: "€" },
  GBP: { code: "GBP", label: "British Pound", symbol: "£" },
  JPY: { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  CAD: { code: "CAD", label: "Canadian Dollar", symbol: "$" },
  AUD: { code: "AUD", label: "Australian Dollar", symbol: "$" },
  MXN: { code: "MXN", label: "Mexican Peso", symbol: "$" },
  // etc…
};