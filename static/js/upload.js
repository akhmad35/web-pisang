/* =============================================
   upload.js — Halaman Upload Gambar
   Depends on: banana.js (load first)
   ============================================= */

const uploadArea       = document.getElementById('uploadArea');
const uploadBtn        = document.getElementById('uploadBtn');
const fileInput        = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage     = document.getElementById('previewImage');
const resultContainer  = document.getElementById('resultContainer');
const loading          = document.getElementById('loading');
const uploadAgainBtn   = document.getElementById('uploadAgainBtn');
const errorMsg         = document.getElementById('errorMsg');

const resultEls = {
    statusBadge:   document.getElementById('statusBadge'),
    statusIcon:    document.getElementById('statusIcon'),
    statusLabel:   document.getElementById('statusLabel'),
    statusDesc:    document.getElementById('statusDesc'),
    infoStatus:    document.getElementById('infoStatus'),
    infoRecommend: document.getElementById('infoRecommend'),
    tipsText:      document.getElementById('tipsText'),
};

/* ── Trigger file picker ── */
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

/* ── Drag & Drop ── */
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
    }
});

/* ── Handle file selection ── */
function handleFileSelect() {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { showError('Ukuran file terlalu besar (max 5MB)'); return; }
    if (!file.type.startsWith('image/')) { showError('File harus berupa gambar'); return; }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.classList.add('show');
        uploadArea.style.display = 'none';
        errorMsg.classList.remove('show');
        detectImage(file);
    };
    reader.readAsDataURL(file);
}

/* ── Kirim ke backend ── */
function detectImage(file) {
    loading.classList.add('show');

    const formData = new FormData();
    formData.append('image', file);

    fetch('/predict', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(result => {
            loading.classList.remove('show');
            applyBananaResult(result.trim().toLowerCase(), resultEls);
            resultContainer.classList.add('show');
        })
        .catch(err => {
            loading.classList.remove('show');
            showError('Terjadi kesalahan: ' + err.message);
        });
}

function showError(msg) {
    errorMsg.textContent = '⚠️ ' + msg;
    errorMsg.classList.add('show');
}

/* ── Reset ── */
uploadAgainBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewContainer.classList.remove('show');
    resultContainer.classList.remove('show');
    uploadArea.style.display = 'block';
    errorMsg.classList.remove('show');
});