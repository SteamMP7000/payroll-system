// ============================================
// Script.js - Payroll System Steam MP 7000
// ============================================

// URL Web App (PASTIKAN URL INI BENAR)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydsYO1skuQO4MtFhNF1WYhfQ3Q3oHHxo5JtpPiORkC30WckJDtSoHp7X78JIW2LP3w/exec';

// ============================================
// FUNGSI IKLAN (DUMMY UNTUK TESTING)
// ============================================

function shouldShowAds(jabatan) {
    if (jabatan === 'Owner' || jabatan === 'Admin') {
        return false;
    }
    return true;
}

function showInterstitialAd(callback) {
    console.log('Iklan dilewati (mode testing)');
    if (callback) callback();
}

// ============================================
// FUNGSI UTILITY
// ============================================

function formatNumber(num) {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
