# ساوردو - النسخة النهائية للرفع على GitHub و Netlify

## ارفعي كل الملفات والفولدرات الموجودة هنا على GitHub

الهيكل المهم:

- index.html
- menu.html
- about.html
- contact.html
- netlify.toml
- admin/index.html
- admin/config.yml
- data/site.json
- data/products.json
- assets/css/style.css
- assets/js/cms-site.js
- assets/uploads/.gitkeep
- assets/img/.gitkeep

## بعد الرفع على GitHub

1. افتحي Netlify
2. Add new site
3. Import from GitHub
4. اختاري Repository
5. Build command: اتركيه فارغ
6. Publish directory: .
7. Deploy

## تفعيل لوحة التحكم

من Netlify:
1. Site configuration
2. Identity
3. Enable Identity
4. Services
5. Git Gateway
6. Enable Git Gateway
7. Registration preferences = Invite only
8. Invite users
9. ادخلي إيميل العميل أو إيميلك

لوحة التحكم:
https://your-site.netlify.app/admin

## ملاحظة
فولدر assets/uploads يحتوي على ملف .gitkeep حتى يرفعه GitHub وهو فارغ. بعد استخدام Decap CMS الصور الجديدة ستتحفظ داخله.


## SEO Update
تم إضافة meta tags و Open Graph و Twitter Cards و Schema JSON-LD و robots.txt و sitemap.xml.
تم تعديل Order Badge في الموبايل ليظهر بعرض مناسب ولا يأخذ عرض الصورة بالكامل.


## Final Update
- تم تحويل النصوص لصيغة المذكر/المحايدة.
- تم حذف أيقونات المنتجات من الكروت.
- تم زيادة المسافات الجانبية للصفحة على الشاشات الكبيرة والمتوسطة.
