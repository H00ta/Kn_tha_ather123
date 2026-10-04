# دليل النشر — كن ذا أثر

## 1) النشر على GitHub Pages
1. ادخل github.com وسجّل الدخول → **New repository** → اسم مثل `athar` → **Public** → **Create**.
2. **uploading an existing file** → اسحب `index.html` و`style.css` و`script.js` → **Commit changes**.
3. **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)** → **Save**.
4. بعد دقيقة يظهر الرابط: `https://اسم-المستخدم.github.io/athar/`

## 2) عداد الزيارات الحقيقي (GoatCounter — مجاني)
1. سجّل في goatcounter.com (اختر **Site code**، مثلًا `athar`، فيصبح موقعك `athar.goatcounter.com`). لا يحتاج بطاقة بنكية.
2. في GoatCounter: **Settings → Site** → اكتب رابط موقعك في **Domain** (مثل `username.github.io`).
3. في نفس الصفحة فعّل خيار **Allow adding visitor counts on your website** (يسمح بعرض العدد علنًا) ثم **Save**.
4. افتح `script.js` وضع الرمز هنا:
   `const goatCounterCode = "athar";`
   ثم ارفع الملف المعدّل (Edit في GitHub ← Commit).
5. للتأكد: افتح موقعك، ثم انظر إلى لوحة GoatCounter؛ ستجد الزيارة مسجلة، ويظهر الرقم في الـ Footer.

ملاحظات: العدد مركزي ومشترك بين الجميع، ويحتسب GoatCounter كل تحميل صفحة، ولا يعدّ الزائر نفسه مرتين في نفس الجلسة غالبًا. وقد تحجبه بعض إضافات حظر الإعلانات عند الزائر فلا تُحتسب زيارته.

## 3) تغيير البيانات
كل البيانات في أعلى `script.js` تحت `WEBSITE DATA`:
- **التواصل**: `phones` و`whatsapp` و`email` و`address`.
- **التبرع**: `bankak` و`ocash` و`fawry` و`beneficiaryName` (غيّر `number`).

## 4) إضافة مشروع جديد
أضف سطرًا داخل المصفوفة `projects`:
`{ id: "clinic", icon: "🏥", name: "اسم المشروع", field: "المجال", desc: "وصف يمكن إثباته." },`
(الـ `id` بالإنجليزية وفريد). لإضافة مبادرة: أضف نصًا إلى `initiatives`.
