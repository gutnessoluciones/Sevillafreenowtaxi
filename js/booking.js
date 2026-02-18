/* ============================================
   BOOKING SYSTEM — Firebase + Calendar + Slots
   ============================================ */

// ============ FIREBASE CONFIG ============
// TODO: Reemplazar con las credenciales reales de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJyiX3KAO4fafUiICQM1Kip8MAvB-fivw",
    authDomain: "sevillafreenowtaxi.firebaseapp.com",
    projectId: "sevillafreenowtaxi",
    storageBucket: "sevillafreenowtaxi.firebasestorage.app",
    messagingSenderId: "464928210314",
    appId: "1:464928210314:web:c810eec9fa6362a7689c73",
    measurementId: "G-223LPQ7XKM"
};

let db = null;
let firebaseReady = false;

try {
    if (firebaseConfig.apiKey !== "PENDING") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        firebaseReady = true;
    }
} catch (e) {
    console.warn("Firebase no configurado. Usando localStorage como fallback.");
}

// ============ LOCAL STORAGE FALLBACK ============
const LOCAL_KEY = "sevillataxi_bookings";

function getLocalBookings() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    } catch { return []; }
}

function saveLocalBooking(booking) {
    const bookings = getLocalBookings();
    bookings.push(booking);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(bookings));
}

// ============ BOOKING DATA ============
async function getBookingsForDate(dateStr) {
    if (firebaseReady && db) {
        try {
            const q = query(collection(db, "bookings"), where("date", "==", dateStr));
            const snap = await getDocs(q);
            return snap.docs.map(d => d.data());
        } catch (e) {
            console.warn("Firebase error, using localStorage:", e);
        }
    }
    return getLocalBookings().filter(b => b.date === dateStr);
}

async function saveBooking(booking) {
    if (firebaseReady && db) {
        try {
            const docRef = await addDoc(collection(db, "bookings"), booking);
            // Enviar notificación al dueño
            notifyOwner(booking, docRef.id);
            return;
        } catch (e) {
            console.warn("Firebase save error, using localStorage:", e);
        }
    }
    saveLocalBooking(booking);
}

// ============ NOTIFICACIONES AL DUEÑO ============
const OWNER_PHONE = "34664625403";
const ADMIN_URL = "https://admin.sevillafreenowtaxi.com";
// TODO: Configurar EmailJS o backend cuando se tenga el email del dueño
// const OWNER_EMAIL = "pendiente@sevillafreenowtaxi.com";

function notifyOwner(booking, bookingId) {
    // 1) WhatsApp automático al dueño vía API URL
    const msg = `🚕 *NUEVA RESERVA*%0A` +
        `👤 ${booking.name}%0A` +
        `📱 ${booking.phone}%0A` +
        `🚗 ${booking.serviceText || booking.service}%0A` +
        `📅 ${booking.date} a las ${booking.time}%0A` +
        `📍 ${booking.pickup || 'No indicado'}%0A` +
        `💰 ${booking.price || '—'}€${booking.isCompany ? ' (empresa -15%)' : ''}%0A` +
        `%0A🔗 Gestionar: ${ADMIN_URL}`;

    // Abrir WhatsApp al dueño en segundo plano (no interrumpe al cliente)
    // Nota: esto solo funciona si el usuario que reserva está en el mismo dispositivo.
    // Para notificación automática real, se necesita backend (Cloud Functions).
    // Lo dejamos preparado para cuando tengamos el backend.

    // 2) Guardar en cola de notificaciones pendientes en Firestore
    if (firebaseReady && db) {
        try {
            addDoc(collection(db, "notifications"), {
                type: "new_booking",
                bookingId: bookingId,
                ownerPhone: OWNER_PHONE,
                message: decodeURIComponent(msg.replace(/%0A/g, '\n')),
                sent: false,
                timestamp: Date.now()
            });
        } catch (e) {
            console.warn("Error guardando notificación:", e);
        }
    }
}

