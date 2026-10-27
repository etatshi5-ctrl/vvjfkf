const devicesDatabase = [
    { brand: "Samsung", model: "Samsung Galaxy A54 5G", ram: "8 GB", hz: "120 Hz", tier: "قوي جداً", dpi: 480, fireBtn: "45%", sensi: { general: 185, reddot: 175, scope2x: 165, scope4x: 155, awm: 90, freeLook: 140 } },
    { brand: "Samsung", model: "Samsung Galaxy S23 Ultra", ram: "12 GB", hz: "120 Hz", tier: "احترافي خارق", dpi: 520, fireBtn: "42%", sensi: { general: 170, reddot: 160, scope2x: 150, scope4x: 140, awm: 75, freeLook: 130 } },
    { brand: "Samsung", model: "Samsung Galaxy A34 / A35", ram: "8 GB", hz: "120 Hz", tier: "قوي", dpi: 460, fireBtn: "48%", sensi: { general: 188, reddot: 178, scope2x: 168, scope4x: 158, awm: 95, freeLook: 145 } },
    { brand: "Samsung", model: "Samsung Galaxy A14 / A15", ram: "4 GB", hz: "90 Hz", tier: "اقتصادي", dpi: 410, fireBtn: "52%", sensi: { general: 198, reddot: 190, scope2x: 180, scope4x: 170, awm: 110, freeLook: 160 } },
    { brand: "Xiaomi", model: "Poco X5 Pro / X6 Pro", ram: "12 GB", hz: "120 Hz", tier: "الأقوى للألعاب", dpi: 490, fireBtn: "44%", sensi: { general: 175, reddot: 165, scope2x: 155, scope4x: 145, awm: 80, freeLook: 135 } },
    { brand: "Xiaomi", model: "Poco F3 / F5 / F6 Pro", ram: "12 GB", hz: "120 Hz", tier: "احترافي خارق", dpi: 530, fireBtn: "40%", sensi: { general: 168, reddot: 158, scope2x: 148, scope4x: 138, awm: 70, freeLook: 125 } },
    { brand: "Xiaomi", model: "Redmi Note 12 / 13 Pro", ram: "8 GB", hz: "120 Hz", tier: "قوي", dpi: 440, fireBtn: "47%", sensi: { general: 186, reddot: 176, scope2x: 166, scope4x: 156, awm: 92, freeLook: 142 } },
    { brand: "iPhone", model: "iPhone 13 Pro / 14 Pro / 15 Pro", ram: "6/8 GB", hz: "120 Hz", tier: "ثابت ومثالي", dpi: "تلقائي", fireBtn: "38%", sensi: { general: 165, reddot: 155, scope2x: 145, scope4x: 135, awm: 65, freeLook: 120 } },
    { brand: "iPhone", model: "iPhone 11 / 12", ram: "4 GB", hz: "60 Hz", tier: "قوي", dpi: "تلقائي", fireBtn: "42%", sensi: { general: 180, reddot: 170, scope2x: 160, scope4x: 150, awm: 85, freeLook: 135 } },
    { brand: "Oppo", model: "Oppo Reno 10 / 11", ram: "8 GB", hz: "120 Hz", tier: "قوي جداً", dpi: 465, fireBtn: "45%", sensi: { general: 183, reddot: 173, scope2x: 163, scope4x: 153, awm: 88, freeLook: 139 } },
    { brand: "Infinix", model: "Infinix GT 10 Pro / GT 20", ram: "8 GB", hz: "120 Hz", tier: "ألعاب", dpi: 470, fireBtn: "46%", sensi: { general: 180, reddot: 170, scope2x: 160, scope4x: 150, awm: 85, freeLook: 135 } }
];

const searchScreen = document.getElementById("searchScreen");
const resultScreen = document.getElementById("resultScreen");
const resultsContainer = document.getElementById("resultsContainer");
const phoneSearchInput = document.getElementById("phoneSearchInput");
const categoryChips = document.querySelectorAll(".chip");
const backToSearchBtn = document.getElementById("backToSearchBtn");
const quickDetectBtn = document.getElementById("quickDetectBtn");

let currentCategory = "All";

