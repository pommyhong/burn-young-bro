/* =====================================================
   BURN YOUNG BRO CLINIC — script.js
   ===================================================== */

// ===== DATA =====

const LEVELS = [
  {
    en: "TECHNICALLY ALIVE",
    th: "ยังมีชีพจรอยู่",
    header: "ยังมีชีพจรอยู่ — ยืนยันแล้ว",
    body: "อาการเบื้องต้น แต่ร่างกายเริ่มส่งสัญญาณแล้ว",
    range: [18, 31],
    symptoms: [
      "ยิ้มทุกคน แต่ข้างในไม่โอเคเลยแม้แต่นิดเดียว",
      "หยิบโทรศัพท์ขึ้นมาดูซ้ำๆ โดยไม่มีจุดประสงค์",
      "พูดว่า 'เดี๋ยวทำ' มาสามอาทิตย์แล้ว ยังไม่ได้ทำ",
    ],
    rx: "นอนก่อนตี 2 ติดกัน 3 คืน — ไม่ต้องทำอะไรเพิ่ม",
  },
  {
    en: "SPIRITUALLY OFFLINE",
    th: "ออฟไลน์ทางจิตใจ",
    header: "ออฟไลน์ทางจิตใจ อย่างเป็นทางการ",
    body: "ทุกคนรู้ว่าไม่โอเค แต่ก็ถามว่า fine อยู่ดี",
    range: [34, 49],
    symptoms: [
      "กาแฟแก้วที่สามแต่ยังง่วง — ร่างกายยอมแพ้แล้ว",
      "วางแผนพักผ่อนทุกคืน แต่ตี 2 ยังตาค้างจ้องเพดาน",
      "มีคนทักมา เห็นแล้วเลื่อนผ่าน ตอบทีหลัง (ไม่ได้ตอบ)",
    ],
    rx: "ลาหยุด 1 วัน โดยไม่รู้สึกผิด — สำคัญมาก",
  },
  {
    en: "EMOTIONALLY UNAVAILABLE",
    th: "ไม่ว่างทางอารมณ์",
    header: "ไม่ว่างทางอารมณ์ — ยืนยันผลแล้ว",
    body: "ผู้ป่วยขอสงวนสิทธิ์ไม่รู้สึกอะไรก่อนชั่วคราว",
    range: [52, 67],
    symptoms: [
      "นึกไม่ออกแล้วว่า hobby ของตัวเองคืออะไร",
      "เปิดหน้าจอไว้ 47 แท็บ ไม่มีแท็บไหนที่กำลังจะดูจริงๆ",
      "อยู่บ้านก็อยากออก ออกไปแล้วก็อยากกลับ ไม่รู้ว่าอยากอะไร",
    ],
    rx: "หยุดดูหน้าจอสักชั่วโมง — ยากมาก เราก็รู้",
  },
  {
    en: "PLEASE DO NOT CONTACT",
    th: "กรุณาอย่าติดต่อ",
    header: "กรุณาอย่าติดต่อ — ขอบคุณ",
    body: "inbox รอคุณอยู่ แต่คุณไม่รอมันแล้ว",
    range: [70, 83],
    symptoms: [
      "ฝันเห็นนาฬิกาปลุกแล้วรู้สึกเศร้า",
      "เห็นคนอื่นตื่นเต้นกับชีวิตแล้วงงว่าทำยังไง",
      "นึกไม่ออกว่าครั้งสุดท้ายที่รู้สึกโอเคจริงๆ คือเมื่อไหร่",
    ],
    rx: "บอกลาออฟฟิศสักสัปดาห์ อย่าเปิดอะไรทั้งนั้น",
  },
  {
    en: "HAS LEFT THE CHAT",
    th: "ออกจากกลุ่มแล้ว",
    header: "ออกจากกลุ่มแล้ว — ไม่มีการแจ้งเตือน",
    body: "คลินิกขอแสดงความเสียใจอย่างสุดซึ้ง",
    range: [86, 96],
    symptoms: [
      "ไม่อยากทำอะไรทั้งนั้น รวมถึงสิ่งที่เคยชอบ",
      "มีแผนหนีไปอยู่ป่า เลี้ยงแกะ หรือเปลี่ยนชื่อ",
      "เข้าใจแล้วว่าทำไมคนถึงหายไปโดยไม่บอกใคร",
    ],
    rx: "Witness protection program — ติดต่อได้ที่ไหนก็ไม่รู้",
  },
];

const DOCTORS = [
  { name: "หมอกิตติ สิงหาคม",    title: "อายุรแพทย์" },
  { name: "หมอนุ้ย ลาก่อนนะ",   title: "จิตแพทย์" },
  { name: "หมอบิ๊ก แวะมาดู",    title: "แพทย์ทั่วไป" },
  { name: "พญ.ติ๊ก ทนดูอยู่",   title: "ที่ปรึกษา" },
  { name: "หมอต้น พักก่อนเด้อ", title: "แพทย์" },
];