// ============ TIME SLOTS CONFIG ============
const SLOT_START = 7;   // 07:00
const SLOT_END = 23;    // 23:00
const SLOT_INTERVAL = 30; // minutos

function generateSlots() {
    const slots = [];
    for (let h = SLOT_START; h < SLOT_END; h++) {
        for (let m = 0; m < 60; m += SLOT_INTERVAL) {
            slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        }
    }
    return slots;
}

function slotToIndex(slotStr) {
    const [h, m] = slotStr.split(':').map(Number);
    return (h - SLOT_START) * (60 / SLOT_INTERVAL) + (m / SLOT_INTERVAL);
}

function getBlockedSlots(bookings, allSlots) {
    const blocked = new Set();
    bookings.forEach(bk => {
        const startIdx = slotToIndex(bk.time);
        const duration = parseInt(bk.duration) || 1;
        for (let i = startIdx; i < startIdx + duration && i < allSlots.length; i++) {
            if (i >= 0) blocked.add(i);
        }
    });
    return blocked;
}

// ============ CALENDAR ============
const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let currentMonth, currentYear, selectedDate, selectedSlot;

function initCalendar() {
    const now = new Date();
    currentMonth = now.getMonth();
    currentYear = now.getFullYear();
    selectedDate = null;
    selectedSlot = null;
    renderCalendar();
}

function renderCalendar() {
    const monthYearEl = document.getElementById('calMonthYear');
    const daysEl = document.getElementById('calDays');
    if (!monthYearEl || !daysEl) return;

    monthYearEl.textContent = `${MONTHS_ES[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7; // Lunes=0
    const totalDays = lastDay.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '';

    // Empty cells before first day
    for (let i = 0; i < startWeekday; i++) {
        html += `<div class="cal-day empty"></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
        const date = new Date(currentYear, currentMonth, d);
        const dateStr = formatDate(date);
        const isPast = date < today;
        const isToday = date.getTime() === today.getTime();
        const isSelected = selectedDate === dateStr;

        let cls = 'cal-day';
        if (isPast) cls += ' past';
        if (isToday) cls += ' today';
        if (isSelected) cls += ' selected';

        html += `<div class="${cls}" data-date="${dateStr}" ${isPast ? '' : 'role="button" tabindex="0"'}>${d}</div>`;
    }

    daysEl.innerHTML = html;

    // Bind click events
    daysEl.querySelectorAll('.cal-day:not(.empty):not(.past)').forEach(el => {
        el.addEventListener('click', () => onDateSelect(el.dataset.date));
    });
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function formatDateDisplay(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

async function onDateSelect(dateStr) {
    selectedDate = dateStr;
    selectedSlot = null;
    document.getElementById('toStep3').disabled = true;

    // Update calendar UI
    document.querySelectorAll('.cal-day').forEach(el => el.classList.remove('selected'));
    document.querySelector(`.cal-day[data-date="${dateStr}"]`)?.classList.add('selected');

    // Show time slots
    const container = document.getElementById('timeslotsContainer');
    const grid = document.getElementById('timeslotsGrid');
    const dateText = document.getElementById('selectedDateText');
    container.style.display = 'block';
    dateText.textContent = formatDateDisplay(dateStr);
    grid.innerHTML = '<div class="slots-loading"><i class="fas fa-spinner fa-spin"></i> Cargando disponibilidad...</div>';

    // Get booked slots
    const bookings = await getBookingsForDate(dateStr);
    const allSlots = generateSlots();
    const blockedIdxs = getBlockedSlots(bookings, allSlots);

    // Get service duration
    const serviceDuration = getSelectedDuration();

    // Render slots
    let html = '';
    const now = new Date();
    const isToday = dateStr === formatDate(now);

    allSlots.forEach((slot, idx) => {
        // Check if this slot + duration is fully available
        let isBlocked = false;
        for (let i = idx; i < idx + serviceDuration && i < allSlots.length; i++) {
            if (blockedIdxs.has(i)) {
                isBlocked = true;
                break;
            }
        }

        // Check if slot is in the past for today
        if (isToday) {
            const [sh, sm] = slot.split(':').map(Number);
            if (sh < now.getHours() || (sh === now.getHours() && sm <= now.getMinutes())) {
                isBlocked = true;
            }
        }

        // Check if service would extend beyond operating hours
        if (idx + serviceDuration > allSlots.length) {
            isBlocked = true;
        }

        const cls = isBlocked ? 'time-slot booked' : 'time-slot available';
        html += `<div class="${cls}" data-slot="${slot}" data-index="${idx}" ${isBlocked ? '' : 'role="button" tabindex="0"'}>${slot}</div>`;
    });

    grid.innerHTML = html;

    // Bind slot clicks
    grid.querySelectorAll('.time-slot.available').forEach(el => {
        el.addEventListener('click', () => onSlotSelect(el));
    });

    // Smooth scroll to time slots
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function onSlotSelect(el) {
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));

    const slot = el.dataset.slot;
    const idx = parseInt(el.dataset.index);
    const duration = getSelectedDuration();

    // Highlight the slot and the duration block
    el.classList.add('selected');
    for (let i = idx + 1; i < idx + duration; i++) {
        const nextSlot = document.querySelector(`.time-slot[data-index="${i}"]`);
        if (nextSlot && !nextSlot.classList.contains('booked')) {
            nextSlot.classList.add('selected-range');
        }
    }

    selectedSlot = slot;
    document.getElementById('toStep3').disabled = false;
}

