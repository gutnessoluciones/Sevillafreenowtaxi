/* ============================================
   REVIEWS SYSTEM — Firebase + Realtime
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs,
    query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============ FIREBASE ============
const firebaseConfig = {
    apiKey: "AIzaSyBJyiX3KAO4fafUiICQM1Kip8MAvB-fivw",
    authDomain: "sevillafreenowtaxi.firebaseapp.com",
    projectId: "sevillafreenowtaxi",
    storageBucket: "sevillafreenowtaxi.firebasestorage.app",
    messagingSenderId: "464928210314",
    appId: "1:464928210314:web:c810eec9fa6362a7689c73"
};

let app, db;
try {
    // Use existing app if already initialized by booking.js
    const { getApps } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const apps = getApps();
    app = apps.length ? apps[0] : initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.warn("Reviews: Firebase init error", e);
}

// ============ STATE ============
let allReviews = [];
let selectedRating = 0;

const STAR_LABELS = ['', 'Malo', 'Regular', 'Bien', 'Muy bien', 'Excelente'];
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// ============ STAR SELECTOR ============
const starSelector = document.getElementById('starSelector');
const starLabel = document.getElementById('starLabel');

if (starSelector) {
    const stars = starSelector.querySelectorAll('i[data-value]');

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.dataset.value);
            highlightStars(stars, val);
            starLabel.textContent = STAR_LABELS[val];
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.value);
            highlightStars(stars, selectedRating);
            starLabel.textContent = STAR_LABELS[selectedRating];
            starLabel.style.color = 'var(--primary)';
        });
    });

    starSelector.addEventListener('mouseleave', () => {
        highlightStars(stars, selectedRating);
        starLabel.textContent = selectedRating ? STAR_LABELS[selectedRating] : 'Selecciona';
        starLabel.style.color = selectedRating ? 'var(--primary)' : '';
    });
}

function highlightStars(stars, rating) {
    stars.forEach(s => {
        const v = parseInt(s.dataset.value);
        s.className = v <= rating ? 'fas fa-star' : 'far fa-star';
    });
}

// ============ FORM SUBMIT ============
const reviewForm = document.getElementById('reviewForm');
const reviewSuccess = document.getElementById('reviewSuccess');

reviewForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('rv-nombre').value.trim();
    const comentario = document.getElementById('rv-comentario').value.trim();

    if (!nombre || !comentario) return;
    if (selectedRating === 0) {
        starLabel.textContent = '¡Selecciona estrellas!';
        starLabel.style.color = 'var(--admin-red, #ef4444)';
        starSelector?.classList.add('shake');
        setTimeout(() => starSelector?.classList.remove('shake'), 500);
        return;
    }

    const submitBtn = document.getElementById('submitReview');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    const review = {
        name: nombre,
        rating: selectedRating,
        comment: comentario,
        timestamp: Date.now(),
        createdAt: new Date().toISOString()
    };

    try {
        if (db) {
            await addDoc(collection(db, "reviews"), review);
        }
        // Show success
        reviewForm.style.display = 'none';
        reviewSuccess.style.display = 'flex';
    } catch (err) {
        console.error("Error guardando review:", err);
        alert("Error al enviar. Inténtalo de nuevo.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Valoración';
    }
});

// ============ REALTIME REVIEWS ============
function startReviewsListener() {
    if (!db) return;

    const loadingEl = document.getElementById('reviewsLoading');

    try {
        onSnapshot(collection(db, "reviews"), (snapshot) => {
            allReviews = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            allReviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

            if (loadingEl) loadingEl.style.display = 'none';
            renderReviewsSummary();
            renderReviewsList();
            updateHeroRating();
        });
    } catch (e) {
        console.error("Error listener reviews:", e);
        if (loadingEl) loadingEl.style.display = 'none';
    }
}

// ============ RENDER SUMMARY ============
function renderReviewsSummary() {
    const avgEl = document.getElementById('avgRating');
    const starsEl = document.getElementById('avgStars');
    const countEl = document.getElementById('avgCount');

    if (!avgEl || allReviews.length === 0) {
        if (avgEl) avgEl.textContent = '—';
        if (countEl) countEl.textContent = '0 valoraciones';
        return;
    }

    const total = allReviews.length;
    const sum = allReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    const avg = sum / total;

    avgEl.textContent = avg.toFixed(1);
    countEl.textContent = `${total} valoracion${total !== 1 ? 'es' : ''}`;

    // Stars
    if (starsEl) {
        starsEl.innerHTML = renderStarsHTML(avg);
    }

    // Rating bars
    for (let s = 1; s <= 5; s++) {
        const count = allReviews.filter(r => r.rating === s).length;
        const pct = total > 0 ? (count / total) * 100 : 0;
        const fill = document.querySelector(`.bar-fill[data-star="${s}"]`);
        const countSpan = document.querySelector(`.bar-count[data-star="${s}"]`);
        if (fill) fill.style.width = `${pct}%`;
        if (countSpan) countSpan.textContent = count;
    }
}

function renderStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            html += '<i class="fas fa-star"></i>';
        } else if (rating >= i - 0.5) {
            html += '<i class="fas fa-star-half-alt"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    return html;
}

// ============ RENDER REVIEWS LIST ============
function renderReviewsList() {
    const container = document.getElementById('reviewsList');
    if (!container) return;

    if (allReviews.length === 0) {
        container.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-comments"></i>
                <p>Aún no hay valoraciones. ¡Sé el primero!</p>
            </div>`;
        return;
    }

    container.innerHTML = allReviews.map(r => {
        const date = r.timestamp ? formatReviewDate(r.timestamp) : '';
        const initial = (r.name || 'A').charAt(0).toUpperCase();
        const colors = ['#D4A824', '#3b82f6', '#22c55e', '#a855f7', '#ef4444', '#f59e0b'];
        const color = colors[initial.charCodeAt(0) % colors.length];

        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar" style="background:${color}">${initial}</div>
                    <div class="review-meta">
                        <strong>${escapeHtml(r.name || 'Anónimo')}</strong>
                        <span class="review-date">${date}</span>
                    </div>
                    <div class="review-stars">${renderStarsHTML(r.rating || 0)}</div>
                </div>
                <p class="review-text">${escapeHtml(r.comment || '')}</p>
            </div>`;
    }).join('');
}

function formatReviewDate(ts) {
    const d = new Date(ts);
    return `${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============ HERO RATING WIDGET ============
function updateHeroRating() {
    const textEl = document.getElementById('heroRatingText');
    const widget = document.getElementById('heroRatingWidget');
    if (!textEl) return;

    if (allReviews.length === 0) {
        textEl.textContent = 'Deja tu opinión';
        if (widget) widget.style.cursor = 'pointer';
        widget?.addEventListener('click', () => {
            document.getElementById('valoraciones')?.scrollIntoView({ behavior: 'smooth' });
        });
        return;
    }

    const sum = allReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    const avg = (sum / allReviews.length).toFixed(1);
    textEl.textContent = `${avg}/5 · ${allReviews.length} opiniones`;

    // Update hero stars to match actual avg
    const starsContainer = widget?.querySelector('.stars');
    if (starsContainer) {
        starsContainer.innerHTML = renderStarsHTML(parseFloat(avg));
    }

    if (widget) {
        widget.style.cursor = 'pointer';
        widget.onclick = () => {
            document.getElementById('valoraciones')?.scrollIntoView({ behavior: 'smooth' });
        };
    }
}

// ============ INIT ============
startReviewsListener();
