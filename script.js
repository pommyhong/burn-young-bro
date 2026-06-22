/* =====================================================
   BURN YOUNG BRO CLINIC — script.js
   ===================================================== */

// ===== DATA =====

const LEVELS = [
  {
    en: "MILDLY TOASTED",
    th: "เริ่มเกรียมนิดๆ",
    range: [18, 31],
    symptoms: [
      "ตอบ 'fine' ทุกคน ทั้งที่ไม่ fine",
      "เปิดอีเมลแล้วปิดทันที ซ้ำไปมาหลายรอบ",
      "เริ่มคิดว่าแมวมีชีวิตที่ดีกว่าตัวเอง"
    ],
    rx: "นอนก่อน 11 โมงให้ได้ติดต่อกัน 3 คืน",
    stamp: "ผ่านการ\nตรวจแล้ว"
  },
  {
    en: "MEDIUM DONE",
    th: "สุกกลางๆ แล้ว",
    range: [34, 49],
    symptoms: [
      "กาแฟเลิกออกฤทธิ์ — ดื่มแค่เป็นพิธีทางจิตใจ",
      "วันจันทร์รู้สึกเหมือนเป็นการโจมตีส่วนตัว",
      "ร้องไห้แบบไม่รู้สาเหตุ อาทิตย์ละ 2–3 ครั้ง"
    ],
    rx: "ลาหยุด 1 วัน โดยไม่รู้สึกผิด",
    stamp: "ผ่านการ\nตรวจแล้ว"
  },
  {
    en: "CRISPY",
    th: "กรอบพอดีเลย",
    range: [52, 67],
    symptoms: [
      "มีแท็บเปิดค้างอยู่ 40+ แท็บตลอดเวลา",
      "ไม่จำได้แล้วว่า hobby ตัวเองคืออะไร",
      "Calendar notification = anxiety attack ทุกครั้ง"
    ],
    rx: "ลาพักร้อน — ห้ามเช็คอีเมลเด็ดขาด",
    stamp: "ผ่านการ\nตรวจแล้ว"
  },
  {
    en: "FULLY BURNT",
    th: "ไหม้เต็มที่แล้ว",
    range: [70, 83],
    symptoms: [
      "คุยกับต้นไม้ในบ้านเป็นกิจวัตรประจำวัน",
      "เงินเดือนไม่คุ้มกับความเสียหายทางจิตใจ",
      "ฝันถึง deadline แม้วันหยุดยาว"
    ],
    rx: "หยุดยาว + ห้ามมีการประชุมเลย 1 สัปดาห์",
    stamp: "ผ่านการ\nตรวจแล้ว"
  },
  {
    en: "CHARCOAL",
    th: "ถ่านแท้ 100%",
    range: [86, 96],
    symptoms: [
      "พิจารณาเปิดโรงแรมแมว / หนีไปทำสวน / ลาออก",
      "Meeting invite = personal threat ระดับสูงสุด",
      "เข้าใจแล้วว่าทำไมคนถึงลาออกแบบไม่บอกล่วงหน้า"
    ],
    rx: "Witness protection program — ทันที",
    stamp: "ผ่านการ\nตรวจแล้ว"
  }
];

const DOCTORS = [
  { name: "หมอกิตติ สิงหาคม",    title: "อายุรแพทย์ประจำคลินิก" },
  { name: "หมอนุ้ย ลาก่อนนะ",   title: "จิตแพทย์ · เชี่ยวชาญการนอน" },
  { name: "หมอบิ๊ก แวะมาดู",    title: "แพทย์ทั่วไป · ลาออกแล้วกลับมา" },
  { name: "พญ.ติ๊ก ทนดูอยู่",   title: "ที่ปรึกษาสุขภาพจิตองค์กร" },
  { name: "หมอต้น พักก่อนเด้อ", title: "แพทย์ผู้เชี่ยวชาญความเครียดสะสม" },
];

