// ============================================
// Script.js - Fungsi Global & AdMob
// ============================================

// URL Web App (sudah diisi dengan URL Anda)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydsYO1skuQO4MtFhNF1WYhfQ3Q3oHHxo5JtpPiORkC30WckJDtSoHp7X78JIW2LP3w/exec';

// ============================================
// ADMOB INTEGRATION
// ============================================

// Flag untuk mendeteksi apakah dijalankan di WebView (Android)
window.isWebView = window.isWebView || false;

// Fungsi untuk mengecek apakah user perlu melihat iklan
function shouldShowAds(jabatan) {
    // Owner & Admin TIDAK lihat iklan
    if (jabatan === 'Owner' || jabatan === 'Admin') {
        return false;
    }
    return true;
}

// Tampilkan Interstitial Ad
function showInterstitialAd(callback) {
    if (window.isWebView && window.AdMob) {
        try {
            // Panggil interface Android
            window.AdMob.showInterstitial(
                'ca-app-pub-4310670917209711/5001688387', // ID Unit Interstitial
                'onInterstitialClosed' // Nama callback JS
            );
            // Simpan callback untuk dipanggil setelah iklan ditutup
            window._interstitialCallback = callback;
        } catch (e) {
            console.warn('AdMob interstitial error:', e);
            if (callback) callback();
        }
    } else {
        // Jika di browser biasa atau tidak ada AdMob, skip iklan
        console.log('Skip iklan (browser atau WebView tanpa AdMob)');
        if (callback) callback();
    }
}

// Callback setelah interstitial ditutup
function onInterstitialClosed() {
    if (window._interstitialCallback) {
        const cb = window._interstitialCallback;
        window._interstitialCallback = null;
        cb();
    }
}

// Tampilkan Banner Ad
function showBannerAd(position) {
    if (window.isWebView && window.AdMob) {
        try {
            window.AdMob.showBanner(
                'ca-app-pub-4310670917209711/8717572112', // ID Unit Banner
                position || 'bottom'
            );
        } catch (e) {
            console.warn('AdMob banner error:', e);
        }
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatNumber(num) {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatRupiah(num) {
    return 'Rp ' + formatNumber(num);
}

// ============================================
// SESSION MANAGEMENT
// ============================================

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
        return {};
    }
}

function isLoggedIn() {
    return !!getToken();
}

function redirectToLogin() {
    window.location.href = 'Login.html';
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Click outside modal to close
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};
