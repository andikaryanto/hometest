import Config from "./Config";

export default function getParameterValue(activeMenuItem, key) {
    const url = new URL(Config.api_url + activeMenuItem.url);

    // Get the search parameters
    const searchParams = url.searchParams;

    // Extract specific parameters
    const value = searchParams.get(key);

    return value;
}

export function formatCurrency(amount, showSymbol = true, locale = 'id-ID', currency = 'IDR') {
    let options = {
        style: showSymbol ? 'currency': 'decimal',
        currency,
    }

    return new Intl.NumberFormat(locale, {
        ...options,
        minimumFractionDigits: 2
    }).format(amount);
}

export function nanToZeroAmount(amount) {
    return parseFloat(amount) > 0 ? parseFloat(amount) : 0;
}

export function nanToZeroAmountString(amount) {
    return parseFloat(amount) > 0 ? parseFloat(amount) : '0';
}