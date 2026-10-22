/* ===========================================================
   HATECO – chat.js   (customer-service chat assistant)
   -----------------------------------------------------------
   PLAIN VERSION: it answers from the list in section 2.
   It is NOT real AI yet. Real AI plugs into getReply() (section 3).
   Add <script src="chat.js" defer></script> to any page to get it.

   1. Texts of the chat window (English / Arabic)
   2. KNOWLEDGE: edit answers and keywords here
   3. getReply(): the one place to connect a real AI later
   4. Build the chat window
   5. Chat behaviour
   =========================================================== */


/* ===========================================================
   1. TEXTS OF THE CHAT WINDOW
   =========================================================== */
const CHAT_UI = {
  en: {
    title: "Hateco Assistant",
    sub: "Customer service",
    open: "Open chat",
    close: "Close chat",
    placeholder: "Type your question…",
    send: "Send",
    welcome: "Hello! I’m Hateco’s virtual assistant. How can I help you today?",
    chips: ["Branches & contact", "Services", "Products", "Dealers"]
  },
  ar: {
    title: "مساعد هاتيكو",
    sub: "خدمة العملاء",
    open: "فتح المحادثة",
    close: "إغلاق المحادثة",
    placeholder: "اكتب سؤالك…",
    send: "إرسال",
    welcome: "مرحباً! أنا المساعد الافتراضي لهاتيكو. كيف يمكنني مساعدتك اليوم؟",
    chips: ["الفروع والاتصال", "الخدمات", "المنتجات", "الوكلاء"]
  }
};


/* ===========================================================
   2. KNOWLEDGE  (edit answers and keywords here)
   -----------------------------------------------------------
   Each topic has:
     keywords : words that trigger it (the topic with the most
                matching words wins)
     en / ar  : the answer (simple HTML is allowed: <br>, <a>)
   {home} is replaced so links work from every page.
   =========================================================== */
const TEL = '<a href="tel:+9616441144">+961 6 441144</a>';
const MAIL = '<a href="mailto:info@ha-teco.com">info@ha-teco.com</a>';

