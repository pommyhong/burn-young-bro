/* =====================================================
   BURN YOUNG BRO CLINIC — script.js
   ===================================================== */

// ===== DATA =====

const LEVELS = [
  {
    en: "BARELY FUNCTIONING",
    th: "ยังพอเป็นคนอยู่ (หวุดหวิด)",
    headerList: [
      "ยังชาร์จอยู่ — สถานะปลอดภัย",
      "แบตเหลือเยอะ — แต่หมอจับตาดูอยู่",
      "ระดับ: สดใสน่าอิจฉา (อย่าเพิ่งเชื่อ)",
      "ผลตรวจ: ดีเกินคนทำงาน — ผิดปกติเล็กน้อย",
    ],
    bodyList: [
      "ผู้ป่วยยังมีพลังเหลือ — กรณีหายาก",
      "ขอแสดงความยินดี คุณยังเป็นมนุษย์ที่ใช้งานได้",
      "ยังตื่นเช้าได้โดยไม่ก่นด่าจักรวาล",
      "หมอตรวจแล้วงง ว่าทำไมยังไหวอยู่",
    ],
    range: [8, 17],
    symptoms: [
      "ยังตอบ 'อรุณสวัสดิ์' ในกลุ่มงานได้แบบจริงใจ",
      "เห็น noti แล้วเปิดอ่านทันที (ยังไม่เข็ด)",
      "วางแผนวันหยุดแล้วได้ไปจริงๆ",
      "ยังจำได้ว่ากินข้าวเที่ยงกับใครเมื่อวาน",
      "ปฏิเสธงานเพิ่มได้โดยไม่รู้สึกผิดมาก",
      "เปิดปฏิทินแล้วยังมีช่องว่างเหลืออยู่",
      "หัวเราะกับมุกในที่ประชุมแบบไม่ฝืน",
      "ยังมีไฟอยากลองทำอะไรใหม่ๆ",
      "ตื่นมาแล้วไม่ได้คิดถึงงานเป็นอย่างแรก",
      "ดื่มกาแฟเพราะชอบ ไม่ใช่เพราะจำเป็น",
    ],
    rxList: [
      "รักษาระดับนี้ไว้ — อย่ารับงานเพิ่มเพราะ 'ว่าง'",
      "จดไว้ว่าวันนี้รู้สึกดี — ไว้อ่านตอนวันแย่ๆ",
      "ชวนเพื่อนที่ดูเหนื่อยกว่ามาตรวจบ้าง",
      "ตั้ง status เป็น 'ยุ่งมาก' ทั้งที่ว่าง — กันงานเข้า",
      "จองห้องประชุมไว้คนเดียว ติดป้ายหน้าห้อง 'workshop ลับ'",
      "reply email ช้าลง 1 ชั่วโมง ฝึกให้คนชินกับความเงียบ",
      "แอบสลับกาแฟหัวหน้าเป็น decaf ดูเขางัวเงียบ้าง",
      "เซฟใบนี้ส่งหัวหน้า แคปชั่น 'หมอสั่งพักครับ/ค่ะ'",
      "ลาป่วยล่วงหน้า — จองวันศุกร์ไว้ก่อนทั้งเดือน",
      "ส่งใบรับรองเข้ากลุ่มบริษัท ให้ทุกคนรู้ว่ากำลังป่วย",
    ],
  },
  {
    en: "STILL TWITCHING",
    th: "ยังกระตุกอยู่ (เสียดาย)",
    headerList: [
      "ยังมีชีพจรอยู่ — ยืนยันแล้ว",
      "เหนื่อยนิดๆ แต่ยังโอเค — ยืนยันโดยผู้เชี่ยวชาญ",
      "ระดับ: ยังรับได้ — แต่อย่าเพิ่มงานอีกนะ",
      "สัญญาณชีพ: ปกติ · ขวัญชีพ: เริ่มโยกเยก",
    ],
    bodyList: [
      "อาการเบื้องต้น แต่ร่างกายเริ่มส่งสัญญาณแล้ว",
      "ขอแสดงความยินดีที่ยังมาทำงานได้",
      "ผู้ป่วยยังสามารถยิ้มได้โดยไม่ปลอม (บางครั้ง)",
      "ยังไม่วิกฤต แต่อยู่ในโซนเฝ้าระวัง",
    ],
    range: [18, 27],
    symptoms: [
      "ยิ้มทุกคน แต่ข้างในไม่โอเคเลยแม้แต่นิดเดียว",
      "หยิบโทรศัพท์ขึ้นมาดูซ้ำๆ โดยไม่มีจุดประสงค์",
      "พูดว่า 'เดี๋ยวทำ' มาสามอาทิตย์แล้ว ยังไม่ได้ทำ",
      "เปิด email อ่านหัวเรื่องแล้ว mark อ่านแล้วโดยไม่เปิด",
      "ประชุมจบถามตัวเองว่า 'เมื่อกี้คุยเรื่องอะไร' ไม่รู้จริงๆ",
      "ทำ to-do list เสร็จแล้วภูมิใจ แต่ไม่ได้ทำอะไรในนั้นเลย",
      "scroll ซ้ำๆ 40 นาทีโดยไม่หัวเราะสักครั้ง",
      "ส่ง 'โอเคค่ะ' ไปแล้วแต่ยังไม่รู้ว่าโอเคอะไร",
      "เปิด Figma แล้วนั่งเฉยๆ 15 นาที แล้วก็ปิด",
      "ดื่มน้ำแก้วเดิมตั้งแต่เช้า ยังเหลืออยู่ครึ่งแก้ว",
    ],
    rxList: [
      "นอนก่อนตี 2 ติดกัน 3 คืน — ไม่ต้องทำอะไรเพิ่ม",
      "เลิกตอบ Slack หลัง 6 โมงสักอาทิตย์ดู",
      "พักกลางวัน 20 นาทีโดยไม่จับโทรศัพท์",
      "แปะใบรับรองไว้หน้าจอ ให้หัวหน้าเดินผ่านเห็นทุกวัน",
      "forward เข้าเมล HR cc หัวหน้า หัวข้อ 'เพื่อทราบ'",
      "ตอบทุก meeting invite ว่า 'ติดคิวหมอ' แนบใบนี้",
      "เปลี่ยนรูปโปรไฟล์ Teams เป็นใบรับรองนี้",
      "ขอแลก OT เป็นวันลาแทนเงิน — ลองดูสีหน้า HR",
      "พิมพ์ใบนี้ใส่กรอบวางบนโต๊ะ ข้างรูปครอบครัว",
      "ส่งให้แฟน/เพื่อน เป็นหลักฐานว่า 'เห็นมั้ย ไม่ได้แกล้ง'",
    ],
  },
  {
    en: "DEAD INSIDE (LITE)",
    th: "ใจตายไปแล้วครึ่งดวง",
    headerList: [
      "ออฟไลน์ทางจิตใจ อย่างเป็นทางการ",
      "กายอยู่ · ใจไปแล้ว — รับทราบ",
      "โหมดประหยัดพลังงาน — เปิดใช้งานแล้ว",
      "disconnected from mainframe — ตรวจพบ",
    ],
    bodyList: [
      "ทุกคนรู้ว่าไม่โอเค แต่ก็ถามว่า fine อยู่ดี",
      "ผู้ป่วยปรากฏกายในที่ทำงานแต่ไม่ได้มาจริงๆ",
      "ทำงานได้แต่ไม่มี passion เหลืออยู่",
      "ร่างกายรันอยู่ แต่จิตใจออฟไลน์ชั่วคราว",
    ],
    range: [28, 37],
    symptoms: [
      "กาแฟแก้วที่สามแต่ยังง่วง — ร่างกายยอมแพ้แล้ว",
      "วางแผนพักผ่อนทุกคืน แต่ตี 2 ยังตาค้างจ้องเพดาน",
      "มีคนทักมา เห็นแล้วเลื่อนผ่าน ตอบทีหลัง (ไม่ได้ตอบ)",
      "ตอบ 'งานเยอะมาก' ทุกครั้งที่มีคนถาม แม้แต่ตอนวันหยุด",
      "ลืมกินข้าวกลางวันเพราะประชุม แต่ก็ไม่หิว",
      "เปิด Netflix เลือกซีรีส์อยู่ 40 นาที แล้วปิดไปนอน",
      "ตั้งนาฬิกาปลุก 6 ครั้ง ตั้งแต่ 06:00 ถึง 07:30",
      "อ่านข้อความเดิม 3 รอบแต่ยังตอบไม่ออก",
      "ซื้อของเข้าบ้านเยอะขึ้นโดยไม่รู้ว่าอยากได้อะไรจริงๆ",
      "browser tab เปิดร้านอาหารไว้ทั้งวันแต่ไม่ได้ไปไหน",
    ],
    rxList: [
      "ลาหยุด 1 วัน โดยไม่รู้สึกผิด — สำคัญมาก",
      "บอกใครสักคนว่าไม่โอเค แค่นั้นพอ ไม่ต้องอธิบาย",
      "นอนก่อน 23:00 แค่คืนเดียวก่อน",
      "ตั้ง auto-reply ว่า 'ใจออกไปข้างนอก ยังไม่ทราบกำหนดกลับ'",
      "ขอย้ายโต๊ะไปมุมที่หัวหน้ามองไม่เห็น",
      "ส่งใบนี้ให้ HR พร้อมเขียนว่า 'ขอ work from เตียง'",
      "ประชุมเปิดกล้องเอาใบนี้ขึ้นแทนหน้า",
      "พิมพ์แจกทั้งทีม จัด 'งานเลี้ยงคนใจตาย' กลางออฟฟิศ",
      "ตั้งชื่อเล่นใหม่ในออฟฟิศว่า 'พี่หมดไฟ'",
      "แปะใบนี้ในห้องน้ำบริษัท ให้กำลังใจคนที่ก็เป็น",
    ],
  },
  {
    en: "BRAIN NOT FOUND",
    th: "หาสมองไม่เจอ (404)",
    headerList: [
      "กำลังโหลด... — โปรดรอ (นานหน่อย)",
      "ระบบค้าง 99% — ยังไม่ขยับ",
      "loading… loading… loading… — ตรวจพบ",
      "หมุนติ้วๆ อยู่ — แต่ไม่ไปไหน",
    ],
    bodyList: [
      "ผู้ป่วยกำลังประมวลผลชีวิต · กรุณาอย่าปิดเครื่อง",
      "สมองเปิดอยู่ แต่โหลดไม่เสร็จสักที",
      "อยากทำหลายอย่าง แต่ทำไม่ได้สักอย่าง",
      "ระบบตอบสนองช้าลงอย่างเห็นได้ชัด",
    ],
    range: [38, 47],
    symptoms: [
      "อ่านประโยคเดิมสามรอบยังไม่เข้าหัว",
      "เปิดไฟล์งานค้างไว้ จ้องมัน 10 นาทีแล้วไปชงกาแฟ",
      "คิดงานออกตอนอาบน้ำ ออกมาแล้วลืมหมด",
      "พิมพ์ไป ลบไป พิมพ์ใหม่ สุดท้ายส่งประโยคเดิม",
      "ตั้งใจจะเริ่มงาน 9 โมง เริ่มจริง 11 โมงครึ่ง",
      "มี 3 งานต้องทำ เลยทำข้อ 4 ที่ไม่เร่งแทน",
      "เปิด 12 แท็บเพื่อหาคำตอบเดียว ลืมว่าจะหาอะไร",
      "ตอบแชทเร็วมาก แต่งานหลักไม่ขยับเลย",
      "นั่งประชุมแล้วจดเลขเฉยๆ ไม่ได้ฟัง",
      "to-do เพิ่มเร็วกว่าที่ขีดฆ่าออกได้",
    ],
    rxList: [
      "ทำทีละอย่าง ปิดแท็บที่เหลือให้หมด",
      "เขียนแค่ 3 อย่างที่ต้องทำวันนี้ พอ",
      "ลุกไปเดิน 5 นาที แล้วค่อยกลับมาเริ่มใหม่",
      "ตอบทุกคำถามหัวหน้าว่า 'ขอ search ก่อนนะ' แล้วเงียบไป",
      "ตั้งรหัสคอมเป็น 'iQuit2026' พิมพ์ทุกเช้าเตือนตัวเอง",
      "ขอ HR เพิ่มสวัสดิการ 'ลาเพราะสมองหาย'",
      "เปลี่ยน ringtone แจ้งเตือนเป็นเสียงกรี๊ด",
      "พิมพ์ใบนี้แปะตู้เย็นออฟฟิศ ทับโน้ต 'ใครเอานมไป'",
      "ส่งให้หัวหน้าตอนตี 3 ให้รู้ว่าคุณก็ไม่ได้นอน",
      "เขียน 'สมองกำลังโหลด' ใส่กระดาษแปะหน้าผาก",
    ],
  },
  {
    en: "OUT OF HUMANITY",
    th: "ความเป็นคนหมดสต็อก",
    headerList: [
      "ไม่ว่างทางอารมณ์ — ยืนยันผลแล้ว",
      "อารมณ์ตอบไม่รับสาย — ยืนยัน",
      "feelings on do not disturb — ผลออกแล้ว",
      "ใจอยู่ที่อื่น ไม่รู้ว่าที่ไหน — ตรวจพบ",
    ],
    bodyList: [
      "ผู้ป่วยขอสงวนสิทธิ์ไม่รู้สึกอะไรก่อนชั่วคราว",
      "ระบบ emotional response ถูก mute ไว้ก่อน",
      "ผู้ป่วยไม่ได้เย็นชา แค่แบตหมดแล้ว",
      "ขอแสดงความเสียใจ · โปรด recharge ก่อนนัดหน้า",
    ],
    range: [48, 57],
    symptoms: [
      "นึกไม่ออกแล้วว่า hobby ของตัวเองคืออะไร",
      "เปิดหน้าจอไว้ 47 แท็บ ไม่มีแท็บไหนที่กำลังจะดูจริงๆ",
      "อยู่บ้านก็อยากออก ออกไปแล้วก็อยากกลับ ไม่รู้ว่าอยากอะไร",
      "มีคนถามว่าเป็นยังไงบ้าง ตอบ 'โอเค' ทั้งที่ไม่โอเคเลย",
      "ดูหนังจบแล้วไม่รู้สึกอะไร ทั้งที่ดูมาสองชั่วโมง",
      "ส่งสติกเกอร์ยิ้มเพราะไม่รู้จะพูดอะไรดี",
      "เดินไปครัวแล้วลืมว่าจะทำอะไร กลับมานั่งเฉยๆ",
      "ได้ยินเพลงที่เคยชอบแล้วไม่รู้สึกอะไรเลย",
      "งานเสร็จแต่ไม่ภูมิใจ แค่โล่งที่มันจบ",
      "เวลาว่างแล้วไม่รู้จะทำอะไร เลยกลับไปทำงานต่อ",
    ],
    rxList: [
      "หยุดดูหน้าจอสักชั่วโมง — ยากมาก เราก็รู้",
      "ออกไปนั่งข้างนอกโดยไม่เอาโทรศัพท์ไป 30 นาที",
      "โทรหาคนที่คุยสบาย ไม่ต้องมีประเด็น",
      "ตอบหัวหน้าด้วย emoji อย่างเดียว 1 วันเต็ม",
      "ตั้ง OOO ว่า 'มนุษย์คนนี้ปิดปรับปรุงชั่วคราว'",
      "ขอ HR ทำ name tag ใหม่ว่า 'หุ่นยนต์หมายเลข 7'",
      "เอาใบนี้ทำสติกเกอร์ไลน์ ส่งแทนคำพูดทุกครั้ง",
      "จองวันลาพักร้อนทั้งปีรวดเดียว — ให้ระบบ HR error",
      "แปะใบนี้บนเก้าอี้หัวหน้าแบบเนียนๆ",
      "ส่งเข้ากลุ่มครอบครัว ขอความเห็นใจจากที่บ้าน",
    ],
  },
  {
    en: "DRAGGING THE CORPSE",
    th: "ลากสังขารมาทำงาน",
    headerList: [
      "วิ่งด้วยไอเสีย — ใกล้หมดถัง",
      "แบตเหลือ 3% — ยังไม่ยอมเสียบชาร์จ",
      "fuel: empty · momentum: pure willpower",
      "ไม่เหลือแรงแล้ว แต่ยังไม่หยุด — ตรวจพบ",
    ],
    bodyList: [
      "ผู้ป่วยขับเคลื่อนด้วยกาแฟกับความกลัวตกงาน",
      "ไม่มีพลังเหลือ แต่ยังฝืนไปต่อทุกวัน",
      "ร่างกายส่งใบลาออกแล้ว แต่เจ้าตัวไม่เซ็น",
      "วิ่งมาไกลเกินกว่าจะยอมหยุดตรงนี้ (แต่ควรหยุด)",
    ],
    range: [58, 67],
    symptoms: [
      "ตื่นมาเหนื่อยกว่าตอนเข้านอน",
      "นับถอยหลังถึงวันศุกร์ตั้งแต่เช้าวันจันทร์",
      "ดื่มกาแฟไม่ใช่เพื่อตื่น แต่เพื่อไม่ให้ล้ม",
      "วันหยุดเอาแต่นอน ตื่นมาก็ยังเพลีย",
      "ยิ้มในรูปทีม แต่ในใจอยากกลับบ้าน",
      "ทำงานเสร็จด้วย autopilot จำไม่ได้ว่าทำยังไง",
      "หิวแต่ขี้เกียจกิน ง่วงแต่นอนไม่ลง",
      "เก็บอาการไว้คนเดียว เพราะอธิบายไม่ไหวแล้ว",
      "รู้ว่าควรพัก แต่กลัวงานกองถ้าหยุด",
      "ฝืนยิ้มจนปวดแก้ม แต่ตายังล้าอยู่",
    ],
    rxList: [
      "หยุดเติมแรงด่วน — ลาพักร้อนสัก 2 วันก่อนพังจริง",
      "บอกหัวหน้าว่าโหลดเกิน — ก่อนที่ร่างกายจะบอกแทน",
      "ตัดงานออก 1 อย่างวันนี้ ไม่มีใครตายหรอก",
      "ส่งใบนี้ให้หัวหน้าแทน report สัปดาห์นี้",
      "ขอ HR เพิ่มประกันชีวิต บอกว่า 'มีลาง'",
      "ตั้ง calendar block ทั้งวันว่า 'ฟื้นคืนชีพ'",
      "พิมพ์ใบนี้แจกในวันประชุมทีม แทนวาระการประชุม",
      "เปลี่ยน signature เมลเป็น 'ส่งจากเตียงผู้ป่วย'",
      "ขอย้ายแผนกไปที่ที่ไม่มี deadline (ถ้ามีจริง)",
      "วางแผนหนีไปทะเล แล้วเปิดใบนี้เป็นข้ออ้าง",
    ],
  },
  {
    en: "DO NOT RESUSCITATE",
    th: "ห้ามปั๊มหัวใจ · ปล่อยไป",
    headerList: [
      "กรุณาอย่าติดต่อ — ขอบคุณ",
      "ไม่รับสาย · ไม่ตอบ · ไม่โอเค — รับทราบ",
      "left on read — ผลการตรวจยืนยัน",
      "out of office — indefinitely — ตรวจพบ",
    ],
    bodyList: [
      "inbox รอคุณอยู่ แต่คุณไม่รอมันแล้ว",
      "ผู้ป่วยอยู่ในโหมดเงียบแบบถาวร",
      "ทุกอย่างอยู่ใน queue แต่ไม่มีใครจะเปิดดู",
      "calendar เต็ม แต่ตัวเจ้าของ calendar ไปแล้ว",
    ],
    range: [68, 76],
    symptoms: [
      "ฝันเห็นนาฬิกาปลุกแล้วรู้สึกเศร้า",
      "เห็นคนอื่นตื่นเต้นกับชีวิตแล้วงงว่าทำยังไง",
      "นึกไม่ออกว่าครั้งสุดท้ายที่รู้สึกโอเคจริงๆ คือเมื่อไหร่",
      "พิมพ์ข้อความยาวมากแล้วลบทิ้ง ส่งแค่ว่า 'โอเค'",
      "อยากบอกว่าไม่ไหวแล้ว แต่ก็ยังรับงานต่อ",
      "โทรศัพท์ดัง เห็นชื่อแล้ววางทิ้งไว้ก่อน",
      "เห็น notification 47 อัน ปิดหน้าจอแล้วไปต่อ",
      "calendar เต็มอีก 3 อาทิตย์ข้างหน้า แต่ก็รับ invite ต่อ",
      "นอนแล้วคิดเรื่องงาน ตื่นมาก็คิดต่อ ไม่รู้จะหยุดตอนไหน",
      "ยิ้มในประชุมทั้งวัน กลับบ้านแล้วนั่งเงียบๆ ไม่อยากพูด",
    ],
    rxList: [
      "บอกลาออฟฟิศสักสัปดาห์ อย่าเปิดอะไรทั้งนั้น",
      "ปิด notification ทุกอย่างแค่วันเสาร์วันเดียวก่อน",
      "ยกเลิก meeting ที่ไม่จำเป็นสัก 1 อัน — แค่อันเดียวก็ยังดี",
      "ส่งใบนี้ให้ HR แล้วเขียนว่า 'ขอใช้สิทธิ์ลาตาย'",
      "ตั้ง status ถาวรว่า 'ห้ามรบกวน · กำลังกู้ชีพ'",
      "เอาใบนี้ตั้งเป็น wallpaper คอมบริษัท",
      "ขอประชุมกับหัวหน้าหัวข้อเดียว: 'ทำไม'",
      "จองห้องประชุมใหญ่สุดไว้นอนกลางวัน",
      "forward ใบนี้ให้ CEO cc ทั้งบริษัท (เล่นๆ นะ)",
      "พิมพ์แปะประตูทางออกฉุกเฉิน — เผื่อต้องใช้จริง",
    ],
  },
  {
    en: "ABOUT TO COMBUST",
    th: "ใกล้ไหม้เป็นจุณ",
    headerList: [
      "ระบบร้อนเกินไป — กรุณาปิดเครื่องพัก",
      "อุณหภูมิแกนหลักวิกฤต — ใกล้ไหม้",
      "CPU 100% ต่อเนื่อง 6 เดือน — ตรวจพบ",
      "พัดลมหมุนเต็มแรง แต่ยังร้อนอยู่",
    ],
    bodyList: [
      "ผู้ป่วยทำงานเกินสเปกที่ร่างกายรับได้นานแล้ว",
      "ระบบกำลังจะ shutdown เพื่อป้องกันตัวเอง",
      "หงุดหงิดง่ายขึ้น น้ำตาใกล้ขึ้นโดยไม่มีเหตุผล",
      "ความอดทนเหลือศูนย์ · พร้อมระเบิดทุกเมื่อ",
    ],
    range: [77, 85],
    symptoms: [
      "เรื่องเล็กๆ ทำให้อยากร้องไห้โดยไม่รู้ทำไม",
      "หัวเสียกับ noti เด้งเดียว ทั้งที่ปกติเฉยๆ",
      "อยากกรี๊ดในห้องประชุมแต่ก็พิมพ์ 'รับทราบค่ะ'",
      "ใจสั่นตอนเห็นชื่อหัวหน้าเด้งขึ้นมา",
      "นอนไม่หลับเพราะสมองไม่ยอมปิดสวิตช์",
      "ลืมง่ายขึ้นมาก จดแล้วยังลืมว่าจดไว้ไหน",
      "กัดฟันแน่นตอนนอนจนตื่นมาปวดกราม",
      "อ่านข้อความเฉยๆ แต่ตีความว่าโดนตำหนิ",
      "อยากหายไปสักพักโดยไม่ต้องบอกใคร",
      "ร่างกายเริ่มประท้วง — ปวดหัว ปวดท้อง ไม่มีสาเหตุ",
    ],
    rxList: [
      "หยุดทันที — นี่คือสัญญาณก่อน burnout เต็มขั้น",
      "ไปหาหมอจริงๆ ได้แล้ว ไม่ใช่หมอในเว็บนี้",
      "ลายาวสักสัปดาห์ · งานรอได้ ตัวคุณรอไม่ได้",
      "เขียนใบลาออกเก็บในลิ้นชัก — ยังไม่ต้องส่ง แค่ให้รู้ว่ามี",
      "ส่งใบนี้ให้หัวหน้าพร้อมข้อความ 'อ่านดีๆ นะ'",
      "ขอ HR ติดถังดับเพลิงข้างโต๊ะ",
      "ตั้ง alarm ทุกชั่วโมงว่า 'ยังหายใจอยู่มั้ย'",
      "เอาใบนี้ทำป้ายแขวนคอ เดินไปทั่วออฟฟิศ",
      "จองคิวนวด สปา หมอดู ครบทุกศาสตร์ในวันเดียว",
      "บอกที่บ้านว่าอาจกลับไปอยู่บ้านเฉยๆ สักพัก",
    ],
  },
  {
    en: "SOUL HAS LEFT THE BODY",
    th: "วิญญาณออกจากร่างแล้ว",
    headerList: [
      "ออกจากกลุ่มแล้ว — ไม่มีการแจ้งเตือน",
      "server ไม่ตอบสนอง — ทุกช่องทาง",
      "signal lost · searching… · not found",
      "404 person not found — confirmed",
    ],
    bodyList: [
      "คลินิกขอแสดงความเสียใจอย่างสุดซึ้ง",
      "ผู้ป่วยได้รับการวินิจฉัยว่าหมดไฟอย่างสมบูรณ์แบบ",
      "คลินิกจะจุดเทียนไว้ให้ที่โต๊ะทำงาน",
      "ระบบตรวจพบว่าผู้ป่วยได้ log out จากชีวิตออฟฟิศแล้ว",
    ],
    range: [86, 93],
    symptoms: [
      "ไม่อยากทำอะไรทั้งนั้น รวมถึงสิ่งที่เคยชอบ",
      "มีแผนหนีไปอยู่ป่า เลี้ยงแกะ หรือเปลี่ยนชื่อ",
      "เข้าใจแล้วว่าทำไมคนถึงหายไปโดยไม่บอกใคร",
      "respond ช้าลงเรื่อยๆ จนคนหยุดทักเอง",
      "เห็น task ใหม่แล้วรู้สึกเหมือน load เต็ม ทำอะไรไม่ได้",
      "อยากได้ป่วยเพื่อจะได้พักโดยไม่รู้สึกผิด",
      "วันหยุดก็ไม่หาย วันทำงานก็เหนื่อย ไม่รู้ความต่างแล้ว",
      "เปิดเพลงเพื่อไม่ให้ห้องเงียบเกินไป ไม่ได้ฟังจริงๆ",
      "มองหน้าต่างแล้วนึกถึงที่ที่ไม่มีอีเมล",
      "คนถามว่า 'วันนี้เป็นยังไง' ตอบไม่ออกจริงๆ ไม่ใช่ไม่อยากพูด",
    ],
    rxList: [
      "Witness protection program — ติดต่อได้ที่ไหนก็ไม่รู้",
      "ลาพักร้อนทุกวันที่มี แล้วอย่าเปิด laptop เลย",
      "บอกหัวหน้าตรงๆ ว่าต้องการ support — ถึงเวลาแล้ว",
      "เขียนใบลาออกด้วยลายมือ จุดเทียน อ่านออกเสียง",
      "เปลี่ยนชื่อ ย้ายเมือง ไปขายกาแฟริมทะเล",
      "ส่งใบนี้ให้ทุกคนที่เคยสั่งงานคุณ พร้อมคำว่า 'ดูสิ'",
      "ตั้ง auto-reply ถาวร: 'คนนี้ลาไปตามหาตัวเองแล้ว'",
      "แขวนใบนี้ที่โต๊ะเป็นอนุสรณ์ จุดธูป 3 ดอก",
      "ขอ HR จัดงานไว้อาลัยให้ไฟในการทำงานที่จากไป",
      "พักจริงๆ จังๆ สักครั้งในชีวิต — เริ่มวันนี้",
    ],
  },
  {
    en: "CREMATION RECOMMENDED",
    th: "เกินเยียวยา · แนะนำให้เผา",
    headerList: [
      "เกินเยียวยา — หมอขอยอมแพ้",
      "ระดับสูงสุด · ไม่เคยเจอเคสแบบนี้มาก่อน",
      "ตำนานบทใหม่ของคลินิก — ขอบันทึกไว้",
      "หมอดูแล้วต้องไปนอนพักเอง — รับทราบ",
    ],
    bodyList: [
      "คลินิกขอมอบเหรียญกล้าหาญให้ที่ยังมาตรวจได้",
      "ผู้ป่วยอยู่ในระดับที่วิทยาศาสตร์อธิบายไม่ได้",
      "หมอแนะนำให้เปลี่ยนชื่อ ย้ายประเทศ เริ่มใหม่",
      "เคสนี้จะถูกเอาไปสอนนักศึกษาแพทย์รุ่นหลัง",
    ],
    range: [94, 99],
    symptoms: [
      "จำไม่ได้แล้วว่า 'มีความสุข' รู้สึกยังไง",
      "ตอบทุกคำถามด้วย '...' เพราะไม่มีแรงพิมพ์",
      "วางแผนหายตัวไปแบบไม่ทิ้งร่องรอย (ในหัวเล่นๆ)",
      "เห็นวันจันทร์ในปฏิทินแล้วร่างกายปวดล่วงหน้า",
      "ไม่เหลือแม้แต่แรงจะบ่นว่าเหนื่อย",
      "มองโต๊ะทำงานเหมือนมองที่เกิดเหตุ",
      "อยากได้ความเจ็บป่วยเล็กๆ เพื่อจะได้พักแบบไม่ผิด",
      "เลิกนับว่าผ่านมากี่วันแล้ว เพราะมันเหมือนกันหมด",
      "ใครถามว่า 'ไหวไหม' แล้วต้องกลั้นน้ำตา",
      "รู้สึกว่าตัวเองเป็นแค่ฟันเฟืองที่ยังไม่พัง",
    ],
    rxList: [
      "หยุดเดี๋ยวนี้ · นี่ไม่ใช่เรื่องตลกแล้ว · ไปพักจริงๆ",
      "คุยกับคนที่ไว้ใจวันนี้ · ไม่ต้องเก็บไว้คนเดียว",
      "ปรึกษาผู้เชี่ยวชาญจริง — สายด่วนสุขภาพจิต 1323",
      "เขียนใบลาออกตัวจริง เซ็นชื่อ ถ่ายเก็บไว้ให้กำลังใจ",
      "ส่งใบนี้ให้หัวหน้าแทนใบลาออก เผื่อเขาเก็ตเอง",
      "จองตั๋วเที่ยวเดียวไปที่ไหนก็ได้ที่ไม่มี wifi",
      "เอาใบนี้ใส่กรอบทอง ตั้งโชว์เป็นรางวัลชีวิต",
      "ประกาศกลางออฟฟิศว่า 'ฉันเกินเยียวยาแล้ว'",
      "เปลี่ยน LinkedIn เป็น 'Open to anything but this'",
      "กอดตัวเองสักที แล้วบอกว่า 'พอแล้วนะ เก่งมาทั้งปี'",
    ],
  },
];