function getMeetingSymptom(count) {
  if (count <= 1) return "meeting 1 ครั้ง — ยังพอมีชีวิตรอด";
  if (count <= 3) return `${count} meetings · ยังมีเวลาหายใจอยู่บ้าง`;
  if (count <= 5) return `${count} meetings — Calendar เริ่มดูเหมือน Tetris`;
  if (count <= 7) return `${count} meetings ใน 1 วัน · ทำงานจริงๆ ได้เมื่อไหร่กัน`;
  return "8+ meetings — ร่างกายอยู่ในห้องประชุม จิตใจไปแล้ว ดีนะ";
}

// ===== STATE =====
let photoDataUrl = null;   // blob: URL for display
let typingActive = false;  // stops typewriter sound when screen transitions
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
  photoFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    photoDataUrl = e.target.result; // data: URL — html2canvas safe, no CORS
    setFormPhoto(photoDataUrl);
  };
  reader.readAsDataURL(file);
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

function playPrintFeed(durationSec) {
  try {
    const ctx = getAudioCtx();
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * durationSec);
    const buf = ctx.createBuffer(1, len, sr);
    const d   = buf.getChannelData(0);
    // Rhythmic paper-roller noise (~7Hz step cadence)
    for (let i = 0; i < len; i++) {
      const t   = i / sr;
      const env = 0.55 + 0.45 * Math.sin(2 * Math.PI * 7 * t);
      d[i] = (Math.random() * 2 - 1) * 0.024 * env;
    }
    const src = ctx.createBufferSource(); src.buffer = buf;
    const lp  = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700;
    const g   = ctx.createGain();
    g.gain.setValueAtTime(0.75, ctx.currentTime);
    g.gain.setValueAtTime(0.75, ctx.currentTime + durationSec - 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    src.connect(lp); lp.connect(g); g.connect(ctx.destination);
    src.start(); src.stop(ctx.currentTime + durationSec);
  } catch(e) {}
}

// ===== TYPEWRITER =====
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runTypewriter(meetingCount) {
  typingActive = true;
  const patientName = document.getElementById('patientName').value.trim() || 'ไม่ระบุชื่อ';
  const cortisol = 60 + Math.floor(Math.random() * 30);
  const eyebag   = ['สูง', 'สูงมาก', 'วิกฤต'][Math.floor(Math.random() * 3)];
  const lines = [
    `หมอกำลังวินิจฉัย · ผู้ป่วย: ${patientName}`,
    `HN: ${generatedHN} · สแกนใบหน้า...`,
    `วัดระดับ "ทำไมต้องฉัน": ${cortisol}/100`,
    `ถุงใต้ตา: ${eyebag} · ประชุม ${meetingCount} ครั้ง`,
    `ประมวลผล · กรุณารอสักครู่...`,
    `✓ วินิจฉัยเสร็จสิ้น → กำลังพิมพ์ใบรับรอง`,
  ];

  document.getElementById('twHN').textContent = generatedHN;
  const out = document.getElementById('twOutput');
  out.textContent = '';

  for (const line of lines) {
    for (const ch of line) {
      if (!typingActive) return;
      out.textContent += ch;
      playTypeClick();
      pressRandomKey();
      await sleep(Math.random() * 85 + 55);
    }
    if (!typingActive) return;
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
  typingActive = false;
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
  document.getElementById('certLevelHeader').textContent = level.header;
  document.getElementById('certLevelBody').textContent   = level.body;
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

  // Cert reveal — brief pause so user sees the printer machine, then paper feeds
  const wrap = document.getElementById('certRevealWrap');
  wrap.classList.remove('printing');
  setTimeout(() => {
    wrap.classList.add('printing');
    playPrintFeed(3.5);
  }, 700);

  // Score bar animates at ~60% through 3.5s animation
  setTimeout(() => {
    document.getElementById('certBarFill').style.width = level.score + '%';
  }, 2800);
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

    // Temporarily unhide cert + hide doctor row for export
    const wrap = document.getElementById('certRevealWrap');
    wrap.style.clipPath = 'none';
    wrap.style.transform = 'none';
    wrap.style.animation = 'none';
    const doctorRow = cert.querySelector('.cert-doctor-row');
    if (doctorRow) doctorRow.style.display = 'none';

    const certCanvas = await html2canvas(cert, {
      scale: Math.max(window.devicePixelRatio || 2, 2),
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#EDE8D6',
      logging: false,
    });

    wrap.style.clipPath = '';
    wrap.style.transform = '';
    wrap.style.animation = '';
    if (doctorRow) doctorRow.style.display = '';

    const dataUrl = certCanvas.toDataURL('image/png');
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      // iOS Safari doesn't support link.download — open in new tab, user long-press to save
      const w = window.open();
      w.document.write(`<img src="${dataUrl}" style="max-width:100%;display:block">`);
      w.document.title = 'burn-young-bro';
    } else {
      const link = document.createElement('a');
      link.download = `burn-young-bro-story-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
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
  photoDataUrl = null;
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