const KNOWLEDGE = [
  {
    id: "greeting",
    keywords: { en: [" hello ", " hi ", " hey ", "good morning", "good evening"], ar: ["مرحبا", "اهلا", "السلام عليكم", " هلا ", "صباح الخير", "مساء الخير"] },
    en: "Hello! How can I help you today?",
    ar: "مرحباً! كيف يمكنني مساعدتك اليوم؟"
  },
  {
    id: "branches",
    keywords: { en: ["branch", "location", "address", "where", "map", "directions", "visit"], ar: ["فرع", "فروع", "عنوان", " اين ", "موقع", "خريطة", "اتجاهات", "زيارة", "الاتصال"] },
    en: "We have a headquarter and three branches:<br>" +
        "<b>Headquarter:</b> Al Mina, Tripoli Port, P.O.Box 1033 — {tel1}<br>" +
        "<b>Tripoli, Maarad:</b> Al Maarad Fadel Mokadim Street, Attrach &amp; Kabbara Building — +961 6 447444<br>" +
        "<b>Tripoli, Tebbeneh:</b> Syria street, before FLB bank by 10m — +961 6 390781<br>" +
        "<b>Minieh, Akkar:</b> Menieh Highway, opposite Al Bayader Bakery — +961 6 471370<br>" +
        "Email: {mail}. <a href=\"{home}#contact\">See the Contact section</a>",
    ar: "لدينا مقر رئيسي وثلاثة فروع:<br>" +
        "<b>المقر الرئيسي:</b> الميناء، مرفأ طرابلس، ص.ب 1033 — {tel1}<br>" +
        "<b>طرابلس، المعرض:</b> المعرض، شارع فاضل مقدم، بناية عطرش وكبارة — +961 6 447444<br>" +
        "<b>طرابلس، التبانة:</b> شارع سوريا، قبل بنك FLB بـ 10 أمتار — +961 6 390781<br>" +
        "<b>المنية، عكار:</b> أوتوستراد المنية، مقابل مخبز البيادر — +961 6 471370<br>" +
        "البريد الإلكتروني: {mail}. <a href=\"{home}#contact\">قسم اتصل بنا</a>"
  },
  {
    id: "contact",
    keywords: { en: ["phone", "call", "number", "email", "contact", "reach", "agent", "human", "representative", "complaint", "speak"], ar: ["هاتف", "اتصال", "رقم", "ايميل", "بريد", "تواصل", "موظف", "شكوى", "مسؤول"] },
    en: "You can call us on {tel1} or email {mail}. Branch numbers are in the <a href=\"{home}#contact\">Contact section</a>.",
    ar: "يمكنك الاتصال بنا على {tel1} أو مراسلتنا على {mail}. أرقام الفروع في <a href=\"{home}#contact\">قسم اتصل بنا</a>."
  },
  {
    id: "hours",
    keywords: { en: ["hours", "opening", "open ", "closing", "what time", "working time"], ar: ["ساعات", "دوام", "مواعيد العمل", "تفتحون", "مفتوح"] },
    en: "I don’t have the opening hours here. Please call the branch you plan to visit — the numbers are in the <a href=\"{home}#contact\">Contact section</a>.",
    ar: "لا تتوفر لدي ساعات الدوام هنا. يرجى الاتصال بالفرع الذي تنوي زيارته، وأرقام الفروع في <a href=\"{home}#contact\">قسم اتصل بنا</a>."
  },
  {
    id: "appointment",
    keywords: { en: ["appointment", "book", "booking", "schedule", "reserve"], ar: ["موعد", "احجز", "حجز"] },
    en: "You can schedule an appointment with the form in the <a href=\"{home}#appointment\">Schedule an Appointment</a> section. Leave your name, phone number, email and a short message, and we will contact you to confirm.",
    ar: "يمكنك حجز موعد عبر النموذج في قسم <a href=\"{home}#appointment\">حجز موعد</a>. اكتب اسمك ورقم هاتفك وبريدك الإلكتروني ورسالة قصيرة، وسنتواصل معك لتأكيد الموعد."
  },
  {
    id: "prices",
    keywords: { en: ["price", "cost", "how much", "stock", "available", "availability", "delivery", "discount", "offer"], ar: ["سعر", "اسعار", " كم ", "متوفر", "توفر", "توصيل", "خصم", "عرض"] },
    en: "I can’t confirm prices or stock from here. Please call your nearest branch ({tel1}) or <a href=\"{home}#appointment\">schedule an appointment</a> and our team will help you.",
    ar: "لا أستطيع تأكيد الأسعار أو توفر المنتجات من هنا. يرجى الاتصال بأقرب فرع ({tel1}) أو <a href=\"{home}#appointment\">حجز موعد</a> وسيساعدك فريقنا."
  },
  {
    id: "services",
    keywords: { en: ["service", "alignment", "balancing", "health check", "btw", "workshop"], ar: ["خدمة", "خدمات", "ضبط", "موازنة", "فحص", "ورشة", "محاذاة"] },
    en: "Our services: <b>Wheel Alignment</b>, <b>Wheel Balancing</b> and a <b>Free Battery, Tyre and Wheel (BTW) Health Check</b>. See the <a href=\"{home}#services\">Services section</a> or <a href=\"{home}#appointment\">schedule an appointment</a>.",
    ar: "خدماتنا: <b>ضبط زوايا العجلات</b> و<b>موازنة العجلات</b> و<b>فحص BTW المجاني</b> (البطارية والإطار والعجلة). شاهد <a href=\"{home}#services\">قسم الخدمات</a> أو <a href=\"{home}#appointment\">احجز موعداً</a>."
  },
  {
    id: "tires",
    keywords: { en: ["tire", "tyre"], ar: ["اطار", "كفر", "دولاب", "دواليب"] },
    en: "We import and distribute tires from brands such as Toyo Tires, GITI, Primewell, Deestone, Runway, Seha, Altenzo, Minerva and Double Happiness. Use <a href=\"{home}#finder\">Choose Your Tire</a> or <a href=\"{home}#appointment\">schedule an appointment</a>.",
    ar: "نستورد ونوزع الإطارات من علامات مثل Toyo Tires وGITI وPrimewell وDeestone وRunway وSeha وAltenzo وMinerva وDouble Happiness. استخدم <a href=\"{home}#finder\">اختر إطارك</a> أو <a href=\"{home}#appointment\">احجز موعداً</a>."
  },
  {
    id: "batteries",
    keywords: { en: ["batter"], ar: ["بطاري"] },
    en: "We carry batteries from Boliden, Exide, Trane, Globex, JP, Freedom, Craft, DF and Hagen. For your car’s battery, please <a href=\"{home}#appointment\">schedule an appointment</a> or call {tel1}.",
    ar: "نوفر بطاريات من Boliden وExide وTrane وGlobex وJP وFreedom وCraft وDF وHagen. لبطارية سيارتك، يرجى <a href=\"{home}#appointment\">حجز موعد</a> أو الاتصال على {tel1}."
  },
  {
    id: "wheels",
    keywords: { en: ["wheels", "rims", "alloy"], ar: ["جنط", "جنوط", "رينج"] },
    en: "Our wheels come from Globex, PDW, Maxxion and Owrun. See the <a href=\"{home}#products\">Products section</a>.",
    ar: "جنوطنا من Globex وPDW وMaxxion وOwrun. شاهد <a href=\"{home}#products\">قسم المنتجات</a>."
  },
  {
    id: "lubricants",
    keywords: { en: ["lubricant", "lube", "engine oil", " oil "], ar: ["زيت", "زيوت", "تشحيم"] },
    en: "Our lubricants include Yacco, Globex, Bendix, XREV and Magnum. See the <a href=\"{home}#products\">Products section</a>.",
    ar: "تشمل زيوت التشحيم لدينا Yacco وGlobex وBendix وXREV وMagnum. شاهد <a href=\"{home}#products\">قسم المنتجات</a>."
  },
  {
    id: "equipment",
    keywords: { en: ["equipment", "garage", "tools"], ar: ["معدات", "كراج", "عدة"] },
    en: "Garage equipment brands: HPA, DHC, Ken-tools, COMEC and Chicago Pneumatic. See the <a href=\"{home}#products\">Products section</a>.",
    ar: "علامات معدات الكراجات: HPA وDHC وKen-tools وCOMEC وChicago Pneumatic. شاهد <a href=\"{home}#products\">قسم المنتجات</a>."
  },
  {
    id: "products",
    keywords: { en: ["product", "brand", "accessories", "catalog", "sell"], ar: ["منتج", "ماركة", "ماركات", "علامات", "اكسسوار", "تبيعون"] },
    en: "We offer Tires, Wheels, Batteries, Lubricants, Garage Equipment and Accessories. See the <a href=\"{home}#products\">Products section</a>, or ask me about a specific category.",
    ar: "نوفر الإطارات والجنوط والبطاريات وزيوت التشحيم ومعدات الكراجات والإكسسوارات. شاهد <a href=\"{home}#products\">قسم المنتجات</a> أو اسألني عن فئة محددة."
  },
  {
    id: "dealers",
    keywords: { en: ["dealer", "distributor", "wholesale", "partner"], ar: ["وكيل", "وكلاء", "موزع", "جملة", "شريك"] },
    en: "We have dealers all over Lebanon. For dealer inquiries please call {tel1} Ext: 4.",
    ar: "لدينا وكلاء في جميع أنحاء لبنان. للاستفسار عن الوكالات يرجى الاتصال على {tel1} داخلي 4."
  },
  {
    id: "about",
    keywords: { en: ["about", "history", "founded", "who are you", "company", "iso", "certif"], ar: ["عن الشركة", "تاريخ", "تأسيس", "تاسيس", "من انتم", "من نحن", "شهادة", "ايزو", "خبرة"] },
    en: "Hateco was founded in 1970 in Tripoli, Lebanon by Hamad Ajaje, and has served motorists for over 40 years. It is ISO-9001:2008 certified. <a href=\"about.html\">Read more about us</a>.",
    ar: "تأسست هاتيكو عام 1970 في طرابلس، لبنان، على يد حمد عجاج، وتخدم السائقين منذ أكثر من 40 عاماً، وهي حاصلة على شهادة ISO-9001:2008. <a href=\"about.html\">اقرأ المزيد عنا</a>."
  },
  {
    id: "thanks",
    keywords: { en: ["thank", "thx"], ar: ["شكرا", "مشكور", "يسلمو"] },
    en: "You’re welcome! Is there anything else I can help you with?",
    ar: "عفواً! هل هناك شيء آخر يمكنني مساعدتك به؟"
  }
];

