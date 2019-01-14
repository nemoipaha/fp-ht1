const capitalizeString = string => string[0].toUpperCase() + string.slice(1);

const prependUSDCurrencySymbol = price => `$${price}`;

module.exports = {
    capitalizeString,
    prependUSDCurrencySymbol
};