const DOCTORS = [
  { name: "หมอกิตติ สิงหาคม",           title: "อายุรแพทย์" },
  { name: "หมอนุ้ย ลาก่อนนะ",          title: "จิตแพทย์" },
  { name: "หมอบิ๊ก แวะมาดู",           title: "แพทย์ทั่วไป" },
  { name: "พญ.ติ๊ก ทนดูอยู่",          title: "ที่ปรึกษา" },
  { name: "หมอต้น พักก่อนเด้อ",        title: "แพทย์" },
  { name: "นพ.เอ็ม ไม่ไหวแล้วเหมือนกัน", title: "แพทย์อาสา" },
  { name: "พญ.กิ๊ฟ ขอลาออกก่อนนะ",    title: "จิตเวชฉุกเฉิน" },
  { name: "หมอโอ๊ต ก็เครียดอยู่เหมือนกัน", title: "ผู้เชี่ยวชาญ" },
  { name: "นพ.ปอนด์ อย่าถามว่าหมอเป็นยังไง", title: "ประสาทวิทยา" },
  { name: "พญ.ใหม่ เหนื่อยด้วยกันทั้งคู่", title: "แพทย์เวร" },
];

function getMeetingSymptom(count) {
  if (count <= 1) return "meeting 1 ครั้ง — ยังพอมีชีวิตรอด";
  if (count <= 3) return `${count} meetings · ยังมีเวลาหายใจอยู่บ้าง`;
  if (count <= 5) return `${count} meetings — Calendar เริ่มดูเหมือน Tetris`;
  if (count <= 7) return `${count} meetings ใน 1 วัน · ทำงานจริงๆ ได้เมื่อไหร่กัน`;
  return "8+ meetings — ร่างกายอยู่ในห้องประชุม จิตใจไปแล้ว ดีนะ";
}

