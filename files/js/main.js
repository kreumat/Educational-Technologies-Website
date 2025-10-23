document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(html => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = html;
                }
                // Special handling for header to attach nav toggle event listener
                if (selector === '#header-placeholder') {
                    setupNavToggle();
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    // Load header and footer
    loadComponent('#header-placeholder', '/files/component/header.html');
    loadComponent('#footer-placeholder', '/files/component/footer.html');

    // Setup navigation toggle for mobile
    const setupNavToggle = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navUl = document.querySelector('.main-nav ul');

        if (navToggle && navUl) {
            navToggle.addEventListener('click', () => {
                navUl.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    };
});
