
export function getCSSVariable(variableName, element = document.documentElement) {
    const name = variableName.startsWith('--') ? variableName : `--${variableName}`;
    return getComputedStyle(element).getPropertyValue(name).trim();
}


export function setCSSVariable(variableName, value, element = document.documentElement) {
    const name = variableName.startsWith('--') ? variableName : `--${variableName}`;
    element.style.setProperty(name, value);
}


export const colorPalette = {
    // Primary (Rojo)
    primary: {
        100: '--primary-100',
        200: '--primary-200',
        300: '--primary-300',
        400: '--primary-400',
        500: '--primary-500',
        600: '--primary-600',
        700: '--primary-700',
        800: '--primary-800',
        900: '--primary-900'
    },
    // Secondary (Grises)
    secondary: {
        100: '--secondary-100',
        200: '--secondary-200',
        300: '--secondary-300',
        400: '--secondary-400',
        500: '--secondary-500',
        600: '--secondary-600',
        700: '--secondary-700',
        800: '--secondary-800',
        900: '--secondary-900'
    },
    // Green
    green: {
        100: '--green-100',
        200: '--green-200',
        300: '--green-300',
        400: '--green-400',
        500: '--green-500',
        600: '--green-600',
        700: '--green-700',
        800: '--green-800',
        900: '--green-900'
    },
    // Blue
    blue: {
        100: '--blue-100',
        200: '--blue-200',
        300: '--blue-300',
        400: '--blue-400',
        500: '--blue-500',
        600: '--blue-600',
        700: '--blue-700',
        800: '--blue-800',
        900: '--blue-900'
    }
};


export function getColor(palette, shade = 500) {
    if (!colorPalette[palette] || !colorPalette[palette][shade]) {
        console.warn(`Color ${palette}-${shade} no encontrado`);
        return '#000000';
    }
    return getCSSVariable(colorPalette[palette][shade]);
}


export function getPrimaryColor(shade = 500) {
    return getColor('primary', shade);
}


export function getSecondaryColor(shade = 500) {
    return getColor('secondary', shade);
}


export function getSuccessColor(shade = 500) {
    return getColor('green', shade);
}

export function getInfoColor(shade = 500) {
    return getColor('blue', shade);
}

export function applyColor(selector, property, palette, shade = 500) {
    const $element = typeof selector === 'string' ? $(selector) : selector;
    const color = getColor(palette, shade);
    $element.css(property, color);
}

export const colors = {
    primary: {
        100: '#db7f7f',
        200: '#cf6666',
        300: '#cc5553',
        400: '#b92727',
        500: '#a52828',
        600: '#8b2020',
        700: '#701818',
        800: '#561010',
        900: '#3b0808'
    },
    secondary: {
        100: '#ffffff',
        200: '#d9d9d9',
        300: '#bfbfbf',
        400: '#a6a6a6',
        500: '#808080',
        600: '#737373',
        700: '#595959',
        800: '#404040',
        900: '#1a1a1a'
    },
    green: {
        100: '#99d699',
        200: '#73c473',
        300: '#4db34d',
        400: '#439f43',
        500: '#229645',
        600: '#2a7e3b',
        700: '#2e5c32',
        800: '#254725',
        900: '#133117'
    },
    blue: {
        100: '#e6f0ff',
        200: '#b8d1ff',
        300: '#8ab2ff',
        400: '#5c93ff',
        500: '#0d6efd',
        600: '#0b5ed7',
        700: '#1e4b99',
        800: '#153766',
        900: '#0c2340'
    }
};

