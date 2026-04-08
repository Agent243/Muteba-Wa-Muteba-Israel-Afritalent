/**
 * main.js - AfriTalent
 * JavaScript vanilla - Toutes les fonctionnalités obligatoires du projet
 * Version finale - Compatible avec toutes les pages
 */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. DARK MODE / LIGHT MODE + localStorage
    // =============================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            html.classList.remove('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Toggle au clic
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark-mode');
            const newTheme = isDark ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // =============================================
    // 2. NAVBAR DYNAMIQUE AU SCROLL
    // =============================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =============================================
    // 3. BOUTON RETOUR EN HAUT
    // =============================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // 4. COMPTEURS ANIMÉS + ANIMATIONS FADE-IN
    // =============================================
    const counters = document.querySelectorAll('.counter');
    const fadeElements = document.querySelectorAll('section, .bento-card, .card, .category-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Fade-in
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }

            // Compteurs animés
            if (entry.isIntersecting && counters.length > 0) {
                counters.forEach(counter => {
                    if (counter.dataset.animated) return;

                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const increment = Math.ceil(target / 60);

                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            count = target;
                            clearInterval(timer);
                        }
                        counter.textContent = count.toLocaleString('fr-FR');
                    }, 30);

                    counter.dataset.animated = 'true';
                });
            }
        });
    }, { threshold: 0.3 });

    fadeElements.forEach(el => observer.observe(el));
    counters.forEach(el => observer.observe(el));

    // Année dynamique dans le footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =============================================
    // 5. FILTRAGE DYNAMIQUE DES FREELANCES
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                freelanceCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = (card.getAttribute('data-category') === filter) ? 'block' : 'none';
                    }
                });
            });
        });
    }

    // =============================================
    // 6. VALIDATION FORMULAIRE CONTACT
    // =============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

            // Nom
            const nom = document.getElementById('nom');
            if (!nom.value.trim()) {
                nom.nextElementSibling.textContent = 'Le nom est obligatoire';
                isValid = false;
            }

            // Prénom
            const prenom = document.getElementById('prenom');
            if (!prenom.value.trim()) {
                prenom.nextElementSibling.textContent = 'Le prénom est obligatoire';
                isValid = false;
            }

            // Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.nextElementSibling.textContent = 'Veuillez entrer un email valide';
                isValid = false;
            }

            // Sujet
            const sujet = document.getElementById('sujet');
            if (!sujet.value) {
                sujet.nextElementSibling.textContent = 'Veuillez choisir un sujet';
                isValid = false;
            }

            // Message (min 20 caractères)
            const message = document.getElementById('message');
            if (message.value.trim().length < 20) {
                message.nextElementSibling.textContent = 'Le message doit contenir au moins 20 caractères';
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('success-message');
                const btnText = document.getElementById('btn-text');

                btnText.innerHTML = 'Envoi en cours <i class="bi bi-hourglass-split"></i>';

                setTimeout(() => {
                    successMsg.classList.remove('d-none');
                    contactForm.reset();
                    btnText.textContent = 'Envoyer le message';

                    setTimeout(() => {
                        successMsg.classList.add('d-none');
                    }, 6000);
                }, 1200);
            }
        });
    }

    console.log('%c✅ AfriTalent - main.js chargé avec succès !', 'color: #00d4aa; font-weight: bold; font-size: 14px');
});