function getMeetingSymptom(count) {
  if (count <= 1) return "มี meeting เพียง 1 ครั้ง แต่ก็ยังอ่อนเพลียได้ตามปกติ";
  if (count <= 3) return `ใช้เวลา ${count} ชั่วโมงในห้องประชุม · deep work ไม่ค่อยได้เกิด`;
  if (count <= 5) return `${count} meetings — Calendar เริ่มไม่มีช่องว่างให้หายใจ`;
  if (count <= 7) return `${count} meetings ใน 1 วัน · ทำงานจริงๆ ได้เมื่อไหร่`;
  return "8 meetings ขึ้นไป — ร่างกายอยู่ในห้องประชุม แต่จิตใจไปแล้ว";
}

// ===== STATE =====
let photoDataUrl = null;   // blob: URL for display
let photoFile    = null;   // original File for html2canvas fallback
let cameraStream = null;
let currentDoctor = DOCTORS[0];
let generatedHN = '';

// ===== SCREEN ROUTING =====
const screens = {
  intake:  document.getElementById('screen-intake'),
  loading: document.getElementById('screen-loading'),
  result:  document.getElementById('screen-result'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => { s.style.display = 'none'; s.classList.remove('active'); });
  screens[name].style.display = 'block';
  screens[name].classList.add('active');
  window.scrollTo(0, 0);
}

// ===== INIT (HN + doctor on load) =====
function initIntake() {
  currentDoctor = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = String(today.getFullYear()).slice(-2);
  generatedHN = `BYB-${yy}${mm}${dd}-${Math.floor(Math.random() * 900) + 100}`;
  document.getElementById('formHN').textContent   = generatedHN;
  document.getElementById('formDate').textContent  = formatDate(today);
  const docEl = document.getElementById('assignedDoctor');
  if (docEl) docEl.textContent = currentDoctor.name;

  // Random notes placeholder
  const NOTE_HINTS = [
    "เช่น ดื่มกาแฟ 3 แก้วแล้วยังง่วง · เปิด Figma แล้วนั่งเฉยๆ 20 นาที",
    "เช่น ตอบ 'อยู่นะ' ทุก noti แต่ไม่ได้อ่านสักอัน · ประชุมจบยังงง",
    "เช่น ทำ to-do ครบแต่ท้ายวันรู้สึกไม่ได้ทำอะไรเลย · นอนหลับไม่ลงตอนตี 2",
    "เช่น scroll LinkedIn แล้วรู้สึกแย่ · พิมพ์ครึ่งประโยคแล้วลบทิ้งหลายรอบ",
    "เช่น slide เสร็จแต่ลืม save · meeting ซ้อนกันติดต่อกัน 3 ชั่วโมง",
    "เช่น คิดว่าเดี๋ยวทำ แต่เดี๋ยวก็ผ่านไปแล้ว · ชาร์ตแล็ปท็อปแทนชีวิต",
  ];
  const hint = NOTE_HINTS[Math.floor(Math.random() * NOTE_HINTS.length)];
  const notesEl = document.getElementById('notesInput');
  if (notesEl) notesEl.placeholder = hint;
}
initIntake();

// ===== PHOTO UPLOAD =====
const photoZone  = document.getElementById('photoZone');
const photoInput = document.getElementById('photoInput');

photoInput.addEventListener('change', e => {
  if (e.target.files[0]) loadPhoto(e.target.files[0]);
});

// Drag & drop onto photo zone
photoZone.addEventListener('dragover',  e => { e.preventDefault(); photoZone.classList.add('dragover'); });
photoZone.addEventListener('dragleave', () => photoZone.classList.remove('dragover'));
photoZone.addEventListener('drop', e => {
  e.preventDefault();
  photoZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadPhoto(file);
});

function loadPhoto(file) {
  if (photoDataUrl && photoDataUrl.startsWith('blob:')) URL.revokeObjectURL(photoDataUrl);
  photoFile    = file;
  photoDataUrl = URL.createObjectURL(file);
  setFormPhoto(photoDataUrl);
}

function setFormPhoto(src) {
  const img = document.getElementById('formPhoto');
  img.classList.remove('loaded');
  img.src = src;
  requestAnimationFrame(() => setTimeout(() => img.classList.add('loaded'), 80));
  photoZone.classList.add('has-photo');
}

