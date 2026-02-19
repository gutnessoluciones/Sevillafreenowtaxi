/* ============================================
   i18n — Sistema de traducción multiidioma
   Sevilla FreeNow Taxi
   ============================================ */

const translations = {
    // ======================== ESPAÑOL ========================
    es: {
        // Nav
        "nav.inicio": "Inicio",
        "nav.servicios": "Servicios",
        "nav.tarifas": "Tarifas",
        "nav.rutas": "Rutas",
        "nav.guias": "Visitas Guiadas",
        "nav.empresas": "Empresas",
        "nav.opiniones": "Opiniones",
        "nav.reservar": "Reservar",

        // Hero
        "hero.badge": "Sevilla · Servicio Premium 24h",
        "hero.title1": "Llega donde",
        "hero.title2": "quieras con",
        "hero.subtitle": "Taxi premium en Sevilla. Aeropuerto, rutas turísticas, traslados interurbanos y paquetería. Siempre puntuales.",
        "hero.cta": "Reservar Viaje",
        "hero.whatsapp": "WhatsApp Directo",
        "hero.trust1": "Precio cerrado",
        "hero.trust2": "Guías EN · IT · PT",
        "hero.trust3": "-15% Empresas",
        "hero.from": "Desde solo",
        "hero.loading": "Cargando...",
        "hero.typed": ["estilo", "confort", "puntualidad", "confianza", "elegancia"],

        // Services
        "services.tag": "Lo que ofrecemos",
        "services.title": "Nuestros",
        "services.title2": "Servicios",
        "services.desc": "Soluciones de transporte completas para cada necesidad en Sevilla y alrededores.",
        "services.urban.title": "Servicios Urbanos",
        "services.urban.desc": "Desplázate por toda Sevilla con la máxima comodidad. Recogida en cualquier punto de la ciudad.",
        "services.urban.price": "Desde <strong>15€</strong>",
        "services.panoramic.badge": "Popular",
        "services.panoramic.title": "Ruta Panorámica",
        "services.panoramic.desc": "Descubre Sevilla en un tour de 2 horas por los lugares más emblemáticos con guía incluido.",
        "services.panoramic.price": "<strong>47€</strong> <span>/ 2 horas</span>",
        "services.train.title": "Estación de Tren",
        "services.train.desc": "Traslados puntuales a Santa Justa. Nunca pierdas tu tren con nuestro servicio fiable.",
        "services.train.price": "Desde <strong>20€</strong>",
        "services.airport.title": "Aeropuerto",
        "services.airport.desc": "Servicio de traslado al aeropuerto de Sevilla San Pablo. Puntualidad garantizada.",
        "services.airport.price": "Desde <strong>29€</strong>",
        "services.parcels.title": "Paquetería",
        "services.parcels.desc": "Envío y recogida de paquetes por toda Sevilla y alrededores. Rápido y seguro.",
        "services.parcels.price": "Desde <strong>20€</strong>",
        "services.waiting.title": "Hora de Espera",
        "services.waiting.desc": "¿Necesitas que te esperemos? Disponemos de tarifa por hora para tu comodidad.",
        "services.waiting.price": "<strong>20€</strong> <span>/ hora</span>",

        // Routes
        "routes.tag": "Destinos",
        "routes.title": "Rutas",
        "routes.title2": "Interurbanas",
        "routes.desc": "Viaja cómodamente a cualquier destino en Andalucía con precios cerrados y sin sorpresas.",
        "routes.note": "¿Tu destino no está en la lista?",
        "routes.note.link": "Consúltanos sin compromiso",

        // Guides
        "guides.multilang": "Guías multilingüe",
        "guides.langs": "Inglés · Italiano · Portugués",
        "guides.tag": "Experiencia única",
        "guides.title": "Visitas",
        "guides.title2": "Guiadas",
        "guides.desc": "Descubre la magia de Sevilla con nuestros guías turísticos profesionales. Ofrecemos tours personalizados en <strong>inglés, italiano y portugués</strong> para que ningún detalle se pierda.",
        "guides.feat1": "Ruta Panorámica en Taxi (2h) — 47€",
        "guides.feat2": "Guías profesionales certificados",
        "guides.feat3": "Tours personalizados a tu medida",
        "guides.feat4": "Colaboración con <a href='http://www.paseandoporsevilla.com/?page_id=90&lang=es' target='_blank'>Paseando por Sevilla</a>",
        "guides.cta": "Reservar Visita Guiada",

        // Business
        "business.tag": "Para profesionales",
        "business.title": "Descuento",
        "business.title2": "Empresas",
        "business.desc": "Si eres empresa o autónomo, disfruta de un <strong>15% de descuento</strong> en todos nuestros servicios con facturación a 30 días.",
        "business.benefit1.title": "15% Descuento",
        "business.benefit1.desc": "En todos los servicios",
        "business.benefit2.title": "Facturación 30 días",
        "business.benefit2.desc": "Pago aplazado para empresas",
        "business.benefit3.title": "Código QR exclusivo",
        "business.benefit3.desc": "Acceso directo para empleados",
        "business.cta": "Solicitar Info Empresas",
        "business.card.label": "Descuento Empresas",
        "business.card.billing": "Facturación 30 días",
        "business.card.code": "Código: EMPRESA15",

        // Pricing
        "pricing.tag": "Transparencia total",
        "pricing.title": "Tabla de",
        "pricing.title2": "Tarifas",
        "pricing.desc": "Precios cerrados, sin sorpresas. Lo que ves es lo que pagas.",
        "pricing.th.service": "Servicio",
        "pricing.th.price": "Precio",
        "pricing.th.business": "Precio Empresa (-15%)",
        "pricing.divider": "Rutas Interurbanas",

        // Booking
        "booking.tag": "Sistema de citas",
        "booking.title": "Reserva tu",
        "booking.title2": "Servicio",
        "booking.desc": "Elige fecha y hora disponible. El sistema bloquea automáticamente las franjas ocupadas.",
        "booking.step1.title": "Tus datos",
        "booking.name": "Nombre",
        "booking.name.ph": "Tu nombre completo",
        "booking.phone": "Teléfono",
        "booking.phone.ph": "+34 600 000 000",
        "booking.service": "Servicio",
        "booking.service.ph": "Selecciona un servicio",
        "booking.service.urban": "Servicios urbanos",
        "booking.service.interurban": "Rutas interurbanas",
        "booking.passengers": "Pasajeros",
        "booking.passenger": "pasajero",
        "booking.passengers_pl": "pasajeros",
        "booking.1pax": "1 pasajero",
        "booking.2pax": "2 pasajeros",
        "booking.3pax": "3 pasajeros",
        "booking.4pax": "4 pasajeros",
        "booking.pickup": "Dirección de recogida",
        "booking.pickup.ph": "Ej: Hotel Alfonso XIII, Calle San Fernando 2",
        "booking.company": "Soy empresa (descuento 15% + factura)",
        "booking.privacy": "Acepto la <a href='/politica-privacidad' target='_blank'>Política de Privacidad</a>",
        "booking.privacy.error": "Debes aceptar la Política de Privacidad para continuar",
        "booking.next": "Elegir Fecha y Hora",
        "booking.step2.title": "Elige fecha y hora",
        "booking.weekdays": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        "booking.slots.title": "Horarios para el",
        "booking.slots.available": "Disponible",
        "booking.slots.booked": "Ocupado",
        "booking.slots.selected": "Seleccionado",
        "booking.back": "Volver",
        "booking.confirm": "Confirmar Reserva",
        "booking.confirmed.title": "¡Reserva Confirmada!",
        "booking.confirmed.subtitle": "Tu cita ha sido registrada correctamente",
        "booking.confirmed.whatsapp": "Confirmar por WhatsApp",
        "booking.confirmed.new": "Nueva Reserva",

        // Option labels in booking select
        "opt.urban": "Servicio Urbano — desde 15€",
        "opt.panoramic": "Ruta Panorámica 2h — 47€",
        "opt.train": "Estación de Tren — desde 20€",
        "opt.airport": "Aeropuerto Sevilla — 29€",
        "opt.parcels": "Paquetería — desde 20€",
        "opt.huelva": "Sevilla → Huelva — 135€",
        "opt.aracena": "Sevilla → Aracena — 115€",
        "opt.jerez": "Sevilla → Jerez — 130€",
        "opt.cadiz": "Sevilla → Cádiz — 180€",
        "opt.cordoba": "Sevilla → Córdoba — 170€",
        "opt.malaga": "Sevilla → Aerop. Málaga — 280€",

        // Reviews
        "reviews.tag": "Opiniones reales",
        "reviews.title": "Lo que dicen nuestros",
        "reviews.title2": "Clientes",
        "reviews.desc": "Tu opinión nos ayuda a seguir mejorando. ¡Déjanos tu valoración!",
        "reviews.count": "valoraciones",
        "reviews.form.title": "Deja tu valoración",
        "reviews.form.name": "Tu nombre",
        "reviews.form.name.ph": "Ej: María García",
        "reviews.form.rating": "Tu puntuación",
        "reviews.form.select": "Selecciona",
        "reviews.form.comment": "Tu comentario",
        "reviews.form.comment.ph": "Cuéntanos tu experiencia...",
        "reviews.form.submit": "Enviar Valoración",
        "reviews.form.success": "¡Gracias por tu valoración! Tu opinión ya es visible.",
        "reviews.loading": "Cargando valoraciones...",

        // Footer
        "footer.desc": "Tu servicio de taxi premium en Sevilla. Comodidad, puntualidad y profesionalidad en cada viaje.",
        "footer.services": "Servicios",
        "footer.routes": "Rutas",
        "footer.contact": "Contacto",
        "footer.rights": "Sevilla FreeNow Taxi. Todos los derechos reservados.",
        "footer.dev": "Desarrollado con",
        "footer.dev2": "por",

        // Pricing table services
        "pt.urban": "Servicios Urbanos",
        "pt.panoramic": "Ruta Panorámica (2h)",
        "pt.train": "Estación de Tren",
        "pt.airport": "Aeropuerto Sevilla",
        "pt.parcels": "Paquetería",
        "pt.waiting": "Hora de Espera",

        // Cookies & Legal
        "cookies.text": "Utilizamos cookies propias y de terceros para el funcionamiento del sitio web y protección contra spam (reCAPTCHA). Puedes consultar más información en nuestra <a href='/politica-cookies'>Política de Cookies</a>.",
        "cookies.accept": "Aceptar",
        "cookies.reject": "Rechazar",
        "footer.legal": "Aviso Legal",
        "footer.privacy": "Política de Privacidad",
        "footer.cookies": "Política de Cookies",
        // FAB buttons
        "fab.call": "Llamar",
        "fab.book": "Reservar",
        // Cookie config
        "cookies.config": "Configurar",
        "cookies.onlyNecessary": "Solo necesarias",
        "cookies.acceptAll": "Aceptar todas",
        "cookies.save": "Guardar preferencias",
        "cookies.necessary": "Estrictamente necesarias",
        "cookies.necessaryDesc": "Esenciales para el funcionamiento del sitio (idioma, sesión, consentimiento). No se pueden desactivar.",
        "cookies.thirdParty": "Terceros (reCAPTCHA)",
        "cookies.thirdPartyDesc": "Google reCAPTCHA para protección anti-spam en el formulario de reservas.",
    },
    en: {
        // Nav
        "nav.servicios": "Services",
        "nav.tarifas": "Rates",
        "nav.rutas": "Routes",
        "nav.guias": "Guided Tours",
        "nav.empresas": "Business",
        "nav.opiniones": "Reviews",
        "nav.reservar": "Book Now",

        // Hero
        "hero.badge": "Seville · Premium Service 24/7",
        "hero.title1": "Get wherever",
        "hero.title2": "you want with",
        "hero.subtitle": "Premium taxi in Seville. Airport, sightseeing routes, intercity transfers and parcel delivery. Always on time.",
        "hero.cta": "Book a Ride",
        "hero.whatsapp": "Direct WhatsApp",
        "hero.trust1": "Fixed prices",
        "hero.trust2": "Guides EN · IT · PT",
        "hero.trust3": "-15% Business",
        "hero.from": "Starting at",
        "hero.loading": "Loading...",
        "hero.typed": ["style", "comfort", "punctuality", "trust", "elegance"],

        // Services
        "services.tag": "What we offer",
        "services.title": "Our",
        "services.title2": "Services",
        "services.desc": "Complete transport solutions for every need in Seville and surroundings.",
        "services.urban.title": "City Rides",
        "services.urban.desc": "Travel across Seville in total comfort. Pick-up from any point in the city.",
        "services.urban.price": "From <strong>€15</strong>",
        "services.panoramic.badge": "Popular",
        "services.panoramic.title": "Panoramic Tour",
        "services.panoramic.desc": "Discover Seville on a 2-hour tour through the most iconic landmarks with a guide included.",
        "services.panoramic.price": "<strong>€47</strong> <span>/ 2 hours</span>",
        "services.train.title": "Train Station",
        "services.train.desc": "Punctual transfers to Santa Justa. Never miss your train with our reliable service.",
        "services.train.price": "From <strong>€20</strong>",
        "services.airport.title": "Airport",
        "services.airport.desc": "Transfer service to Seville San Pablo airport. Punctuality guaranteed.",
        "services.airport.price": "From <strong>€29</strong>",
        "services.parcels.title": "Parcel Delivery",
        "services.parcels.desc": "Pick-up and delivery of parcels across Seville and surroundings. Fast and secure.",
        "services.parcels.price": "From <strong>€20</strong>",
        "services.waiting.title": "Waiting Hour",
        "services.waiting.desc": "Need us to wait? We offer an hourly rate for your convenience.",
        "services.waiting.price": "<strong>€20</strong> <span>/ hour</span>",

        // Routes
        "routes.tag": "Destinations",
        "routes.title": "Intercity",
        "routes.title2": "Routes",
        "routes.desc": "Travel comfortably to any destination in Andalusia with fixed prices and no surprises.",
        "routes.note": "Your destination isn't listed?",
        "routes.note.link": "Contact us, no obligation",

        // Guides
        "guides.multilang": "Multilingual guides",
        "guides.langs": "English · Italian · Portuguese",
        "guides.tag": "Unique experience",
        "guides.title": "Guided",
        "guides.title2": "Tours",
        "guides.desc": "Discover the magic of Seville with our professional tour guides. We offer personalised tours in <strong>English, Italian and Portuguese</strong> so no detail is missed.",
        "guides.feat1": "Panoramic Taxi Tour (2h) — €47",
        "guides.feat2": "Certified professional guides",
        "guides.feat3": "Tailor-made tours",
        "guides.feat4": "In partnership with <a href='http://www.paseandoporsevilla.com/?page_id=90&lang=es' target='_blank'>Paseando por Sevilla</a>",
        "guides.cta": "Book a Guided Tour",

        // Business
        "business.tag": "For professionals",
        "business.title": "Business",
        "business.title2": "Discount",
        "business.desc": "If you are a company or freelancer, enjoy a <strong>15% discount</strong> on all our services with 30-day invoicing.",
        "business.benefit1.title": "15% Discount",
        "business.benefit1.desc": "On all services",
        "business.benefit2.title": "30-Day Invoicing",
        "business.benefit2.desc": "Deferred payment for businesses",
        "business.benefit3.title": "Exclusive QR Code",
        "business.benefit3.desc": "Direct access for employees",
        "business.cta": "Request Business Info",
        "business.card.label": "Business Discount",
        "business.card.billing": "30-Day Invoicing",
        "business.card.code": "Code: EMPRESA15",

        // Pricing
        "pricing.tag": "Full transparency",
        "pricing.title": "Rate",
        "pricing.title2": "Table",
        "pricing.desc": "Fixed prices, no surprises. What you see is what you pay.",
        "pricing.th.service": "Service",
        "pricing.th.price": "Price",
        "pricing.th.business": "Business Price (-15%)",
        "pricing.divider": "Intercity Routes",

        // Booking
        "booking.tag": "Booking system",
        "booking.title": "Book your",
        "booking.title2": "Service",
        "booking.desc": "Choose an available date and time. The system automatically blocks occupied time slots.",
        "booking.step1.title": "Your details",
        "booking.name": "Name",
        "booking.name.ph": "Your full name",
        "booking.phone": "Phone",
        "booking.phone.ph": "+34 600 000 000",
        "booking.service": "Service",
        "booking.service.ph": "Select a service",
        "booking.service.urban": "City services",
        "booking.service.interurban": "Intercity routes",
        "booking.passengers": "Passengers",
        "booking.passenger": "passenger",
        "booking.passengers_pl": "passengers",
        "booking.1pax": "1 passenger",
        "booking.2pax": "2 passengers",
        "booking.3pax": "3 passengers",
        "booking.4pax": "4 passengers",
        "booking.pickup": "Pick-up address",
        "booking.pickup.ph": "E.g.: Hotel Alfonso XIII, Calle San Fernando 2",
        "booking.company": "I'm a business (15% discount + invoice)",
        "booking.privacy": "I accept the <a href='/politica-privacidad' target='_blank'>Privacy Policy</a>",
        "booking.privacy.error": "You must accept the Privacy Policy to continue",
        "booking.next": "Choose Date & Time",
        "booking.step2.title": "Choose date & time",
        "booking.weekdays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "booking.slots.title": "Available times for",
        "booking.slots.available": "Available",
        "booking.slots.booked": "Booked",
        "booking.slots.selected": "Selected",
        "booking.back": "Back",
        "booking.confirm": "Confirm Booking",
        "booking.confirmed.title": "Booking Confirmed!",
        "booking.confirmed.subtitle": "Your appointment has been successfully registered",
        "booking.confirmed.whatsapp": "Confirm via WhatsApp",
        "booking.confirmed.new": "New Booking",

        "opt.urban": "City Ride — from €15",
        "opt.panoramic": "Panoramic Tour 2h — €47",
        "opt.train": "Train Station — from €20",
        "opt.airport": "Seville Airport — €29",
        "opt.parcels": "Parcel Delivery — from €20",
        "opt.huelva": "Seville → Huelva — €135",
        "opt.aracena": "Seville → Aracena — €115",
        "opt.jerez": "Seville → Jerez — €130",
        "opt.cadiz": "Seville → Cádiz — €180",
        "opt.cordoba": "Seville → Córdoba — €170",
        "opt.malaga": "Seville → Málaga Airport — €280",

        // Reviews
        "reviews.tag": "Real reviews",
        "reviews.title": "What our",
        "reviews.title2": "Clients say",
        "reviews.desc": "Your opinion helps us keep improving. Leave us a review!",
        "reviews.count": "reviews",
        "reviews.form.title": "Leave a review",
        "reviews.form.name": "Your name",
        "reviews.form.name.ph": "E.g.: John Smith",
        "reviews.form.rating": "Your rating",
        "reviews.form.select": "Select",
        "reviews.form.comment": "Your comment",
        "reviews.form.comment.ph": "Tell us about your experience...",
        "reviews.form.submit": "Submit Review",
        "reviews.form.success": "Thank you for your review! Your opinion is now visible.",
        "reviews.loading": "Loading reviews...",

        // Footer
        "footer.desc": "Your premium taxi service in Seville. Comfort, punctuality and professionalism on every journey.",
        "footer.services": "Services",
        "footer.routes": "Routes",
        "footer.contact": "Contact",
        "footer.rights": "Sevilla FreeNow Taxi. All rights reserved.",
        "footer.dev": "Developed with",
        "footer.dev2": "by",

        "pt.urban": "City Rides",
        "pt.panoramic": "Panoramic Tour (2h)",
        "pt.train": "Train Station",
        "pt.airport": "Seville Airport",
        "pt.parcels": "Parcel Delivery",
        "pt.waiting": "Waiting Hour",

        // Cookies & Legal
        "cookies.text": "We use our own and third-party cookies for the operation of this website and spam protection (reCAPTCHA). You can find more information in our <a href='/politica-cookies'>Cookie Policy</a>.",
        "cookies.accept": "Accept",
        "cookies.reject": "Decline",
        "footer.legal": "Legal Notice",
        "footer.privacy": "Privacy Policy",
        "footer.cookies": "Cookie Policy",
        // FAB buttons
        "fab.call": "Call",
        "fab.book": "Book Now",
        // Cookie config
        "cookies.config": "Set up",
        "cookies.onlyNecessary": "Only necessary",
        "cookies.acceptAll": "Accept all",
        "cookies.save": "Save preferences",
        "cookies.necessary": "Strictly necessary",
        "cookies.necessaryDesc": "Essential for the website to function (language, session, consent). Cannot be disabled.",
        "cookies.thirdParty": "Third-party (reCAPTCHA)",
        "cookies.thirdPartyDesc": "Google reCAPTCHA for spam protection on the booking form.",
    },
    fr: {
        // Nav
        "nav.inicio": "Accueil",
        "nav.servicios": "Services",
        "nav.tarifas": "Tarifs",
        "nav.rutas": "Itinéraires",
        "nav.guias": "Visites Guidées",
        "nav.empresas": "Entreprises",
        "nav.opiniones": "Avis",
        "nav.reservar": "Réserver",

        // Hero
        "hero.badge": "Séville · Service Premium 24h/24",
        "hero.title1": "Arrivez où",
        "hero.title2": "vous voulez avec",
        "hero.subtitle": "Taxi premium à Séville. Aéroport, circuits touristiques, transferts interurbains et livraison de colis. Toujours ponctuels.",
        "hero.cta": "Réserver un trajet",
        "hero.whatsapp": "WhatsApp Direct",
        "hero.trust1": "Prix fixe",
        "hero.trust2": "Guides EN · IT · PT",
        "hero.trust3": "-15% Entreprises",
        "hero.from": "À partir de",
        "hero.loading": "Chargement...",
        "hero.typed": ["style", "confort", "ponctualité", "confiance", "élégance"],

        // Services
        "services.tag": "Ce que nous offrons",
        "services.title": "Nos",
        "services.title2": "Services",
        "services.desc": "Solutions de transport complètes pour chaque besoin à Séville et ses environs.",
        "services.urban.title": "Courses Urbaines",
        "services.urban.desc": "Déplacez-vous dans tout Séville avec un confort maximal. Prise en charge partout en ville.",
        "services.urban.price": "À partir de <strong>15€</strong>",
        "services.panoramic.badge": "Populaire",
        "services.panoramic.title": "Circuit Panoramique",
        "services.panoramic.desc": "Découvrez Séville lors d'un tour de 2 heures des sites les plus emblématiques avec guide inclus.",
        "services.panoramic.price": "<strong>47€</strong> <span>/ 2 heures</span>",
        "services.train.title": "Gare Ferroviaire",
        "services.train.desc": "Transferts ponctuels vers Santa Justa. Ne ratez jamais votre train grâce à notre service fiable.",
        "services.train.price": "À partir de <strong>20€</strong>",
        "services.airport.title": "Aéroport",
        "services.airport.desc": "Service de transfert vers l'aéroport de Séville San Pablo. Ponctualité garantie.",
        "services.airport.price": "À partir de <strong>29€</strong>",
        "services.parcels.title": "Livraison de Colis",
        "services.parcels.desc": "Envoi et collecte de colis dans Séville et ses environs. Rapide et sécurisé.",
        "services.parcels.price": "À partir de <strong>20€</strong>",
        "services.waiting.title": "Heure d'Attente",
        "services.waiting.desc": "Besoin qu'on vous attende ? Nous proposons un tarif horaire pour votre commodité.",
        "services.waiting.price": "<strong>20€</strong> <span>/ heure</span>",

        // Routes
        "routes.tag": "Destinations",
        "routes.title": "Itinéraires",
        "routes.title2": "Interurbains",
        "routes.desc": "Voyagez confortablement vers n'importe quelle destination en Andalousie à prix fixe et sans surprise.",
        "routes.note": "Votre destination n'est pas dans la liste ?",
        "routes.note.link": "Contactez-nous sans engagement",

        // Guides
        "guides.multilang": "Guides multilingues",
        "guides.langs": "Anglais · Italien · Portugais",
        "guides.tag": "Expérience unique",
        "guides.title": "Visites",
        "guides.title2": "Guidées",
        "guides.desc": "Découvrez la magie de Séville avec nos guides touristiques professionnels. Nous proposons des visites personnalisées en <strong>anglais, italien et portugais</strong> pour ne manquer aucun détail.",
        "guides.feat1": "Circuit Panoramique en Taxi (2h) — 47€",
        "guides.feat2": "Guides professionnels certifiés",
        "guides.feat3": "Visites sur mesure",
        "guides.feat4": "En collaboration avec <a href='http://www.paseandoporsevilla.com/?page_id=90&lang=es' target='_blank'>Paseando por Sevilla</a>",
        "guides.cta": "Réserver une Visite Guidée",

        // Business
        "business.tag": "Pour les professionnels",
        "business.title": "Réduction",
        "business.title2": "Entreprises",
        "business.desc": "Si vous êtes une entreprise ou un indépendant, bénéficiez de <strong>15% de réduction</strong> sur tous nos services avec facturation à 30 jours.",
        "business.benefit1.title": "15% de Réduction",
        "business.benefit1.desc": "Sur tous les services",
        "business.benefit2.title": "Facturation 30 jours",
        "business.benefit2.desc": "Paiement différé pour entreprises",
        "business.benefit3.title": "Code QR exclusif",
        "business.benefit3.desc": "Accès direct pour les employés",
        "business.cta": "Demander Info Entreprises",
        "business.card.label": "Réduction Entreprises",
        "business.card.billing": "Facturation 30 jours",
        "business.card.code": "Code : EMPRESA15",

        // Pricing
        "pricing.tag": "Transparence totale",
        "pricing.title": "Grille",
        "pricing.title2": "Tarifaire",
        "pricing.desc": "Prix fixes, sans surprise. Ce que vous voyez est ce que vous payez.",
        "pricing.th.service": "Service",
        "pricing.th.price": "Prix",
        "pricing.th.business": "Prix Entreprise (-15%)",
        "pricing.divider": "Itinéraires Interurbains",

        // Booking
        "booking.tag": "Système de réservation",
        "booking.title": "Réservez votre",
        "booking.title2": "Service",
        "booking.desc": "Choisissez une date et un horaire disponible. Le système bloque automatiquement les créneaux occupés.",
        "booking.step1.title": "Vos coordonnées",
        "booking.name": "Nom",
        "booking.name.ph": "Votre nom complet",
        "booking.phone": "Téléphone",
        "booking.phone.ph": "+34 600 000 000",
        "booking.service": "Service",
        "booking.service.ph": "Sélectionnez un service",
        "booking.service.urban": "Services urbains",
        "booking.service.interurban": "Itinéraires interurbains",
        "booking.passengers": "Passagers",
        "booking.passenger": "passager",
        "booking.passengers_pl": "passagers",
        "booking.1pax": "1 passager",
        "booking.2pax": "2 passagers",
        "booking.3pax": "3 passagers",
        "booking.4pax": "4 passagers",
        "booking.pickup": "Adresse de prise en charge",
        "booking.pickup.ph": "Ex : Hôtel Alfonso XIII, Calle San Fernando 2",
        "booking.company": "Je suis une entreprise (réduction 15% + facture)",
        "booking.privacy": "J'accepte la <a href='/politica-privacidad' target='_blank'>Politique de Confidentialité</a>",
        "booking.privacy.error": "Vous devez accepter la Politique de Confidentialité pour continuer",
        "booking.next": "Choisir Date et Heure",
        "booking.step2.title": "Choisissez date et heure",
        "booking.weekdays": ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        "booking.slots.title": "Horaires pour le",
        "booking.slots.available": "Disponible",
        "booking.slots.booked": "Occupé",
        "booking.slots.selected": "Sélectionné",
        "booking.back": "Retour",
        "booking.confirm": "Confirmer la Réservation",
        "booking.confirmed.title": "Réservation Confirmée !",
        "booking.confirmed.subtitle": "Votre rendez-vous a été enregistré avec succès",
        "booking.confirmed.whatsapp": "Confirmer par WhatsApp",
        "booking.confirmed.new": "Nouvelle Réservation",

        "opt.urban": "Course Urbaine — à partir de 15€",
        "opt.panoramic": "Circuit Panoramique 2h — 47€",
        "opt.train": "Gare Ferroviaire — à partir de 20€",
        "opt.airport": "Aéroport de Séville — 29€",
        "opt.parcels": "Livraison de Colis — à partir de 20€",
        "opt.huelva": "Séville → Huelva — 135€",
        "opt.aracena": "Séville → Aracena — 115€",
        "opt.jerez": "Séville → Jerez — 130€",
        "opt.cadiz": "Séville → Cadix — 180€",
        "opt.cordoba": "Séville → Cordoue — 170€",
        "opt.malaga": "Séville → Aérop. Málaga — 280€",

        // Reviews
        "reviews.tag": "Avis authentiques",
        "reviews.title": "Ce que disent nos",
        "reviews.title2": "Clients",
        "reviews.desc": "Votre avis nous aide à nous améliorer. Laissez-nous votre évaluation !",
        "reviews.count": "avis",
        "reviews.form.title": "Laissez votre avis",
        "reviews.form.name": "Votre nom",
        "reviews.form.name.ph": "Ex : Marie Dupont",
        "reviews.form.rating": "Votre note",
        "reviews.form.select": "Sélectionner",
        "reviews.form.comment": "Votre commentaire",
        "reviews.form.comment.ph": "Racontez-nous votre expérience...",
        "reviews.form.submit": "Envoyer l'Avis",
        "reviews.form.success": "Merci pour votre avis ! Votre opinion est déjà visible.",
        "reviews.loading": "Chargement des avis...",

        // Footer
        "footer.desc": "Votre service de taxi premium à Séville. Confort, ponctualité et professionnalisme à chaque trajet.",
        "footer.services": "Services",
        "footer.routes": "Itinéraires",
        "footer.contact": "Contact",
        "footer.rights": "Sevilla FreeNow Taxi. Tous droits réservés.",
        "footer.dev": "Développé avec",
        "footer.dev2": "par",

        "pt.urban": "Courses Urbaines",
        "pt.panoramic": "Circuit Panoramique (2h)",
        "pt.train": "Gare Ferroviaire",
        "pt.airport": "Aéroport de Séville",
        "pt.parcels": "Livraison de Colis",
        "pt.waiting": "Heure d'Attente",

        // Cookies & Legal
        "cookies.text": "Nous utilisons des cookies propres et de tiers pour le fonctionnement du site web et la protection anti-spam (reCAPTCHA). Consultez notre <a href='/politica-cookies'>Politique de Cookies</a> pour plus d'informations.",
        "cookies.accept": "Accepter",
        "cookies.reject": "Refuser",
        "footer.legal": "Mentions Légales",
        "footer.privacy": "Politique de Confidentialité",
        "footer.cookies": "Politique de Cookies",
        // FAB buttons
        "fab.call": "Appeler",
        "fab.book": "Réserver",
        // Cookie config
        "cookies.config": "Configurer",
        "cookies.onlyNecessary": "Nécessaires uniquement",
        "cookies.acceptAll": "Tout accepter",
        "cookies.save": "Enregistrer les préférences",
        "cookies.necessary": "Strictement nécessaires",
        "cookies.necessaryDesc": "Essentiels au fonctionnement du site (langue, session, consentement). Ne peuvent pas être désactivés.",
        "cookies.thirdParty": "Tiers (reCAPTCHA)",
        "cookies.thirdPartyDesc": "Google reCAPTCHA pour la protection anti-spam du formulaire de réservation.",
    }
};