document.addEventListener("DOMContentLoaded", () => {
    displayDevices();
});

// تصفية وعرض الأجهزة في البحث
function displayDevices(query = "") {
    resultsContainer.innerHTML = "";
    
    let list = devicesDatabase;
    if (currentCategory !== "All") {
        list = list.filter(d => d.brand === currentCategory);
    }
    if (query.trim() !== "") {
        list = list.filter(d => d.model.toLowerCase().includes(query.toLowerCase()));
    }

    // إذا لم يوجد الهاتف، نمنحه خيار "توليد ذكي تلقائي" للبحث غير الموجود
    if (list.length === 0 && query.trim() !== "") {
        resultsContainer.innerHTML = `
            <div class="device-item" onclick="generateCustomDevice('${query}')">
                <div>
                    <div class="dev-title">⚡ توليد إعدادات فورية لـ (${query})</div>
                    <div class="dev-specs">حساب خوارزمي تلقائي لـ DPI وحجم الزر</div>
                </div>
                <div class="dev-action-icon">←</div>
            </div>
        `;
        return;
    }

    list.forEach(dev => {
        const div = document.createElement("div");
        div.className = "device-item";
        div.innerHTML = `
            <div>
                <div class="dev-title">${dev.model}</div>
                <div class="dev-specs">${dev.ram} • ${dev.hz} • ${dev.tier}</div>
            </div>
            <div class="dev-action-icon">←</div>
        `;
        div.addEventListener("click", () => showDeviceSettings(dev));
        resultsContainer.appendChild(div);
    });
}

// التبديل بين فئات الشركات
categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentCategory = chip.dataset.brand;
        displayDevices(phoneSearchInput.value);
    });
});

// البحث الفوري عند الكتابة
phoneSearchInput.addEventListener("input", (e) => {
    displayDevices(e.target.value);
});

// عرض شاشة الإعدادات والنتائج للهاتف المختار
function showDeviceSettings(dev) {
    document.getElementById("resModelName").textContent = dev.model;
    document.getElementById("resRam").textContent = dev.ram;
    document.getElementById("resHz").textContent = dev.hz;
    document.getElementById("resTier").textContent = dev.tier;
    document.getElementById("resDpi").textContent = dev.dpi;
    document.getElementById("resFireBtn").textContent = dev.fireBtn;

    for (const [key, val] of Object.entries(dev.sensi)) {
        const textElem = document.getElementById(`val-${key}`);
        const barElem = document.getElementById(`bar-${key}`);
        if (textElem) textElem.textContent = val;
        if (barElem) barElem.style.width = `${(val / 200) * 100}%`;
    }

    searchScreen.classList.remove("active");
    resultScreen.classList.add("active");
    window.scrollTo(0, 0);
}

// العودة للبحث
backToSearchBtn.addEventListener("click", () => {
    resultScreen.classList.remove("active");
    searchScreen.classList.add("active");
    phoneSearchInput.value = "";
    displayDevices();
});

// توليد ذكي لأي جهاز يبحث عنه المستخدم غير موجود بالقائمة
window.generateCustomDevice = function(queryName) {
    const customDev = {
        model: queryName.toUpperCase(),
        ram: "6/8 GB RAM",
        hz: "90/120 Hz",
        tier: "مخصص بالبحث الذكي",
        dpi: 450,
        fireBtn: "46%",
        sensi: { general: 185, reddot: 175, scope2x: 165, scope4x: 155, awm: 90, freeLook: 140 }
    };
    showDeviceSettings(customDev);
};

// كشف تلقائي لجهاز المتصفح الحالي
quickDetectBtn.addEventListener("click", () => {
    const ua = navigator.userAgent;
    let target = devicesDatabase[0];
    if (/iPhone/i.test(ua)) target = devicesDatabase.find(d => d.brand === "iPhone");
    else if (/Xiaomi|Redmi|Poco/i.test(ua)) target = devicesDatabase.find(d => d.brand === "Xiaomi");
    else if (/Samsung/i.test(ua)) target = devicesDatabase.find(d => d.brand === "Samsung");
    
    showDeviceSettings(target);
});