const FALLBACK = {
  en: "I’m sorry, I don’t have an answer for that yet. Please call us on {tel1}, email {mail}, or <a href=\"{home}#appointment\">schedule an appointment</a> and our team will help you.",
  ar: "عذراً، ليس لدي إجابة على هذا السؤال بعد. يرجى الاتصال بنا على {tel1} أو مراسلتنا على {mail} أو <a href=\"{home}#appointment\">حجز موعد</a> وسيساعدك فريقنا."
};


/* ===========================================================
   3. getReply()  –  THE PLACE TO CONNECT REAL AI LATER
   -----------------------------------------------------------
   Today: finds the best matching topic in KNOWLEDGE.
   Later: replace the body with a call to your own backend, e.g.

     const res = await fetch("https://YOUR-BACKEND/chat", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message: text, lang: chatLang() })
     });
     return (await res.json()).reply;      // returns text or simple HTML

   (Never put an AI key in this file: it would be visible to everyone.)
   =========================================================== */
async function getReply(text) {
  return matchTopic(text);
}

// --- helpers used by the plain version ---
const chatLang = () => (document.documentElement.lang === "ar" ? "ar" : "en");
const HOME = document.getElementById("appointment") ? "" : "index.html";   // links work from any page

// Lower-case, remove Arabic diacritics, unify similar Arabic letters, drop punctuation
const normalize = s => " " + s.toLowerCase()
  .replace(/[\u064B-\u0652\u0640]/g, "")
  .replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه")
  .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim() + " ";

