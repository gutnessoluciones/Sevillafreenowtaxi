/* ============================================
   SEVILLA FREENOW TAXI — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Initialize AOS ----
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ---- Animated Counter ----
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        });

        countersAnimated = true;
    };

    // Trigger counters when hero stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${6 + Math.random() * 6}s`;
            particle.style.width = `${2 + Math.random() * 3}px`;
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Booking Form → WhatsApp ----
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        // Set min date to today
        const fechaInput = document.getElementById('fecha');
        if (fechaInput) {
            const today = new Date().toISOString().split('T')[0];
            fechaInput.setAttribute('min', today);
        }

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const servicio = document.getElementById('servicio');
            const servicioText = servicio.options[servicio.selectedIndex].text;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const pasajeros = document.getElementById('pasajeros').value;
            const recogida = document.getElementById('recogida').value.trim();
            const notas = document.getElementById('notas').value.trim();
            const esEmpresa = document.getElementById('empresa').checked;

            // Format date
            const fechaFormatted = fecha ? new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : '';

            // Build WhatsApp message
            let message = `🚖 *NUEVA RESERVA DE TAXI*\n\n`;
            message += `👤 *Nombre:* ${nombre}\n`;
            message += `📞 *Teléfono:* ${telefono}\n`;
            message += `🚗 *Servicio:* ${servicioText}\n`;
            message += `📅 *Fecha:* ${fechaFormatted}\n`;
            message += `🕐 *Hora:* ${hora}\n`;
            message += `👥 *Pasajeros:* ${pasajeros}\n`;

            if (recogida) {
                message += `📍 *Recogida:* ${recogida}\n`;
            }
            if (notas) {
                message += `💬 *Notas:* ${notas}\n`;
            }
            if (esEmpresa) {
                message += `\n🏢 *Cliente Empresa* — Solicita factura y dto. 15%\n`;
            }

            message += `\n_Reserva enviada desde sevillafreenowtaxi.com_`;

            const whatsappUrl = `https://wa.me/34664625403?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Show confirmation
            showNotification('¡Reserva enviada! Se abrirá WhatsApp para confirmar.');
        });
    }

    // ---- Notification Toast ----
    function showNotification(text) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 24px;
            background: rgba(40, 199, 111, 0.95);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.4s ease-out;
            max-width: 320px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: 'Inter', sans-serif;
        `;
        toast.textContent = text;
        document.body.appendChild(toast);

        // Add animation keyframes
        if (!document.getElementById('toastAnim')) {
            const style = document.createElement('style');
            style.id = 'toastAnim';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Logo fallback: show text logo if no image ----
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.addEventListener('error', () => {
            logoImg.style.display = 'none';
            const logoText = logoImg.nextElementSibling;
            if (logoText) logoText.style.display = 'flex';
        });
        // Also check if already failed
        if (logoImg.complete && logoImg.naturalWidth === 0) {
            logoImg.style.display = 'none';
            const logoText = logoImg.nextElementSibling;
            if (logoText) logoText.style.display = 'flex';
        }
    }

});
