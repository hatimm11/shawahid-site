# 🎓 شواهد · حزمة جاهزة للنشر والربط بالدومين

موقع معاينة ملف إنجاز الأداء الوظيفي + توليد PDF تلقائي، مع هوية الشعار الجديدة.

## 📁 البنية
```
shawahid-site/
├── public/
│   ├── index.html      ← صفحة الهبوط (بالشعار الجديد)
│   ├── preview.html    ← المعاينة (مصدر توليد PDF)
│   ├── view.html       ← المعاينة الكاملة + طباعة
│   ├── config.js       ← الإعدادات
│   └── og-image.png    ← صورة المشاركة (واتساب/تويتر)
├── api/
│   └── generate-pdf.js ← دالة Vercel لتوليد PDF
├── package.json
├── vercel.json
└── README.md
```

## ⚙️ قبل النشر — راجع `public/config.js`
- `STORE_URL`     : رابط منتجك على متجر زد
- `WHATSAPP_NUMBER`: رقم الواتساب
- `LEADS_WEBHOOK` : (اختياري) لجمع بيانات العملاء

## 🚀 النشر على Vercel
1. ادخل [vercel.com/new](https://vercel.com/new) وسجّل بـ GitHub أو Google.
2. **اسحب مجلد `shawahid-site` كاملاً** إلى النافذة (أو ارفعه عبر مستودع Git).
3. اضغط **Deploy**. Vercel يكتشف `package.json` تلقائياً، يثبّت Chromium، ويربط `/api/generate-pdf`.
4. سيظهر رابط مؤقت مثل: `shawahid-site.vercel.app` — جرّبه للتأكد.

## 🌐 ربط الدومين (مثال: shawahid.sa)
1. في لوحة Vercel: **Settings → Domains → Add Domain**.
2. أدخل دومينك (أضف `shawahid.sa` و`www.shawahid.sa`).
3. Vercel ستعرض لك القيم الدقيقة المطلوبة (تختلف حسب المشروع/الخطة). أضِفها عند مزوّد الدومين:
   - الدومين الرئيسي (apex): سجل **A** بالقيمة التي تعرضها Vercel (غالباً `76.76.21.21`)
   - www: سجل **CNAME** بالقيمة التي تعرضها Vercel (مثل `cname.vercel-dns-0.com` أو قيمة خاصة بمشروعك)
   ⚠️ استخدم دائماً القيم الظاهرة في لوحة مشروعك، لا قيماً ثابتة من الإنترنت.
4. ارجع للوحة Vercel واضغط **Refresh/Verify**. تفعيل DNS يأخذ دقائق إلى ٢٤ ساعة، وSSL يُصدر تلقائياً.

## 📷 صورة المشاركة (OG)
مضمّنة في `index.html` كـ `/og-image.png`. تظهر تلقائياً عند مشاركة الرابط في واتساب أو تويتر بعد ربط الدومين.

## 💰 Vercel Hobby (مجاني)
يكفي لنحو ١٠٠ توليد PDF يومياً. أول طلب بعد سكون قد يأخذ ٥–١٠ ثوانٍ (cold start).