function fillIn(answer) {
  return answer.replaceAll("{home}", HOME).replaceAll("{tel1}", TEL).replaceAll("{mail}", MAIL);
}

function matchTopic(text) {
  const lang = chatLang();
  const input = normalize(text);
  let best = null, bestScore = 0;

  KNOWLEDGE.forEach(topic => {
    let score = 0;
    [...topic.keywords.en, ...topic.keywords.ar].forEach(word => {
      const key = normalize(word);
      const needle = word.startsWith(" ") ? key : key.trim();   // " hi " keeps its spaces = whole word only
      if (input.includes(needle)) score += needle.trim().length;
    });
    if (score > bestScore) { best = topic; bestScore = score; }
  });

  return fillIn(best ? best[lang] : FALLBACK[lang]);
}


/* ===========================================================
   4. BUILD THE CHAT WINDOW
   =========================================================== */
const chat = document.createElement("div");
chat.className = "chat";
chat.innerHTML = `
  <button class="chat-launch" id="chatLaunch" type="button" aria-expanded="false" aria-controls="chatPanel">
    <svg class="ic-chat" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>
    <svg class="ic-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
  </button>
  <section class="chat-panel" id="chatPanel" role="dialog" hidden>
    <header class="chat-head">
      <div class="chat-avatar" aria-hidden="true">H</div>
      <div class="chat-id"><div class="chat-title"></div><div class="chat-sub"></div></div>
      <button class="chat-x" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </header>
    <div class="chat-log" role="log" aria-live="polite"></div>
    <div class="chat-chips"></div>
    <form class="chat-form" autocomplete="off">
      <input type="text" class="chat-input" maxlength="300">
      <button class="chat-send" type="submit"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 20l18-8L3 4v6l11 2-11 2z"/></svg></button>
    </form>
  </section>`;
document.body.appendChild(chat);

const el = sel => chat.querySelector(sel);
const launch = el("#chatLaunch"), panel = el("#chatPanel"), log = el(".chat-log"),
      chips = el(".chat-chips"), form = el(".chat-form"), input = el(".chat-input");


/* ===========================================================
   5. CHAT BEHAVIOUR
   =========================================================== */
let welcomeBubble = null;
let busy = false;

// Fill every text of the window in the current language
function applyLang() {
  const ui = CHAT_UI[chatLang()];
  panel.setAttribute("aria-label", ui.title);
  el(".chat-title").textContent = ui.title;
  el(".chat-sub").textContent = ui.sub;
  el(".chat-x").setAttribute("aria-label", ui.close);
  launch.setAttribute("aria-label", launch.getAttribute("aria-expanded") === "true" ? ui.close : ui.open);
  input.placeholder = ui.placeholder;
  input.setAttribute("aria-label", ui.placeholder);
  el(".chat-send").setAttribute("aria-label", ui.send);

  chips.innerHTML = "";
  ui.chips.forEach(label => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chat-chip";
    chip.textContent = label;
    chip.onclick = () => send(label);
    chips.appendChild(chip);
  });
  if (welcomeBubble && log.children.length === 1) welcomeBubble.textContent = ui.welcome;   // re-translate if nothing said yet
}

function addMessage(content, who) {
  const bubble = document.createElement("div");
  bubble.className = "chat-msg " + who;
  if (who === "user") bubble.textContent = content;   // visitor text is never treated as HTML
  else bubble.innerHTML = content;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
  return bubble;
}

function openChat() {
  panel.hidden = false;
  chat.classList.add("is-open");
  launch.setAttribute("aria-expanded", "true");
  if (!welcomeBubble) welcomeBubble = addMessage(CHAT_UI[chatLang()].welcome, "bot");
  applyLang();
  input.focus();
}

function closeChat() {
  panel.hidden = true;
  chat.classList.remove("is-open");
  launch.setAttribute("aria-expanded", "false");
  applyLang();
  launch.focus();
}

async function send(text) {
  text = text.trim();
  if (!text || busy) return;
  busy = true;
  addMessage(text, "user");

  const typing = addMessage('<span class="dot"></span><span class="dot"></span><span class="dot"></span>', "bot typing");
  const [reply] = await Promise.all([getReply(text), new Promise(r => setTimeout(r, 600))]);   // short pause feels natural
  typing.remove();
  addMessage(reply, "bot");
  busy = false;
}

launch.onclick = () => (panel.hidden ? openChat() : closeChat());
el(".chat-x").onclick = closeChat;
addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closeChat(); });

form.onsubmit = e => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  send(text);
};

// A link to a section of the same page: close the chat so the section is visible
log.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (link && link.getAttribute("href").includes("#")) closeChat();
});

// Follow the site's English / Arabic switch
new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
applyLang();