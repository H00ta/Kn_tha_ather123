// ==========================================
// WEBSITE DATA
// ==========================================
const siteName = "كن ذا أثر";

// ضع هنا رمز موقعك في GoatCounter بدل النص الحالي (الجزء الذي يسبق .goatcounter.com).
// مثال: لو رابط لوحتك https://athar.goatcounter.com فاكتب: const goatCounterCode = "athar";
const goatCounterCode = "ضع_رمز_موقع_GoatCounter_هنا";

const donationInfo = {
  beneficiaryName: "محمود عمر إسماعيل عمر",
  bankak: { name: "بنكك", number: "5838571" },
  ocash: { name: "أوكاش", number: "1115371" },
  fawry: { name: "فوري", number: "51807840" },
  phones: ["0915528384", "0125759195"],
  whatsapp: "https://wa.me/qr/TY6XLVSJBCTGD1",
  email: "Mahmoudomero226@gmail.com",
  address: "النيل الأبيض - الدويم"
};

// ==========================================
// لإضافة مشروع جديد:
// انسخ النموذج التالي وغيّر البيانات فقط
// ==========================================
// 1) الصق الكائن داخل مصفوفة projects أدناه (افصل بين المشاريع بفاصلة). يظهر تلقائيًا بدون تعديل HTML.
// 2) الصور: أنشئ مجلدًا اسمه images بجانب index.html وضع فيه الصور، ثم اكتب image: "images/اسم.jpg".
//    إن لم تكتب image أو لم يوجد الملف يظهر تصميم بديل (لا تظهر صورة مكسورة).
// 3) عدة صور: gallery: ["images/a.jpg", "images/b.jpg"]
// 4) التكلفة: cost: "5000 جنيه"   — عدد المستفيدين: beneficiaries: "25 أسرة"
// 5) تحديث جديد: أضف كائنًا داخل updates: { date: "2026-10-04", title: "بدء التنفيذ", text: "الوصف", image: "images/u1.jpg" }
// 6) الحقول التي تتركها فارغة أو تحذفها لا تظهر للزائر.
// 7) الحالة (status) إحدى: "مفتوح للمساهمة" | "قيد التنفيذ" | "مكتمل" | "متوقف مؤقتًا"
//
// نموذج (للنسخ فقط — لا يظهر في الموقع لأنه داخل تعليق):
// {
//   id: "water-001",
//   name: "اسم المشروع",
//   category: "المجال",
//   icon: "💧",                 // اختياري: أيقونة تظهر عند عدم وجود صورة
//   location: "المنطقة",
//   date: "2026-10-04",
//   status: "مكتمل",
//   description: "وصف قصير",
//   details: "تفاصيل ما تم فعليًا",
//   image: "images/water-001.jpg",
//   gallery: ["images/water-001.jpg", "images/water-002.jpg"],
//   cost: "",
//   beneficiaries: "",
//   updates: []
// },
const projects = [
  { id: "families", name: "دعم الأسر المحتاجة", category: "العمل الإغاثي والاجتماعي", icon: "🤲", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى دعم الأسر المحتاجة وتخفيف أعبائها المعيشية." },
  { id: "orphans", name: "كفالة الأيتام", category: "الرعاية الاجتماعية", icon: "🌱", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى المساهمة في رعاية الأيتام ودعمهم." },
  { id: "quran", name: "تعليم القرآن", category: "الدعوة والتعليم", icon: "📖", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى دعم حلقات تعليم القرآن الكريم ونشر تعلمه." },
  { id: "water", name: "مشروع سقيا الماء", category: "التنمية المستدامة", icon: "💧", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى المساهمة في توفير المياه للمناطق والأسر المحتاجة." },
  { id: "mosques", name: "بناء المساجد", category: "الدعوة والعمارة الإسلامية", icon: "🕌", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى المساهمة في بناء المساجد وعمارتها." },
  { id: "mushaf", name: "توزيع المصحف الشريف", category: "الدعوة", icon: "📗", status: "مفتوح للمساهمة", description: "مبادرة تهدف إلى المساهمة في توزيع المصحف الشريف على من يحتاجه." }
];

const initiatives = ["مبادرة سقيا الماء", "مبادرة كفالة يتيم", "مبادرة إفطار صائم", "مبادرة توزيع المصاحف", "مبادرة دعم الأسر المحتاجة"];

// ==========================================
// HELPERS
// ==========================================
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const intlPhone = (p) => "+249" + p.replace(/^0/, "");
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (_) {}
    ta.remove();
  }
  toast("تم نسخ الرقم بنجاح ✓");
}
function openDialog(d) { if (!d.open) d.showModal(); }
function closeOnBackdrop(d) {
  d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
}

// ==========================================
// RENDER
// ==========================================
const STATUS_CLS = { "مفتوح للمساهمة": "s-open", "قيد التنفيذ": "s-run", "مكتمل": "s-done", "متوقف مؤقتًا": "s-pause" };
const badge = (st) => st ? `<span class="badge ${STATUS_CLS[st] || "s-open"}">${esc(st)}</span>` : "";
const fmtDate = (v) => { const x = new Date(v + "T00:00:00"); return isNaN(x) ? v : x.toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" }); };
const artBox = (p, big) => `<div class="art${big ? " big" : ""}" aria-hidden="${p.image ? "false" : "true"}"><span>${esc(p.icon || "✦")}</span>${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ""}</div>`;
const grid = $("#projectGrid");
grid.innerHTML = projects.map((p) => `
  <article class="card rv" tabindex="0" role="button" data-id="${esc(p.id)}" aria-label="تفاصيل ${esc(p.name)}">
    ${artBox(p)}
    <div class="card-b">
      <div class="meta-top">${badge(p.status)}${p.category ? `<span class="tag">${esc(p.category)}</span>` : ""}</div>
      <h3>${esc(p.name)}</h3>
      ${p.description ? `<p>${esc(p.description)}</p>` : "<p></p>"}
      <div class="row">
        <button class="btn ghost" data-act="details" data-id="${esc(p.id)}">التفاصيل</button>
        <button class="btn gold" data-act="donate" data-id="${esc(p.id)}">ساهم</button>
      </div>
    </div>
  </article>`).join("");

$("#initList").innerHTML = initiatives.map((i) => `<div class="chip rv">${esc(i)}</div>`).join("");

const d = donationInfo;
$("#contactBox").innerHTML = `
  <div class="ci rv"><span>📍</span><b>العنوان</b><div>${esc(d.address)}</div></div>
  <div class="ci rv"><span>📞</span><b>الهاتف</b>${d.phones.map((p) => `<a href="tel:${p}" dir="ltr">${p}</a>`).join("")}</div>
  <div class="ci rv"><span>✉️</span><b>البريد الإلكتروني</b><a href="mailto:${d.email}">${d.email}</a>
    <a class="btn ghost sm" href="mailto:${d.email}">راسلنا</a></div>
  <div class="ci rv"><span>💬</span><b>واتساب</b><a class="btn gold sm" href="${d.whatsapp}" target="_blank" rel="noopener">تواصل عبر واتساب</a></div>`;

$("#footContact").innerHTML = `
  <h3>تواصل</h3>
  <div>${esc(d.address)}</div>
  ${d.phones.map((p) => `<a href="tel:${p}" dir="ltr" style="text-align:right">${p}</a>`).join("")}
  <a href="mailto:${d.email}">${d.email}</a>
  <a href="${d.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`;

$("#waFab").href = d.whatsapp;
$("#callMenu").innerHTML = d.phones.map((p) => `<a href="tel:${p}">${p}</a>`).join("");

// ==========================================
// MODALS
// ==========================================
const pm = $("#projectModal"), dm = $("#donateModal");
closeOnBackdrop(pm); closeOnBackdrop(dm);

function showProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  const row = (k, v) => v ? `<div class="meta"><b>${k}:</b> ${esc(v)}</div>` : "";
  const gal = (p.gallery || []).filter(Boolean);
  const ups = (p.updates || []).filter((u) => u && (u.title || u.text)).sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  pm.innerHTML = `
    ${artBox(p, true)}
    <h3 id="pmTitle">${esc(p.name)}</h3>
    <div class="meta-top">${badge(p.status)}${p.category ? `<span class="tag">${esc(p.category)}</span>` : ""}</div>
    ${row("الموقع", p.location)}${row("التاريخ", p.date ? fmtDate(p.date) : "")}
    ${p.description ? `<p>${esc(p.description)}</p>` : ""}
    ${p.details ? `<p>${esc(p.details)}</p>` : ""}
    ${row("التكلفة", p.cost)}${row("المستفيدون", p.beneficiaries)}
    ${gal.length ? `<div class="gal">${gal.map((g) => `<img src="${esc(g)}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">`).join("")}</div>` : ""}
    ${ups.length ? `<h4 class="uh">التحديثات</h4>${ups.map((u) => `<div class="upd">${u.date ? `<small>${esc(fmtDate(u.date))}</small>` : ""}${u.title ? `<b>${esc(u.title)}</b>` : ""}${u.text ? `<p>${esc(u.text)}</p>` : ""}${u.image ? `<img src="${esc(u.image)}" alt="${esc(u.title || p.name)}" loading="lazy" onerror="this.remove()">` : ""}</div>`).join("")}` : ""}
    <p><b>طريقة المساهمة:</b> عبر التحويل على أحد الحسابات الموضحة في نافذة المساهمة، ثم التواصل معنا بعد التحويل.</p>
    <div class="mrow">
      <button class="btn gold" data-act="donate" data-id="${esc(p.id)}">ساهم الآن</button>
      <button class="btn ghost" data-act="share" data-id="${esc(p.id)}">مشاركة المشروع</button>
      <button class="btn ghost" data-act="close">إغلاق</button>
    </div>
    <div class="shr" id="shareFallback" hidden></div>`;
  openDialog(pm);
  history.replaceState(null, "", "#project-" + id);
}
pm.addEventListener("close", () => { if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search + "#projects"); });

function showDonate(projectName) {
  const acc = [d.bankak, d.ocash, d.fawry].map((a) => `
    <div class="acc"><div><b>${a.name}</b><div>${esc(d.beneficiaryName)}</div></div>
      <div class="num">${a.number}</div>
      <button class="btn ghost sm" data-copy="${a.number}">نسخ الرقم</button></div>`).join("");
  dm.innerHTML = `
    <h3 id="dmTitle">ساهم في صناعة الأثر</h3>
    <p>يمكنك المساهمة عبر وسائل التحويل التالية</p>
    ${projectName ? `<span class="tag">${esc(projectName)}</span>` : ""}
    <p><b>اسم المستفيد:</b> ${esc(d.beneficiaryName)}</p>
    <h3 style="font-size:1.1rem">بيانات التحويل</h3>
    ${acc}
    <h3 style="font-size:1.1rem;margin-top:14px">تواصل معنا بعد التحويل</h3>
    <div class="mrow">
      <a class="btn gold" href="${d.whatsapp}" target="_blank" rel="noopener">واتساب</a>
      ${d.phones.map((p) => `<a class="btn ghost" href="tel:${p}" dir="ltr">${p}</a>`).join("")}
      <button class="btn ghost" data-act="close">إغلاق</button>
    </div>`;
  openDialog(dm);
}

async function shareProject(id) {
  const p = projects.find((x) => x.id === id);
  const url = location.origin + location.pathname + "#project-" + id;
  const text = `${p.name} — ${siteName}`;
  if (navigator.share) {
    try { await navigator.share({ title: text, text: p.description||p.name, url }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  const box = $("#shareFallback");
  box.hidden = false;
  box.innerHTML = `
    <button class="btn ghost sm" data-copylink="${esc(url)}">نسخ الرابط</button>
    <a class="btn ghost sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(text + " " + url)}">واتساب</a>
    <a class="btn ghost sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a>`;
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act],[data-donate],[data-copy],[data-copylink],.card");
  if (!el) return;
  if (el.dataset.copy) return copyText(el.dataset.copy);
  if (el.dataset.copylink) { copyText(el.dataset.copylink).then(() => toast("تم نسخ الرابط ✓")); return; }
  if (el.hasAttribute("data-donate")) { $("#menu").classList.remove("open"); return showDonate(); }
  const act = el.dataset.act, id = el.dataset.id;
  if (act === "close") return el.closest("dialog").close();
  if (act === "donate") { const p = projects.find((x) => x.id === id); pm.close(); return showDonate(p && p.name); }
  if (act === "share") return shareProject(id);
  if (act === "details") return showProject(id);
  if (el.classList.contains("card")) showProject(el.dataset.id);
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("card")) { e.preventDefault(); showProject(e.target.dataset.id); }
});
if (location.hash.startsWith("#project-")) showProject(location.hash.slice(9));

// ==========================================
// NAV, FLOATING BUTTONS, REVEAL
// ==========================================
const burger = $("#burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const o = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
  burger.setAttribute("aria-label", o ? "إغلاق القائمة" : "فتح القائمة");
});
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

const callBtn = $("#callBtn"), callMenu = $("#callMenu");
callBtn.addEventListener("click", () => { callMenu.hidden = !callMenu.hidden; callBtn.setAttribute("aria-expanded", !callMenu.hidden); });

const topBtn = $("#topBtn");
addEventListener("scroll", () => { topBtn.hidden = scrollY < 500; }, { passive: true });
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .1 });
document.querySelectorAll(".rv").forEach((n) => io.observe(n));