// ===== CAMERA =====
const cameraModal     = document.getElementById('cameraModal');
const cameraFeed      = document.getElementById('cameraFeed');
const snapBtn         = document.getElementById('snapBtn');
const cancelCameraBtn = document.getElementById('cancelCameraBtn');
const snapCanvas      = document.getElementById('snapCanvas');
const cameraBtn       = document.getElementById('cameraBtn');

cameraBtn.addEventListener('click', async () => {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    cameraFeed.srcObject = cameraStream;
    cameraModal.classList.remove('hidden');
  } catch {
    alert('ไม่สามารถเข้าถึงกล้องได้\nกรุณาอัปโหลดรูปแทน');
  }
});

snapBtn.addEventListener('click', () => {
  snapCanvas.width  = cameraFeed.videoWidth;
  snapCanvas.height = cameraFeed.videoHeight;
  const ctx = snapCanvas.getContext('2d');
  ctx.translate(snapCanvas.width, 0); ctx.scale(-1, 1);
  ctx.drawImage(cameraFeed, 0, 0);
  photoDataUrl = snapCanvas.toDataURL('image/jpeg', 0.92);
  photoFile = null;
  stopCamera();
  setFormPhoto(photoDataUrl);
});

cancelCameraBtn.addEventListener('click', stopCamera);

function stopCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  cameraModal.classList.add('hidden');
}

// ===== FORM SUBMIT =====
document.getElementById('submitForm').addEventListener('click', () => {
  if (!photoDataUrl) {
    photoZone.classList.add('shake');
    setTimeout(() => photoZone.classList.remove('shake'), 500);
    return;
  }
  const meetingVal = document.getElementById('meetingSelect').value;
  if (!meetingVal) {
    document.getElementById('meetingSelect').focus();
    return;
  }
  const meetingCount = parseInt(meetingVal, 10);
  const notes = document.getElementById('notesInput').value.trim();
  runAnalysis(meetingCount, notes);
});

// ===== AUDIO =====
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTypeClick() {
  try {
    const ctx = getAudioCtx();
    const len = Math.floor(ctx.sampleRate * 0.022);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003)) * 0.55;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 900;
    const g = ctx.createGain(); g.gain.value = 0.12;
    src.connect(hp); hp.connect(g); g.connect(ctx.destination);
    src.start();
  } catch(e) {}
}

function playCarriageReturn() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 760;
    g.gain.setValueAtTime(0.07, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.28);
  } catch(e) {}
}

function playPrinterMotor(durationSec) {
  try {
    const ctx = getAudioCtx();
    const len = Math.floor(ctx.sampleRate * durationSec);
    const nBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const nd = nBuf.getChannelData(0);
    for (let i = 0; i < len; i++) nd[i] = (Math.random() * 2 - 1) * 0.018;
    const ns = ctx.createBufferSource(); ns.buffer = nBuf;
    const bf = ctx.createBiquadFilter(); bf.type = 'bandpass';
    bf.frequency.value = 1800; bf.Q.value = 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    ns.connect(bf); bf.connect(g); g.connect(ctx.destination);
    ns.start(); ns.stop(ctx.currentTime + durationSec);

    const hum = ctx.createOscillator(); hum.type = 'sawtooth'; hum.frequency.value = 85;
    const hg = ctx.createGain();
    hg.gain.setValueAtTime(0.025, ctx.currentTime);
    hg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    hum.connect(hg); hg.connect(ctx.destination);
    hum.start(); hum.stop(ctx.currentTime + durationSec);
  } catch(e) {}
}

