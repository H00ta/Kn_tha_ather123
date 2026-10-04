// ==========================================
// WEBSITE DATA
// ==========================================
const siteName = "كن ذا أثر";

// رمز حسابك في GoatCounter (الجزء الذي يسبق .goatcounter.com). مثال: "athar" => https://athar.goatcounter.com
const goatCounterCode = "";

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

const projects = [
  { id: "families", icon: "🤲", name: "دعم الأسر المحتاجة", field: "العمل الإغاثي والاجتماعي", desc: "مبادرة تهدف إلى دعم الأسر المحتاجة وتخفيف أعبائها المعيشية." },
  { id: "orphans", icon: "🌱", name: "كفالة الأيتام", field: "الرعاية الاجتماعية", desc: "مبادرة تهدف إلى المساهمة في رعاية الأيتام ودعمهم." },
  { id: "quran", icon: "📖", name: "تعليم القرآن", field: "الدعوة والتعليم", desc: "مبادرة تهدف إلى دعم حلقات تعليم القرآن الكريم ونشر تعلمه." },
  { id: "water", icon: "💧", name: "مشروع سقيا الماء", field: "التنمية المستدامة", desc: "مبادرة تهدف إلى المساهمة في توفير المياه للمناطق والأسر المحتاجة." },
  { id: "mosques", icon: "🕌", name: "بناء المساجد", field: "الدعوة والعمارة الإسلامية", desc: "مبادرة تهدف إلى المساهمة في بناء المساجد وعمارتها." },
  { id: "mushaf", icon: "📗", name: "توزيع المصحف الشريف", field: "الدعوة", desc: "مبادرة تهدف إلى المساهمة في توزيع المصحف الشريف على من يحتاجه." }
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
const grid = $("#projectGrid");
grid.innerHTML = projects.map((p) => `
  <article class="card rv" tabindex="0" role="button" data-id="${p.id}" aria-label="تفاصيل ${esc(p.name)}">
    <div class="art" aria-hidden="true">${p.icon}</div>
    <div class="card-b">
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="row">
        <button class="btn ghost" data-act="details" data-id="${p.id}">التفاصيل</button>
        <button class="btn gold" data-act="donate" data-id="${p.id}">ساهم</button>
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
  pm.innerHTML = `
    <div class="art big" aria-hidden="true">${p.icon}</div>
    <h3 id="pmTitle">${esc(p.name)}</h3>
    <span class="tag">${esc(p.field)}</span>
    <p>${esc(p.desc)}</p>
    <p><b>طريقة المساهمة:</b> عبر التحويل على أحد الحسابات الموضحة في نافذة المساهمة، ثم التواصل معنا بعد التحويل.</p>
    <div class="mrow">
      <button class="btn gold" data-act="donate" data-id="${p.id}">ساهم الآن</button>
      <button class="btn ghost" data-act="share" data-id="${p.id}">مشاركة المشروع</button>
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
    try { await navigator.share({ title: text, text: p.desc, url }); return; } catch (e) { if (e.name === "AbortError") return; }
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
// VISIT COUNTER (GoatCounter — central, shared by all visitors)
// ==========================================
(function visits() {
  if (!goatCounterCode) return; // غير مفعّل بعد: يبقى العداد مخفيًا ولا يُعرض أي رقم
  const base = `https://${goatCounterCode}.goatcounter.com`;
  const s = document.createElement("script");
  s.async = true;
  s.dataset.goatcounter = base + "/count";
  s.src = "https://gc.zgo.at/count.js";
  document.head.appendChild(s);

  const box = $("#visitsBox"), out = $("#visitCount");
  const load = () => fetch(base + "/counter/TOTAL.json", { cache: "no-store" })
    .then((r) => { if (!r.ok) throw 0; return r.json(); })
    .then((j) => {
      const target = parseInt(String(j.count).replace(/\D/g, ""), 10) || 0;
      box.hidden = false;
      let n = 0; const step = Math.max(1, Math.ceil(target / 40));
      const t = setInterval(() => { n = Math.min(target, n + step); out.textContent = n.toLocaleString("ar-EG-u-nu-latn"); if (n >= target) clearInterval(t); }, 25);
    })
    .catch(() => { box.hidden = true; });
  addEventListener("load", () => setTimeout(load, 1500));
})();