// ===== STATE =====
let photoDataUrl = null;
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
const flipCameraBtn   = document.getElementById('flipCameraBtn');
const snapCanvas      = document.getElementById('snapCanvas');
const cameraBtn       = document.getElementById('cameraBtn');

let cameraFacing = 'user'; // 'user' = front (mirror) · 'environment' = back

async function startCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  const getCam = c => navigator.mediaDevices.getUserMedia({ video: c });
  try {
    let stream;
    try {
      // exact forces a real switch on phones that have both cameras
      stream = await getCam({ facingMode: { exact: cameraFacing } });
    } catch {
      // fallback: single-camera devices (e.g. desktop) — keep whatever cam exists
      stream = await getCam({ facingMode: cameraFacing });
    }
    cameraStream = stream;
    cameraFeed.srcObject = cameraStream;
    cameraFeed.classList.toggle('back', cameraFacing === 'environment');
    cameraModal.classList.remove('hidden');
  } catch {
    alert('ไม่สามารถเข้าถึงกล้องได้\nกรุณาอัปโหลดรูปแทน');
  }
}

cameraBtn.addEventListener('click', () => { cameraFacing = 'user'; startCamera(); });

flipCameraBtn.addEventListener('click', () => {
  cameraFacing = cameraFacing === 'user' ? 'environment' : 'user';
  startCamera();
});

