import '@testing-library/jest-dom/extend-expect';

const originalError = console.error;

console.error = (message) => {
    // Suppress i18next initialization warnings in tests
    if (message && typeof message === 'string' && message.includes('Some problems with i18next')) {
        return;
    }
    originalError(message);
};