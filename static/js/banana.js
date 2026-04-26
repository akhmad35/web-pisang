/* =============================================
   banana.js — Shared data & helper
   Used by: upload.js, capture.js, realtime.js
   ============================================= */

const BANANA_MAPPINGS = {
    unripe: {
        icon: '🟢',
        label: 'Belum Matang',
        desc: 'Pisang masih keras dan rasa asam',
        status: '0–30%',
        recommend: 'Tunggu 2–3 hari',
        tips: 'Simpan di suhu ruangan (20–25°C). Hindari pendinginan untuk mempercepat proses pematangan alami.'
    },
    ripe: {
        icon: '🟡',
        label: 'Matang Sempurna',
        desc: 'Pisang lunak dan manis, siap dimakan',
        status: '60–80%',
        recommend: 'Konsumsi sekarang',
        tips: 'Simpan di kulkas untuk memperpanjang kesegaran hingga 2–3 hari. Cocok untuk dimakan langsung atau smoothie.'
    },
    overripe: {
        icon: '🔴',
        label: 'Sangat Matang',
        desc: 'Pisang sangat lembut dengan gula tinggi',
        status: '90%+',
        recommend: 'Olah sekarang',
        tips: 'Segera konsumsi atau gunakan untuk membuat banana bread, pudding, atau es krim. Bisa dibekukan untuk penggunaan nanti.'
    },
    rotten: {
        icon: '⚫',
        label: 'Busuk',
        desc: 'Pisang sudah tidak layak dikonsumsi',
        status: '100%',
        recommend: 'Jangan konsumsi',
        tips: 'Pisang ini sudah busuk dan tidak aman dikonsumsi. Buang ke tempat sampah organik untuk kompos.'
    }
};

/**
 * Isi elemen-elemen hasil deteksi di halaman.
 * @param {string} result — salah satu key dari BANANA_MAPPINGS
 * @param {object} els    — map nama-elemen ke DOM element
 */
function applyBananaResult(result, els) {
    const data = BANANA_MAPPINGS[result] || BANANA_MAPPINGS['rotten'];
    const key  = BANANA_MAPPINGS[result] ? result : 'rotten';

    els.statusBadge.className  = 'status-badge ' + key;
    els.statusIcon.textContent  = data.icon;
    els.statusLabel.textContent = data.label;
    els.statusDesc.textContent  = data.desc;
    els.infoStatus.textContent  = data.status;
    els.infoRecommend.textContent = data.recommend;
    els.tipsText.textContent    = data.tips;
}