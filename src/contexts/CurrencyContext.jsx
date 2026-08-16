import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

// Mock exchange rates (base USD)
const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150.25,
    PKR: 278.50, // Pakistan Rupee
    // Add more as needed
};

const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PKR: 'Rs',
};

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('PKR');

    // Load from local storage
    useEffect(() => {
        const storedCurrency = localStorage.getItem('app_currency');
        if (storedCurrency && exchangeRates[storedCurrency]) {
            setCurrency(storedCurrency);
        }
    }, []);

    const updateCurrency = (newCurrency) => {
        if (exchangeRates[newCurrency]) {
            setCurrency(newCurrency);
            localStorage.setItem('app_currency', newCurrency);
        }
    };

    // const formatCurrency = (amount) => {
    //     const rate = exchangeRates[currency];
    //     const converted = amount * rate;

    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: currency,
    //         currencyDisplay: 'symbol',
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2
    //     }).format(converted);
    // };






    const formatCurrency = (amount) => {
    if (currency === 'PKR') {
        return `Rs ${Number(amount || 0).toLocaleString('en-PK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    const rate = exchangeRates[currency];
    const converted = Number(amount || 0) * rate;

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(converted);
};




    const value = {
        currency,
        updateCurrency,
        formatCurrency,
        availableCurrencies: Object.keys(exchangeRates)
    };

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export default CurrencyContext;
