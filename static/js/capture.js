/* =============================================
   capture.js — Halaman Ambil Foto
   Depends on: banana.js (load first)
   ============================================= */

const video           = document.getElementById('video');
const canvas          = document.getElementById('canvas');
const ctx             = canvas.getContext('2d');
const captureBtn      = document.getElementById('captureBtn');
const switchBtn       = document.getElementById('switchBtn');
const loading         = document.getElementById('loading');
const resultModal     = document.getElementById('resultModal');
const resultImage     = document.getElementById('resultImage');
const retryBtn        = document.getElementById('retryBtn');
const cameraPlaceholder = document.getElementById('cameraPlaceholder');

// Elemen hasil — diteruskan ke applyBananaResult()
const resultEls = {
    statusBadge:   document.getElementById('statusBadge'),
    statusIcon:    document.getElementById('statusIcon'),
    statusLabel:   document.getElementById('statusLabel'),
    statusDesc:    document.getElementById('statusDesc'),
    infoStatus:    document.getElementById('infoStatus'),
    infoRecommend: document.getElementById('infoRecommend'),
    tipsText:      document.getElementById('tipsText'),
};

let currentFacingMode = 'environment';
let stream = null;

/* ── Kamera ── */
async function initCamera() {
    try {
        if (stream) stream.getTracks().forEach(t => t.stop());

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: currentFacingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        video.srcObject = stream;
        cameraPlaceholder.classList.remove('show');
    } catch (err) {
        console.error('Camera error:', err);
        cameraPlaceholder.classList.add('show');
    }
}

/* ── Ambil Foto & Kirim ── */
captureBtn.addEventListener('click', () => {
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
        resultImage.src = canvas.toDataURL('image/jpeg');
        loading.classList.add('show');

        const formData = new FormData();
        formData.append('image', blob, 'capture.jpg');

        fetch('/predict', { method: 'POST', body: formData })
            .then(res => res.text())
            .then(result => {
                loading.classList.remove('show');
                applyBananaResult(result.trim().toLowerCase(), resultEls);
                resultModal.classList.add('show');
            })
            .catch(err => {
                loading.classList.remove('show');
                console.error('Predict error:', err);
            });
    }, 'image/jpeg', 0.8);
});

/* ── Ganti Kamera ── */
switchBtn.addEventListener('click', () => {
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    initCamera();
});

/* ── Ambil Lagi ── */
retryBtn.addEventListener('click', () => {
    resultModal.classList.remove('show');
});

// Start
initCamera();