function getSelectedDuration() {
    const sel = document.getElementById('bk-servicio');
    const opt = sel.options[sel.selectedIndex];
    return parseInt(opt?.dataset?.duration) || 1;
}

function getSelectedPrice() {
    const sel = document.getElementById('bk-servicio');
    const opt = sel.options[sel.selectedIndex];
    return opt?.dataset?.price || '—';
}

// ============ STEP NAVIGATION ============
function showStep(stepNum) {
    document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${stepNum}`)?.classList.add('active');
}

function validateStep1() {
    const nombre = document.getElementById('bk-nombre').value.trim();
    const telefono = document.getElementById('bk-telefono').value.trim();
    const servicio = document.getElementById('bk-servicio').value;

    if (!nombre) { shakeField('bk-nombre'); return false; }
    if (!telefono) { shakeField('bk-telefono'); return false; }
    if (!servicio) { shakeField('bk-servicio'); return false; }
    return true;
}

function shakeField(id) {
    const el = document.getElementById(id);
    el.classList.add('shake');
    el.focus();
    setTimeout(() => el.classList.remove('shake'), 600);
}

async function confirmBooking() {
    const nombre = document.getElementById('bk-nombre').value.trim();
    const telefono = document.getElementById('bk-telefono').value.trim();
    const servicio = document.getElementById('bk-servicio');
    const servicioText = servicio.options[servicio.selectedIndex].text;
    const pasajeros = document.getElementById('bk-pasajeros').value;
    const recogida = document.getElementById('bk-recogida').value.trim();
    const esEmpresa = document.getElementById('bk-empresa').checked;
    const duration = getSelectedDuration();
    const price = getSelectedPrice();

    const booking = {
        name: nombre,
        phone: telefono,
        service: servicio.value,
        serviceText: servicioText,
        passengers: pasajeros,
        pickup: recogida,
        isCompany: esEmpresa,
        date: selectedDate,
        time: selectedSlot,
        duration: duration,
        price: price,
        status: "pendiente",
        timestamp: Date.now(),
        createdAt: new Date().toISOString()
    };

    // Save to DB
    await saveBooking(booking);

    // Show confirmation
    const priceNum = parseFloat(price);
    const finalPrice = esEmpresa ? (priceNum * 0.85).toFixed(2) : priceNum;

    document.getElementById('confirmDetails').innerHTML = `
        <div class="confirm-row"><span><i class="fas fa-user"></i> Nombre</span><strong>${nombre}</strong></div>
        <div class="confirm-row"><span><i class="fas fa-concierge-bell"></i> Servicio</span><strong>${servicioText}</strong></div>
        <div class="confirm-row"><span><i class="fas fa-calendar"></i> Fecha</span><strong>${formatDateDisplay(selectedDate)}</strong></div>
        <div class="confirm-row"><span><i class="fas fa-clock"></i> Hora</span><strong>${selectedSlot}</strong></div>
        <div class="confirm-row"><span><i class="fas fa-users"></i> Pasajeros</span><strong>${pasajeros}</strong></div>
        ${recogida ? `<div class="confirm-row"><span><i class="fas fa-map-marker-alt"></i> Recogida</span><strong>${recogida}</strong></div>` : ''}
        ${esEmpresa ? `<div class="confirm-row empresa"><span><i class="fas fa-building"></i> Empresa</span><strong>-15% → ${finalPrice}€</strong></div>` : ''}
        <div class="confirm-row total"><span><i class="fas fa-tag"></i> Precio</span><strong>${esEmpresa ? finalPrice : price}€</strong></div>
    `;

    // Build WhatsApp link
    let msg = `🚖 *RESERVA CONFIRMADA*\n\n`;
    msg += `👤 *Nombre:* ${nombre}\n`;
    msg += `📞 *Teléfono:* ${telefono}\n`;
    msg += `🚗 *Servicio:* ${servicioText}\n`;
    msg += `📅 *Fecha:* ${formatDateDisplay(selectedDate)}\n`;
    msg += `🕐 *Hora:* ${selectedSlot}\n`;
    msg += `👥 *Pasajeros:* ${pasajeros}\n`;
    if (recogida) msg += `📍 *Recogida:* ${recogida}\n`;
    if (esEmpresa) msg += `\n🏢 *Cliente Empresa* — Dto. 15% → ${finalPrice}€\n`;
    msg += `\n💰 *Total:* ${esEmpresa ? finalPrice : price}€`;
    msg += `\n\n_Reserva automática desde sevillafreenowtaxi.com_`;

    document.getElementById('confirmWhatsApp').href = `https://wa.me/34664625403?text=${encodeURIComponent(msg)}`;

    showStep(3);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {

    // Step 1 → Step 2
    document.getElementById('toStep2')?.addEventListener('click', () => {
        if (validateStep1()) {
            showStep(2);
            initCalendar();
        }
    });

    // Step 2 → Step 1 (back)
    document.getElementById('backToStep1')?.addEventListener('click', () => {
        showStep(1);
    });

    // Step 2 → Step 3 (confirm)
    document.getElementById('toStep3')?.addEventListener('click', () => {
        if (selectedDate && selectedSlot) {
            confirmBooking();
        }
    });

    // Calendar navigation
    document.getElementById('calPrev')?.addEventListener('click', () => {
        const now = new Date();
        // Don't go before current month
        if (currentYear > now.getFullYear() || (currentYear === now.getFullYear() && currentMonth > now.getMonth())) {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar();
        }
    });

    document.getElementById('calNext')?.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar();
    });

    // New booking
    document.getElementById('newBooking')?.addEventListener('click', () => {
        selectedDate = null;
        selectedSlot = null;
        document.getElementById('bk-nombre').value = '';
        document.getElementById('bk-telefono').value = '';
        document.getElementById('bk-servicio').selectedIndex = 0;
        document.getElementById('bk-recogida').value = '';
        document.getElementById('bk-empresa').checked = false;
        showStep(1);
    });

    // Re-load slots when service changes (different durations)
    document.getElementById('bk-servicio')?.addEventListener('change', () => {
        if (selectedDate) {
            onDateSelect(selectedDate);
        }
    });
});