snapBtn.addEventListener('click', () => {
  // Center-crop the video frame to a square (1:1) — WYSIWYG with the preview
  const vw = cameraFeed.videoWidth, vh = cameraFeed.videoHeight;
  const side = Math.min(vw, vh);
  const sx = (vw - side) / 2, sy = (vh - side) / 2;
  snapCanvas.width = side;
  snapCanvas.height = side;
  const ctx = snapCanvas.getContext('2d');
  if (cameraFacing === 'user') { ctx.translate(side, 0); ctx.scale(-1, 1); } // mirror only front cam
  ctx.drawImage(cameraFeed, sx, sy, side, side, 0, 0, side, side);
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
    const sr  = ctx.sampleRate;
    const len = Math.floor(sr * durationSec);
    const buf = ctx.createBuffer(1, len, sr);
    const d   = buf.getChannelData(0);

    // Dot-matrix printer: head sweeps line by line · grainy buzz · carriage step between lines
    const lineDur = 0.20;            // time printing one line
    const gapDur  = 0.07;            // carriage-return step between lines
    const period  = lineDur + gapDur;

    for (let i = 0; i < len; i++) {
      const t    = i / sr;
      const ph   = t % period;       // position within current line cycle
      const line = Math.floor(t / period);
      let s = 0;

      if (ph < lineDur) {
        // Head warble — pitch sweeps as the print head crosses the page
        const sweep = 470 + 150 * Math.sin(2 * Math.PI * (ph / lineDur) - Math.PI / 2)
                          + (line % 2 ? 40 : -40);          // alt lines slightly detuned
        // Square-ish carrier (mechanical timbre = odd harmonics)
        const carrier = Math.sin(2 * Math.PI * sweep * t)
                      + 0.5  * Math.sin(2 * Math.PI * sweep * 3 * t)
                      + 0.25 * Math.sin(2 * Math.PI * sweep * 5 * t);
        const grain  = 0.55 + 0.45 * Math.sign(Math.sin(2 * Math.PI * 34 * t)); // 34Hz pulse texture
        const edge   = Math.min(ph, lineDur - ph) * 40;     // fade in/out each line edge
        const lineEnv = Math.min(edge, 1);
        s += carrier * grain * 0.05 * lineEnv;
        s += (Math.random() * 2 - 1) * 0.018 * lineEnv;      // ink-paper hiss
      } else {
        // Carriage step click at the start of the gap
        const c = ph - lineDur;
        s += (Math.random() * 2 - 1) * 0.16 * Math.exp(-c / 0.006);
      }
      d[i] = s;
    }

    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp  = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 0.7;
    const g   = ctx.createGain();
    g.gain.setValueAtTime(0.85, ctx.currentTime);
    g.gain.setValueAtTime(0.85, ctx.currentTime + durationSec - 0.4);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
    src.connect(bp); bp.connect(g); g.connect(ctx.destination);
    src.start(); src.stop(ctx.currentTime + durationSec);

    // Satisfying "ding" when the print job completes
    const dingAt = ctx.currentTime + durationSec - 0.05;
    [880, 1320].forEach((freq, k) => {
      const osc = ctx.createOscillator();
      const dg  = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      dg.gain.setValueAtTime(0, dingAt);
      dg.gain.linearRampToValueAtTime(k ? 0.05 : 0.09, dingAt + 0.01);
      dg.gain.exponentialRampToValueAtTime(0.0008, dingAt + 0.55);
      osc.connect(dg); dg.connect(ctx.destination);
      osc.start(dingAt); osc.stop(dingAt + 0.6);
    });
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
    showResult(level, meetingCount, notes);
  }, 4200);
}

