/* =============================================
   realtime.js — Mode Real-time
   Depends on: banana.js (load first)
   ============================================= */

const video    = document.getElementById('video');
const canvas   = document.getElementById('canvas');
const ctx      = canvas.getContext('2d');
const statusEl = document.getElementById('realtimeStatus');
const overlay  = document.getElementById('resultOverlay');

const resultEls = {
    statusBadge:   document.getElementById('statusBadge'),
    statusIcon:    document.getElementById('statusIcon'),
    statusLabel:   document.getElementById('statusLabel'),
    statusDesc:    document.getElementById('statusDesc'),
    infoStatus:    document.getElementById('infoStatus'),
    infoRecommend: document.getElementById('infoRecommend'),
    tipsText:      document.getElementById('tipsText'),
};

let isSending = false;   // cegah request tumpuk-tumpuk
let stream    = null;

/* ── Init kamera ── */
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        video.srcObject = stream;
    } catch (err) {
        console.error('Camera error:', err);
        statusEl.textContent = '❌ Kamera tidak tersedia';
    }
}

/* ── Loop deteksi tiap 1.5 detik ── */
function startDetectionLoop() {
    setInterval(() => {
        if (isSending || video.readyState < 2) return;

        canvas.width  = video.videoWidth  || 300;
        canvas.height = video.videoHeight || 300;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (!blob) return;
            isSending = true;
            statusEl.textContent = '🔍 Menganalisis...';

            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');

            fetch('/predict', { method: 'POST', body: formData })
                .then(res => res.text())
                .then(result => {
                    const key = result.trim().toLowerCase();
                    applyBananaResult(key, resultEls);
                    overlay.classList.add('show');
                    statusEl.textContent = '✅ Deteksi aktif';
                })
                .catch(err => {
                    console.error('Predict error:', err);
                    statusEl.textContent = '⚠️ Gagal mendeteksi';
                })
                .finally(() => { isSending = false; });
        }, 'image/jpeg', 0.7);
    }, 1500);
}

initCamera().then(startDetectionLoop);