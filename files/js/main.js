document.addEventListener('DOMContentLoaded', () => {
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

    // Initialize the navigation toggle
    setupNavToggle();
});
