# Burn Young Bro

> เพราะคุณก็รู้ว่าตัวเองเป็นยังไง — Official Burnout Diagnostic Center

โปรเจคทดลอง: อัปโหลดรูปหน้าตัวเอง → ระบบ "วิเคราะห์" ออกใบวินิจฉัย burnout → save/print แปะฝาผนัง

---

## Concept

- ถ่ายรูป / อัปโหลดรูปหน้า
- Fake AI analysis (scanning animation + progress log)
- ออก Burnout Diagnostic Report แบบ retro propaganda poster
- Save PNG / Print — เอาไว้แปะฝาผนัง

**ไม่มี real AI analysis** — เป็น fun randomized ตั้งใจ · copy + visual คือ value หลัก

---

## Burnout Levels (5 tiers)

| Level | EN | TH | Score range |
|---|---|---|---|
| L1 | MILDLY TOASTED | เริ่มเกรียมนิดๆ | 18–31% |
| L2 | MEDIUM DONE | สุกกลางๆ แล้ว | 34–49% |
| L3 | CRISPY | กรอบพอดีเลย | 52–67% |
| L4 | FULLY BURNT | ไหม้เต็มที่แล้ว | 70–83% |
| L5 | CHARCOAL | ถ่านแท้ 100% | 86–96% |

---

## Design decisions

- **Analysis type:** Fake/randomized (fun, no API cost, pure frontend)
- **Card aesthetic:** Retro propaganda poster — red + aged paper + Anton font
- **Photo treatment:** CSS sepia + contrast filter (looks archival)
- **Export:** html2canvas → PNG (scale 2.5x for quality) + window.print()
- **Privacy:** รูปทำงานใน browser เท่านั้น ไม่ส่งขึ้น server

---

## Files

```
index.html   — 3 screens (upload · analyze · result/poster)
style.css    — retro propaganda stylesheet
script.js    — logic + randomization + save/print
assets/      — (ว่าง, reserve ไว้)
```

---

## History

- เดิม: **ปากพาวิ่ง** (pak-pa-wing) → **Trust Me Bro** (World Cup × running bet)
- Pivot 22/06/2026: รื้อใหม่ทั้งหมด → **Burn Young Bro** (burnout diagnostic)
