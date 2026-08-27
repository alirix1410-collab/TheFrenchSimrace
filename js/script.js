document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU MENU TIROIR (SIDEBAR & OVERLAY) ---
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleSidebar() {
        if (!sidebar || !overlay) return;
        sidebar.classList.toggle('collapsed');
        overlay.classList.toggle('hidden');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    // --- GESTION DE LA NAVIGATION (CHANGEMENT DE VUE) ---
    const triggers = document.querySelectorAll('[data-target]');
    const views = document.querySelectorAll('.view');
    const navItems = document.querySelectorAll('.nav-item');

    triggers.forEach(trigger => {
        if (!trigger) return;
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');

            // Masquer toutes les vues
            views.forEach(view => {
                view.classList.remove('active');
            });

            // Afficher la vue ciblée
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.classList.add('active');
            } else {
                return;
            }

            // Mettre à jour l'état du menu
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            const activeNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
            if (activeNav) {
                activeNav.classList.add('active');
            }

            // Smooth scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Fermer le menu sur mobile
            if (sidebar && !sidebar.classList.contains('collapsed')) {
                toggleSidebar();
            }
        });
    });

    // (Effet de parallaxe désactivé : il provoquait un décalage gênant de l'image au scroll)

    // Ajouter une animation au survol des cartes
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });

    // Animation des éléments en vue
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .banner, .timeline-item, .intro-section, .experience-banner, .feature-pill').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Ajouter du feedback tactile sur les boutons
    const buttons = document.querySelectorAll('.btn-discord, [data-target]');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });

    // Ajouter un tooltip sur hover pour plus d'UX
    const clickables = document.querySelectorAll('.clickable');
    clickables.forEach(el => {
        if (!el.querySelector('.banner-content')) {
            el.addEventListener('mouseenter', function() {
                if (!this.getAttribute('title')) {
                    this.setAttribute('title', 'Cliquez pour découvrir plus');
                }
            });
        }
    });

    // Gestion du redimensionnement pour ajuster le layout
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
            overlay.classList.add('hidden');
        }
    });
});