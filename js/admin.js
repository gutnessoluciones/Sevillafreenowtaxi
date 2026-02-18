/* ============================================
   ADMIN PANEL JS — Sevilla FreeNow Taxi
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore, collection, getDocs, doc, updateDoc,
    query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============ FIREBASE ============
const firebaseConfig = {
    apiKey: "AIzaSyBJyiX3KAO4fafUiICQM1Kip8MAvB-fivw",
    authDomain: "sevillafreenowtaxi.firebaseapp.com",
    projectId: "sevillafreenowtaxi",
    storageBucket: "sevillafreenowtaxi.firebasestorage.app",
    messagingSenderId: "464928210314",
    appId: "1:464928210314:web:c810eec9fa6362a7689c73",
    measurementId: "G-223LPQ7XKM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============ AUTH (simple) ============
const ADMIN_PASS = "taxi2026";   // Contraseña del admin — cambiar en producción
const AUTH_KEY = "sevillataxi_admin_auth";

function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === "true";
}

function authenticate(pass) {
    if (pass === ADMIN_PASS) {
        sessionStorage.setItem(AUTH_KEY, "true");
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
}

// ============ LOGIN UI ============
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    initDashboard();
}

if (isAuthenticated()) {
    showDashboard();
}

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('loginPassword').value;
    if (authenticate(pass)) {
        showDashboard();
    } else {
        loginError.textContent = 'Contraseña incorrecta';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginPassword').focus();
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', logout);

// ============ DATA ============
let allBookings = [];
let unsubscribe = null;
let previousBookingIds = new Set();
let isFirstLoad = true;

// ============ NOTIFICATION SOUND ============
function playNotificationSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Melodía de 3 notas: alegre y profesional
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.4);
        });
    } catch (e) {
        console.warn('Audio not available:', e);
    }
}

// ============ BROWSER NOTIFICATIONS ============
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function showBrowserNotification(booking) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notif = new Notification('🚕 Nueva Reserva', {
            body: `${booking.name} — ${booking.date} a las ${booking.time}\n${serviceLabel(booking.service)}`,
            icon: 'img/icon-192.png',
            badge: 'img/favicon-32.png',
            tag: 'new-booking-' + booking.timestamp,
            requireInteraction: true
        });
        notif.onclick = () => {
            window.focus();
            notif.close();
        };
    }
}

function showInAppAlert(booking) {
    const alert = document.createElement('div');
    alert.className = 'new-booking-alert';
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-bell"></i>
            <div>
                <strong>¡Nueva reserva!</strong>
                <span>${booking.name} — ${booking.date} ${booking.time}</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="alert-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => alert.classList.add('show'), 10);
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 8000);
}

function checkForNewBookings(currentBookings) {
    if (isFirstLoad) {
        // First load: just save IDs, no notification
        previousBookingIds = new Set(currentBookings.map(b => b.id));
        isFirstLoad = false;
        return;
    }

    const currentIds = new Set(currentBookings.map(b => b.id));
    const newBookings = currentBookings.filter(b => !previousBookingIds.has(b.id));

    if (newBookings.length > 0) {
        // New booking(s) detected!
        newBookings.forEach(booking => {
            playNotificationSound();
            showBrowserNotification(booking);
            showInAppAlert(booking);
        });
    }

    previousBookingIds = currentIds;
}

// ============ ADMIN TOAST ============
function showAdminToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============ DATE HELPERS ============
const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function todayStr() {
    return formatDateStr(new Date());
}

function tomorrowStr() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return formatDateStr(d);
}

function formatDateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getWeekRange() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { start: formatDateStr(monday), end: formatDateStr(sunday) };
}

function prettyDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return {
        day: `${d} ${MONTHS_ES[m - 1]} ${y}`,
        weekday: DAYS_ES[date.getDay()]
    };
}

function prettyTimestamp(ts) {
    if (!ts) return '—';
    const date = new Date(ts);
    const d = String(date.getDate()).padStart(2, '0');
    const m = MONTHS_ES[date.getMonth()];
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${d} ${m}, ${h}:${min}`;
}

// ============ SERVICE LABELS ============
const SERVICE_LABELS = {
    'urbano': 'Servicio Urbano',
    'panoramica': 'Ruta Panorámica',
    'aeropuerto': 'Aeropuerto',
    'estacion': 'Estación Tren',
    'paqueteria': 'Paquetería',
    'interurbano': 'Interurbano'
};

function serviceLabel(val) {
    return SERVICE_LABELS[val] || val || 'Sin especificar';
}

// ============ DASHBOARD INIT ============
function initDashboard() {
    requestNotificationPermission();
    setupFilters();
    startRealtimeListener();
}

// ============ REALTIME LISTENER ============
function startRealtimeListener() {
    const bookingsRef = collection(db, "bookings");

    try {
        unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
            allBookings = snapshot.docs.map(d => ({
                id: d.id,
                ...d.data()
            }));

            // Sort by date + time descending (newest first)
            allBookings.sort((a, b) => {
                const dateComp = (b.date || '').localeCompare(a.date || '');
                if (dateComp !== 0) return dateComp;
                return (b.time || '').localeCompare(a.time || '');
            });

            checkForNewBookings(allBookings);
            updateStats();
            renderBookings();
            updateNextBookingBanner();
            updateLiveBadge(true);
        }, (error) => {
            console.error("Error en tiempo real:", error);
            updateLiveBadge(false);
            // Fallback: cargar una vez
            loadBookingsOnce();
        });
    } catch (e) {
        console.error("Error al iniciar listener:", e);
        loadBookingsOnce();
    }
}

async function loadBookingsOnce() {
    try {
        const snapshot = await getDocs(collection(db, "bookings"));
        allBookings = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));
        allBookings.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        updateStats();
        renderBookings();
        updateNextBookingBanner();
    } catch (e) {
        console.error("Error cargando reservas:", e);
    }
}

function updateLiveBadge(connected) {
    const badge = document.getElementById('liveBadge');
    if (!badge) return;
    if (connected) {
        badge.innerHTML = '<span class="live-dot"></span> En vivo';
        badge.style.background = 'var(--admin-green-soft)';
        badge.style.color = 'var(--admin-green)';
    } else {
        badge.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Desconectado';
        badge.style.background = 'var(--admin-red-soft)';
        badge.style.color = 'var(--admin-red)';
    }
}

// ============ STATS ============
function updateStats() {
    const today = todayStr();
    const tomorrow = tomorrowStr();
    const week = getWeekRange();

    const todayCount = allBookings.filter(b => b.date === today).length;
    const tomorrowCount = allBookings.filter(b => b.date === tomorrow).length;
    const weekCount = allBookings.filter(b => b.date >= week.start && b.date <= week.end).length;

    animateNumber('statToday', todayCount);
    animateNumber('statTomorrow', tomorrowCount);
    animateNumber('statWeek', weekCount);
    animateNumber('statTotal', allBookings.length);
}

function animateNumber(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = parseInt(el.textContent) || 0;
    if (current === target) return;

    const duration = 500;
    const steps = 20;
    const increment = (target - current) / steps;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        const val = Math.round(current + increment * step);
        el.textContent = step >= steps ? target : val;
        if (step >= steps) clearInterval(timer);
    }, duration / steps);
}

// ============ FILTERS ============
function setupFilters() {
    const searchEl = document.getElementById('filterSearch');
    const dateEl = document.getElementById('filterDate');
    const serviceEl = document.getElementById('filterService');
    const statusEl = document.getElementById('filterStatus');
    const clearBtn = document.getElementById('clearFilters');

    searchEl?.addEventListener('input', renderBookings);
    dateEl?.addEventListener('change', renderBookings);
    serviceEl?.addEventListener('change', renderBookings);
    statusEl?.addEventListener('change', renderBookings);

    clearBtn?.addEventListener('click', () => {
        if (searchEl) searchEl.value = '';
        if (dateEl) dateEl.value = '';
        if (serviceEl) serviceEl.value = '';
        if (statusEl) statusEl.value = '';
        renderBookings();
    });
}

function getFilters() {
    return {
        search: (document.getElementById('filterSearch')?.value || '').toLowerCase().trim(),
        date: document.getElementById('filterDate')?.value || '',
        service: document.getElementById('filterService')?.value || '',
        status: document.getElementById('filterStatus')?.value || ''
    };
}

function filterBookings() {
    const f = getFilters();
    return allBookings.filter(b => {
        if (f.search && !(b.name || '').toLowerCase().includes(f.search) && !(b.phone || '').includes(f.search)) return false;
        if (f.date && b.date !== f.date) return false;
        if (f.service && b.service !== f.service) return false;
        if (f.status && (b.status || 'pendiente') !== f.status) return false;
        return true;
    });
}

// ============ RENDER BOOKINGS ============
function renderBookings() {
    const filtered = filterBookings();
    const tbody = document.getElementById('bookingsBody');
    const noBookings = document.getElementById('noBookings');
    const countEl = document.getElementById('bookingCount');
    const tableWrapper = document.querySelector('.table-wrapper');

    if (!tbody) return;

    countEl.textContent = `(${filtered.length} de ${allBookings.length})`;

    if (filtered.length === 0) {
        tableWrapper.style.display = 'none';
        noBookings.style.display = 'block';
        return;
    }

    tableWrapper.style.display = 'block';
    noBookings.style.display = 'none';

    tbody.innerHTML = filtered.map(b => {
        const status = b.status || 'pendiente';
        const { day, weekday } = prettyDate(b.date || '');
        const statusIcons = {
            pendiente: 'clock',
            confirmada: 'check-circle',
            completada: 'flag-checkered',
            cancelada: 'times-circle'
        };

        return `
            <tr data-id="${b.id}">
                <td>
                    <span class="status-badge ${status}">
                        <i class="fas fa-${statusIcons[status] || 'circle'}"></i>
                        ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </td>
                <td>
                    <div class="booking-date">
                        <span class="date-day">${day}</span>
                        <span class="date-weekday">${weekday}</span>
                    </div>
                </td>
                <td><span class="booking-time">${b.time || '—'}</span></td>
                <td><span class="client-name">${escapeHtml(b.name || 'Sin nombre')}</span></td>
                <td class="client-phone">
                    <a href="tel:${b.phone || ''}">${b.phone || '—'}</a>
                </td>
                <td><span class="service-tag">${serviceLabel(b.service)}</span></td>
                <td>${prettyTimestamp(b.timestamp)}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn whatsapp" title="WhatsApp" onclick="adminActions.whatsapp('${b.phone || ''}', '${escapeAttr(b.name || '')}', '${b.date || ''}', '${b.time || ''}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        ${status === 'pendiente' ? `
                            <button class="action-btn confirm" title="Confirmar" onclick="adminActions.setStatus('${b.id}', 'confirmada')">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${status === 'confirmada' ? `
                            <button class="action-btn complete" title="Completar" onclick="adminActions.setStatus('${b.id}', 'completada')">
                                <i class="fas fa-flag-checkered"></i>
                            </button>
                        ` : ''}
                        ${status !== 'cancelada' && status !== 'completada' ? `
                            <button class="action-btn cancel" title="Cancelar" onclick="adminActions.setStatus('${b.id}', 'cancelada')">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ============ ACTIONS ============
window.adminActions = {
    async setStatus(bookingId, newStatus) {
        const statusLabels = {
            confirmada: 'confirmar',
            completada: 'completar (se liberarán las horas)',
            cancelada: 'cancelar (se liberarán las horas)'
        };

        const action = statusLabels[newStatus] || newStatus;
        if (!confirm(`¿Seguro que quieres ${action} esta reserva?`)) return;

        try {
            const docRef = doc(db, "bookings", bookingId);
            await updateDoc(docRef, { status: newStatus });

            if (newStatus === 'completada' || newStatus === 'cancelada') {
                showAdminToast(
                    newStatus === 'completada'
                        ? '✅ Viaje completado — horas liberadas'
                        : '❌ Reserva cancelada — horas liberadas',
                    newStatus === 'completada' ? 'success' : 'warning'
                );
            }
            // onSnapshot actualizará automáticamente
        } catch (e) {
            console.error("Error actualizando estado:", e);
            alert("Error al actualizar el estado. Inténtalo de nuevo.");
        }
    },

    whatsapp(phone, name, date, time) {
        const cleanPhone = (phone || '').replace(/\D/g, '');
        const fullPhone = cleanPhone.startsWith('34') ? cleanPhone : '34' + cleanPhone;
        const { day } = prettyDate(date);
        const msg = encodeURIComponent(
            `Hola ${name}, le confirmamos su reserva de taxi para el ${day} a las ${time}. ¡Gracias por confiar en Sevilla FreeNow Taxi! 🚕`
        );
        window.open(`https://wa.me/${fullPhone}?text=${msg}`, '_blank');
    }
};

// ============ NEXT BOOKING BANNER ============
function updateNextBookingBanner() {
    const banner = document.getElementById('nextBookingBanner');
    const info = document.getElementById('nextBookingInfo');
    if (!banner || !info) return;

    const now = new Date();
    const nowStr = formatDateStr(now);
    const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Find the next upcoming booking
    const upcoming = allBookings
        .filter(b => {
            const st = b.status || 'pendiente';
            if (st === 'cancelada' || st === 'completada') return false;
            if (b.date > nowStr) return true;
            if (b.date === nowStr && (b.time || '') > nowTime) return true;
            return false;
        })
        .sort((a, b) => {
            const dateComp = (a.date || '').localeCompare(b.date || '');
            if (dateComp !== 0) return dateComp;
            return (a.time || '').localeCompare(b.time || '');
        });

    if (upcoming.length > 0) {
        const next = upcoming[0];
        const { day } = prettyDate(next.date);
        info.textContent = `${next.name || 'Cliente'} — ${day} a las ${next.time} (${serviceLabel(next.service)})`;
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

// ============ EXPORT CSV ============
document.getElementById('exportBtn')?.addEventListener('click', () => {
    const filtered = filterBookings();
    if (filtered.length === 0) {
        alert('No hay reservas para exportar');
        return;
    }

    const headers = ['Estado', 'Fecha', 'Hora', 'Cliente', 'Teléfono', 'Servicio', 'Reservado el'];
    const rows = filtered.map(b => [
        b.status || 'pendiente',
        b.date,
        b.time || '',
        b.name || '',
        b.phone || '',
        serviceLabel(b.service),
        b.timestamp ? new Date(b.timestamp).toLocaleString('es-ES') : ''
    ]);

    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservas_sevillataxi_${todayStr()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
});

// ============ REFRESH ============
document.getElementById('refreshBtn')?.addEventListener('click', () => {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    loadBookingsOnce().finally(() => {
        setTimeout(() => btn.classList.remove('spinning'), 600);
    });
});

// ============ AUTO REFRESH ============
// Refresh next booking banner every minute
setInterval(updateNextBookingBanner, 60000);
