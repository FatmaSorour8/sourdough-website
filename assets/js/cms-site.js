const DATA_PATHS = {
  site: "data/site.json",
  products: "data/products.json"
};

const FALLBACK_SITE = {
  "brandName": "ساوردو",
  "logoText": "S",
  "logoImage": "",
  "whatsapp": "201288427468",
  "phone": "01288427468",
  "instagram": "@sourdough.brand",
  "orderHours": "من 10 صباحًا إلى 8 مساءً",
  "heroTitle": "ساوردو دافي، طازج، ومخبوز يوميًا بجودة تليق ببراندك.",
  "heroSubtitle": "مخبوزات ساوردو طبيعية، بطعم غني وقوام مثالي، مناسبة للفطور، العزومات، والهدايا الصغيرة اللذيذة.",
  "heroImage": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1100&q=80",
  "aboutTitle": "كل رغيف وراه وقت، صبر، وحب للتفاصيل.",
  "aboutText": "الساوردو مش مجرد خبز، ده تجربة طبيعية بتبدأ بتخمير بطيء ومكونات بسيطة ونظيفة. هدفنا نقدم منتج بيتي فاخر بشكل احترافي يناسب كل بيت.",
  "aboutImage": "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1100&q=80"
};

const FALLBACK_PRODUCTS = {
  "products": [
    {
      "name": "Classic Sourdough",
      "category": "bread",
      "price": "180 ج.م",
      "description": "رغيف ساوردو كلاسيك بقشرة مقرمشة وقلب طري، مصنوع بخميرة طبيعية وتخمير بطيء.",
      "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-flower1"
    },
    {
      "name": "Seeded Sourdough",
      "category": "bread",
      "price": "210 ج.م",
      "description": "رغيف ساوردو بالحبوب، غني ومشبع ومناسب للفطور الصحي.",
      "image": "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-droplet"
    },
    {
      "name": "Rosemary Focaccia",
      "category": "pastry",
      "price": "150 ج.م",
      "description": "فوكاتشيا بزيت الزيتون والروزماري، بقوام هش وطعم دافي.",
      "image": "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-leaf"
    },
    {
      "name": "Butter Croissant",
      "category": "pastry",
      "price": "65 ج.م",
      "description": "كرواسون زبدة مورق وخفيف مناسب للفطور أو مع القهوة.",
      "image": "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-moon-stars"
    },
    {
      "name": "Breakfast Box",
      "category": "box",
      "price": "260 ج.م",
      "description": "بوكس فطور متنوع مناسب لشخصين، بتغليف بسيط وشيك.",
      "image": "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-cup-hot"
    },
    {
      "name": "Gift Bakery Box",
      "category": "box",
      "price": "320 ج.م",
      "description": "بوكس مخبوزات هدية دافي ومناسب للمناسبات البسيطة.",
      "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80",
      "icon": "bi-gift"
    }
  ]
};

async function fetchJson(path) {
  const res = await fetch(`${path}?v=${Date.now()}`);
  if (!res.ok) throw new Error(`Cannot load ${path}`);
  return res.json();
}

async function loadData() {
  try {
    const [site, productsFile] = await Promise.all([
      fetchJson(DATA_PATHS.site),
      fetchJson(DATA_PATHS.products)
    ]);

    return {
      ...site,
      products: productsFile.products || []
    };
  } catch (error) {
    console.warn("JSON files could not be loaded locally. Using fallback data.", error);
    return {
      ...FALLBACK_SITE,
      products: FALLBACK_PRODUCTS.products || []
    };
  }
}

function text(selector, value) {
  document.querySelectorAll(selector).forEach(el => el.textContent = value || "");
}

function setAttr(selector, attr, value) {
  document.querySelectorAll(selector).forEach(el => {
    if (value) el.setAttribute(attr, value);
  });
}

function updateBrandUI(data) {
  text("[data-brand-name]", data.brandName);
  text("[data-logo-text]", data.logoText || "S");

  document.querySelectorAll("[data-logo-image]").forEach(img => {
    if (data.logoImage) {
      img.src = data.logoImage;
      img.classList.remove("d-none");
      const mark = img.closest(".brand-logo")?.querySelector(".logo-mark");
      mark?.classList.add("d-none");
    }
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
    link.href = `https://wa.me/${data.whatsapp}`;
  });
}

function productCard(product) {
  return `
    <div class="col-md-6 col-lg-3 reveal visible">
      <div class="product-card">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
        <div class="p-4">
          <div class="icon-bubble"><i class="bi ${escapeHtml(product.icon || "bi-stars")}"></i></div>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${escapeHtml(product.description)}</p>
          <div class="price">${escapeHtml(product.price)}</div>
        </div>
      </div>
    </div>
  `;
}

function menuCard(product) {
  return `
    <div class="col-md-6 col-lg-4 menu-item reveal visible" data-category="${escapeHtml(product.category)}">
      <div class="menu-card">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
        <div class="menu-content">
          <div class="d-flex justify-content-between gap-3">
            <div>
              <div class="icon-bubble"><i class="bi ${escapeHtml(product.icon || "bi-stars")}"></i></div>
              <h3>${escapeHtml(product.name)}</h3>
            </div>
            <strong>${escapeHtml(product.price)}</strong>
          </div>
          <p>${escapeHtml(product.description)}</p>
          <a href="contact.html?product=${encodeURIComponent(product.name)}" class="mini-link">اطلبي المنتج</a>
        </div>
      </div>
    </div>
  `;
}

function renderContent(data) {
  text("[data-hero-title]", data.heroTitle);
  text("[data-hero-subtitle]", data.heroSubtitle);
  setAttr("[data-hero-image]", "src", data.heroImage);
  text("[data-about-title]", data.aboutTitle);
  text("[data-about-text]", data.aboutText);
  setAttr("[data-about-image]", "src", data.aboutImage);
  text("[data-phone]", data.phone);
  text("[data-instagram]", data.instagram);
  text("[data-order-hours]", data.orderHours);

  const featured = document.querySelector("[data-featured-products]");
  if (featured) featured.innerHTML = data.products.slice(0, 4).map(productCard).join("");

  const grid = document.querySelector("[data-menu-grid]");
  if (grid) {
    grid.innerHTML = data.products.map(menuCard).join("");
    setupMenuFilters();
  }

  const select = document.getElementById("product");
  if (select) {
    select.innerHTML = `<option value="">اختاري المنتج</option>` + data.products.map(p => `<option>${escapeHtml(p.name)}</option>`).join("");
    const params = new URLSearchParams(window.location.search);
    const selectedProduct = params.get("product");
    if (selectedProduct) {
      [...select.options].forEach((option) => {
        if (option.text.toLowerCase() === selectedProduct.toLowerCase()) option.selected = true;
      });
    }
  }
}

function setupOrderForm(data) {
  const orderForm = document.getElementById("orderForm");
  if (!orderForm) return;

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const notes = document.getElementById("notes").value.trim();

    const message =
`طلب جديد من موقع ${data.brandName}:
الاسم: ${name}
رقم الموبايل: ${phone}
المنتج: ${product}
الكمية: ${quantity}
العنوان / الملاحظات: ${notes || "لا يوجد"}`;

    const url = `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

function setupMenuFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterButtons.forEach((btn) => {
    btn.onclick = () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      menuItems.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.style.display = match ? "block" : "none";
      });
    };
  });
}

function setupUIEffects() {
  const navbar = document.querySelector(".custom-navbar");
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
  });

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData();
  updateBrandUI(data);
  renderContent(data);
  setupOrderForm(data);
  setupUIEffects();
});