// ============ i18n ENGINE ============
const STORAGE_KEY = 'sevillataxi_lang';
const DEFAULT_LANG = 'es';
const SUPPORTED_LANGS = ['es', 'en', 'fr'];

const FLAG_EMOJIS = {
    es: '🇪🇸',
    en: '🇬🇧',
    fr: '🇫🇷'
};

const LANG_NAMES = {
    es: 'Español',
    en: 'English',
    fr: 'Français'
};

function detectBrowserLang() {
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('en')) return 'en';
    return 'es'; // Default to Spanish
}

function getSavedLang() {
    return localStorage.getItem(STORAGE_KEY);
}

function saveLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
}

function getCurrentLang() {
    return getSavedLang() || detectBrowserLang();
}

function t(key) {
    const lang = getCurrentLang();
    return translations[lang]?.[key] || translations.es[key] || key;
}

function applyTranslations() {
    const lang = getCurrentLang();
    const dict = translations[lang] || translations.es;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = dict[key];
        if (value !== undefined) {
            el.innerHTML = value;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        const value = dict[key];
        if (value !== undefined) {
            el.placeholder = value;
        }
    });

    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const value = dict[key];
        if (value !== undefined) {
            el.setAttribute('aria-label', value);
        }
    });

    // Translate optgroup labels
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
        const key = el.getAttribute('data-i18n-label');
        const value = dict[key];
        if (value !== undefined) {
            el.label = value;
        }
    });

    // Update typed words for hero
    if (window.updateTypedWords) {
        window.updateTypedWords(dict["hero.typed"] || translations.es["hero.typed"]);
    }

    // Update weekday labels in calendar
    const weekdayEls = document.querySelectorAll('.calendar-weekdays span');
    const weekdays = dict["booking.weekdays"] || translations.es["booking.weekdays"];
    weekdayEls.forEach((el, i) => {
        if (weekdays[i]) el.textContent = weekdays[i];
    });

    // Update language selector button
    const currentBtn = document.getElementById('currentLangBtn');
    if (currentBtn) {
        currentBtn.innerHTML = `${FLAG_EMOJIS[lang]} <span>${lang.toUpperCase()}</span>`;
    }

    // Mark active language in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
}

