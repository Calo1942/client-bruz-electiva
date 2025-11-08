// animations.js
const animateElement = ($element, duration, properties) => {
    $element.animate(properties, { duration });
};

export const animateIn = (selector, duration = 400, delay = 0) => {
    const $element = $(selector);
    setTimeout(() => {
        $element.css({ opacity: 0, transform: 'translateY(20px)' }).show();
        animateElement($element, duration, { opacity: 1 });
        $element.css('transform', 'translateY(0)');
    }, delay);
};

export const pulse = (selector) => {
    const $element = $(selector);
    $element.css('animation', 'pulse 0.6s ease-in-out 2');
};