// ===== TYPEWRITER =====
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runTypewriter(meetingCount) {
  const patientName = document.getElementById('patientName').value.trim() || 'ไม่ระบุชื่อ';
  const cortisol = 60 + Math.floor(Math.random() * 30);
  const eyebag   = ['สูง', 'สูงมาก', 'วิกฤต'][Math.floor(Math.random() * 3)];
  const lines = [
    `หมอกำลังวินิจฉัย · ผู้ป่วย: ${patientName}`,
    `HN: ${generatedHN} · สแกนใบหน้า...`,
    `ตรวจวัดระดับ cortisol: ${cortisol} µg/dL`,
    `Eye-bag density: ${eyebag} · Meeting x${meetingCount} ครั้ง`,
    `ประมวลผล · กรุณารอสักครู่...`,
    `✓ วินิจฉัยเสร็จสิ้น → กำลังพิมพ์ใบรับรอง`,
  ];

  document.getElementById('twHN').textContent = generatedHN;
  const out = document.getElementById('twOutput');
  out.textContent = '';

  for (const line of lines) {
    for (const ch of line) {
      out.textContent += ch;
      playTypeClick();
      pressRandomKey();
      await sleep(Math.random() * 65 + 30);
    }
    out.textContent += '\n';
    playCarriageReturn();
    animateCarriageReturn();
    await sleep(320);
  }
}

// ===== TYPEWRITER MACHINE =====
function initMachine() {
  const counts = [10, 9, 8];
  ['twmRow1','twmRow2','twmRow3'].forEach((id, i) => {
    const row = document.getElementById(id);
    if (!row) return;
    row.innerHTML = '';
    for (let k = 0; k < counts[i]; k++) {
      const s = document.createElement('span');
      s.className = 'twm-key';
      row.appendChild(s);
    }
  });
}
initMachine();

function pressRandomKey() {
  const rowIds = ['twmRow1','twmRow2','twmRow3'];
  const row = document.getElementById(rowIds[Math.floor(Math.random() * rowIds.length)]);
  if (!row) return;
  const keys = row.querySelectorAll('.twm-key');
  if (!keys.length) return;
  const key = keys[Math.floor(Math.random() * keys.length)];
  key.classList.add('pressed');
  setTimeout(() => key.classList.remove('pressed'), 90);
}

function animateCarriageReturn() {
  const c = document.getElementById('twmCarriage');
  if (!c) return;
  c.classList.add('returning');
  setTimeout(() => c.classList.remove('returning'), 360);
}

function startPaperFeed() {
  const strip = document.getElementById('twmPaperStrip');
  if (strip) strip.classList.add('feeding');
}

// ===== RUN ANALYSIS =====
function runAnalysis(meetingCount, notes) {
  const docLabel = document.getElementById('twDoctorLabel');
  if (docLabel) docLabel.textContent = `ผู้วินิจฉัย: ${currentDoctor.name}`;
  startPaperFeed();
  showScreen('loading');
  runTypewriter(meetingCount);

  setTimeout(() => {
    const level = pickLevel(meetingCount);
    showResult(level, meetingCount);
  }, 4200);
}

// ===== PICK LEVEL =====
function pickLevel(meetingCount) {
  const base = LEVELS[Math.floor(Math.random() * LEVELS.length)];
  const [min, max] = base.range;
  // More meetings = higher score
  const meetingBonus = Math.min((meetingCount - 1) * 2, 16);
  const raw = Math.floor(Math.random() * (max - min + 1)) + min + meetingBonus;
  const score = Math.min(raw, 98);
  return { ...base, score, meetingCount };
}

// ===== SHOW RESULT =====
function showResult(level, meetingCount) {
  // Fill cert data first (while hidden)
  const certPhoto = document.getElementById('certPhoto');
  certPhoto.src = photoDataUrl;
  certPhoto.classList.add('loaded');

  const patientName = document.getElementById('patientName').value.trim() || 'ผู้ป่วยสมัครใจ';
  document.getElementById('certPatientName').textContent = patientName;
  document.getElementById('certHN').textContent          = generatedHN;
  document.getElementById('certDate').textContent        = formatDate(new Date());
  document.getElementById('certMeetings').textContent    = meetingCount;
  document.getElementById('certDoctorShort').textContent = currentDoctor.name;
  document.getElementById('certLevelEn').textContent     = level.en;
  document.getElementById('certLevelTh').textContent     = level.th;
  document.getElementById('certScore').textContent       = level.score + '%';

  const ul = document.getElementById('certSymptoms');
  ul.innerHTML = '';
  [...level.symptoms, getMeetingSymptom(meetingCount)].forEach(s => {
    const li = document.createElement('li'); li.textContent = s; ul.appendChild(li);
  });
  document.getElementById('certRx').textContent          = level.rx;
  document.getElementById('certDoctorName').textContent  = currentDoctor.name;
  document.getElementById('certDoctorTitle').textContent = currentDoctor.title;

  showScreen('result');

  // Cert reveal animation
  const wrap = document.getElementById('certRevealWrap');
  wrap.classList.remove('printing');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    wrap.classList.add('printing');
  }));

  // Score bar animates after cert reveals enough (~60% through animation)
  setTimeout(() => {
    document.getElementById('certBarFill').style.width = level.score + '%';
  }, 1200);
}