function switchLang(newLang) {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    saveLang(newLang);
    applyTranslations();

    // Close dropdown
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('open');
}

// ============ LANGUAGE SELECTOR UI ============
function createLangSelector() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;

    const selector = document.createElement('div');
    selector.className = 'lang-selector';
    selector.innerHTML = `
        <button class="lang-current" id="currentLangBtn" aria-label="Change language">
            ${FLAG_EMOJIS[getCurrentLang()]} <span>${getCurrentLang().toUpperCase()}</span>
        </button>
        <div class="lang-dropdown" id="langDropdown">
            ${SUPPORTED_LANGS.map(l => `
                <button class="lang-option ${l === getCurrentLang() ? 'active' : ''}" data-lang="${l}">
                    <span class="lang-flag">${FLAG_EMOJIS[l]}</span>
                    <span class="lang-name">${LANG_NAMES[l]}</span>
                </button>
            `).join('')}
        </div>
    `;

    // Insert before the toggle
    const toggle = nav.querySelector('.nav-toggle');
    nav.insertBefore(selector, toggle);

    // Toggle dropdown
    const btn = document.getElementById('currentLangBtn');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('langDropdown').classList.toggle('open');
    });

    // Language option clicks
    selector.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            switchLang(opt.dataset.lang);
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        document.getElementById('langDropdown')?.classList.remove('open');
    });
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    createLangSelector();
    applyTranslations();
});

// Export for other modules
window.i18n = { t, getCurrentLang, switchLang, applyTranslations, translations };