// ===== PICK LEVEL =====
function pickLevel(meetingCount) {
  // Bias toward higher levels with more meetings (0 meetings = low · 8+ = high)
  const meetingFactor = Math.min((meetingCount - 1) / 7, 1);
  const rand = Math.random() * (1 - meetingFactor * 0.5) + meetingFactor * 0.5;
  const idx = Math.min(Math.floor(rand * LEVELS.length), LEVELS.length - 1);
  const level = LEVELS[idx];
  const [min, max] = level.range;
  const score = Math.floor(Math.random() * (max - min + 1)) + min;
  return { ...level, score };
}

// ===== SHOW RESULT =====
function showResult(level, meetingCount, notes = '') {
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
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  document.getElementById('certLevelEn').textContent     = level.en;
  document.getElementById('certLevelHeader').textContent = pick(level.headerList);
  document.getElementById('certLevelBody').textContent   = pick(level.bodyList);
  document.getElementById('certScore').textContent       = level.score + '%';

  const ul = document.getElementById('certSymptoms');
  ul.innerHTML = '';
  const shuffled = [...level.symptoms].sort(() => Math.random() - 0.5).slice(0, 3);
  const extraSymptoms = notes ? [notes] : [];
  [...shuffled, getMeetingSymptom(meetingCount), ...extraSymptoms].forEach(s => {
    const li = document.createElement('li'); li.textContent = s; ul.appendChild(li);
  });
  const rx = level.rxList[Math.floor(Math.random() * level.rxList.length)];
  document.getElementById('certRx').textContent          = rx;
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

// ===== iOS SAVE OVERLAY (long-press to save) =====
function showSaveOverlay(dataUrl) {
  let ov = document.getElementById('saveOverlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'saveOverlay';
    ov.className = 'save-overlay';
    ov.innerHTML =
      '<div class="save-overlay-inner">' +
        '<p class="save-overlay-hint">📲 กดค้างที่รูป แล้วเลือก <b>"บันทึกรูปภาพ"</b></p>' +
        '<img class="save-overlay-img" alt="ใบรับรอง" />' +
        '<button class="btn btn-outline" id="saveOverlayClose">ปิด</button>' +
      '</div>';
    document.body.appendChild(ov);
    const close = () => ov.classList.add('hidden');
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    ov.querySelector('#saveOverlayClose').addEventListener('click', close);
  }
  ov.querySelector('.save-overlay-img').src = dataUrl;
  ov.classList.remove('hidden');
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

    const blob = await new Promise(r => certCanvas.toBlob(r, 'image/png'));
    const filename = `burn-young-bro-${Date.now()}.png`;
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = isIOS || /Android/i.test(ua) ||
                     (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    const downloadBlob = () => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    if (!isMobile) {
      // Desktop: link.download works reliably — just download, no share sheet
      downloadBlob();
      return;
    }

    // Mobile: share sheet first (lets user Save to Photos / send to IG-Line)
    const file = new File([blob], filename, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Burn Young Bro Clinic' });
        return;
      } catch (shareErr) {
        if (shareErr.name === 'AbortError') return; // user dismissed — fine
        // gesture expired etc. → fall through to manual save
      }
    }

    if (isIOS) {
      // iOS Safari ignores link.download — long-press the image to save
      showSaveOverlay(certCanvas.toDataURL('image/png'));
    } else {
      downloadBlob(); // Android fallback
    }
  } catch (err) {
    console.error(err);
    alert('ไม่สามารถบันทึกรูปได้\nลองกดพิมพ์แทนได้เลย');
  } finally {
    btn.textContent = orig;
    btn.disabled = false;
  }
});

// ===== REDO =====
document.getElementById('redoBtn').addEventListener('click', () => {
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