// ===== SAVE PNG (IG Story 9:16) =====
document.getElementById('savePngBtn').addEventListener('click', async () => {
  const btn = document.getElementById('savePngBtn');
  const orig = btn.textContent;
  btn.textContent = 'กำลังสร้าง...';
  btn.disabled = true;

  try {
    await document.fonts.ready;
    const cert = document.getElementById('certificate');

    // Temporarily remove clip animation so html2canvas sees full cert
    const wrap = document.getElementById('certRevealWrap');
    const prevStyle = wrap.style.cssText;
    wrap.style.clipPath = 'none';
    wrap.classList.remove('printing');

    const certCanvas = await html2canvas(cert, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#EDE8D6',
      logging: false,
    });

    wrap.style.cssText = prevStyle;
    wrap.classList.add('printing');

    // IG Story canvas: 1080 × 1920 (9:16)
    const IG_W = 1080, IG_H = 1920;
    const ig = document.createElement('canvas');
    ig.width = IG_W; ig.height = IG_H;
    const ctx = ig.getContext('2d');

    // Dark background
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, IG_W, IG_H);

    // Printer bar at top
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(0, 0, IG_W, 90);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 90, IG_W, 8);

    // LED dots
    const ledR = 7;
    ctx.beginPath(); ctx.arc(40, 45, ledR, 0, Math.PI * 2);
    ctx.fillStyle = '#27ae60'; ctx.fill();
    ctx.beginPath(); ctx.arc(IG_W - 40, 45, ledR, 0, Math.PI * 2);
    ctx.fillStyle = '#27ae60'; ctx.fill();

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.font = '400 18px "Space Mono", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BURN YOUNG BRO CLINIC · DIAGNOSTIC PRINTER', IG_W / 2, 52);

    // Center certificate in remaining space
    const availH = IG_H - 98 - 60; // below printer bar, above bottom
    const scale = Math.min((IG_W - 80) / certCanvas.width, availH / certCanvas.height);
    const dw = certCanvas.width * scale;
    const dh = certCanvas.height * scale;
    const dx = (IG_W - dw) / 2;
    const dy = 98 + (availH - dh) / 2;
    ctx.drawImage(certCanvas, dx, dy, dw, dh);

    // Subtle bottom bar
    ctx.fillStyle = '#1c1c1e';
    ctx.fillRect(0, IG_H - 60, IG_W, 60);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.font = '400 16px "Space Mono", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BURN YOUNG BRO · BURNOUT DIAGNOSTIC CENTER', IG_W / 2, IG_H - 22);

    const link = document.createElement('a');
    link.download = `burn-young-bro-story-${Date.now()}.png`;
    link.href = ig.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error(err);
    alert('ไม่สามารถบันทึกรูปได้\nลองกดพิมพ์แทนได้เลย');
  } finally {
    btn.textContent = orig;
    btn.disabled = false;
  }
});

// ===== PRINT =====
document.getElementById('printBtn').addEventListener('click', () => window.print());

// ===== REDO =====
document.getElementById('redoBtn').addEventListener('click', () => {
  if (photoDataUrl && photoDataUrl.startsWith('blob:')) URL.revokeObjectURL(photoDataUrl);
  photoDataUrl = null; photoFile = null;
  photoInput.value = '';
  const fp = document.getElementById('formPhoto');
  fp.removeAttribute('src');
  fp.classList.remove('loaded');
  document.getElementById('meetingSelect').value = '';
  document.getElementById('notesInput').value = '';
  photoZone.classList.remove('has-photo');
  initIntake();
  showScreen('intake');
});

// ===== UTILS =====
function formatDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}