// ==========================================
// VISIT COUNTER (GoatCounter — مركزي ومشترك بين كل الزوار، بدون localStorage)
// ==========================================
(function visits() {
  const code = goatCounterCode.trim();
  if (!code || code.indexOf("ضع_") === 0) return; // قبل وضع الرمز لا يمكن جلب أي رقم حقيقي
  const base = `https://${code}.goatcounter.com`;
  const s = document.createElement("script");
  s.async = true;
  s.dataset.goatcounter = base + "/count";
  s.src = "https://gc.zgo.at/count.js";
  document.head.appendChild(s); // تسجيل الزيارة عند فتح الصفحة

  const box = $("#visitsBox"), out = $("#visitCount");
  box.hidden = false; out.textContent = "0";
  const show = (target) => {
    let n = 0; const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => { n = Math.min(target, n + step); out.textContent = String(n); if (n >= target) clearInterval(t); }, 25);
  };
  const load = () => fetch(base + "/counter/TOTAL.json", { cache: "no-store" })
    .then((r) => r.status === 404 ? { count: "0" } : r.ok ? r.json() : Promise.reject())
    .then((j) => show(parseInt(String(j.count).replace(/\D/g, ""), 10) || 0))
    .catch(() => {});
  addEventListener("load", () => setTimeout(load, 1500));
})();
