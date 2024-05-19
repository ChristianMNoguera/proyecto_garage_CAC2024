// active-nav.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav__link');
    const currentUrl = window.location.href;

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
});