const products = [
    {
        id: 1,
        name: "Iphone 15 pro",
        brand: "Apple",
        category: "Smartphone",
        price: 1200,
        color: "Black",
        img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6525/6525407_sd.jpg"
    },

    {
        id: 1,
        name: "MacBook air",
        brand: "Apple",
        category: "Laptop",
        price: 1500,
        color: "Black",
        img: "https://9to5mac.com/wp-content/uploads/sites/6/2025/03/macbook-air-m4.jpg?quality=82&strip=all&w=1600"
    },

    {
        id: 1,
        name: "Samsung A56",
        brand: "Samsung",
        category: "Smartphone",
        price: 900,
        color: "Black",
        img: "https://images.samsung.com/is/image/samsung/assets/global/mkt/smartphones/galaxy-a56/buy/02_Product_Image_MO.png?imbypass=true"
    },

    {
        id: 1,
        name: "AppleWatch",
        brand: "Apple",
        category: "Smartphone",
        price: 600,
        color: "Black",
        img: "https://www.apple.com/v/apple-watch-series-11/b/images/overview/product-viewer/product_landing_endframe__eaytrp6zz6c2_large.jpg"
    },

    {
        id: 1,
        name: "Ipad",
        brand: "Apple",
        category: "Smartphone",
        price: 700,
        color: "Black",
        img: "https://tabletklasse.de/wp-content/uploads/iPad-10-blau-TeacherStore.png"
    },
]
const grid = document.getElementById("productGrid");
const findBtn = document.getElementById("findBtn");
const countLabel = document.getElementById("count");
const priceRange = document.getElementById("priceFilter");
const priceValueLabel = document.getElementById("priceValue");

priceRange.addEventListener("input", () => {
    priceValueLabel.textContent = priceRange.ariaValue;
});

const updatePriceLabel = () => {
    if (!priceRange || !priceValueLabel) {
        return;
    }
    priceValueLabel.textContent = priceRange.value;
};

if (priceRange && priceValueLabel) {
    priceRange.addEventListener("input", updatePriceLabel);
    priceRange.addEventListener("change", updatePriceLabel);
    updatePriceLabel();
}

const render = (data) => {
    grid.innerHTML = "";
    countLabel.textContent = data.length;

    if (data.length === 0) {
        grid.innerHTML =
            "<h2 style='width: 100%; text-aalign: center'>Нічого не знайдено</h2>"
        return;
    }


    data.forEach((p) => {
        const html = `
    <div class="product-card">
       <img src="${p.img}" alt="${p.name}">
       <div style="font-size: 12px; color: var(--accent)">${p.brand}</div>
       <h3>${p.name}</h3>
       <p style="color: var(--text-dim); font-size: 14px">Колір: ${p.color}</p>
       <p class="price">$${p.price}</p>
       <button class="search-btn" style="padding: 8px; font-size: 14px">У кошик</button>
    </div>
    `;
        grid.insertAdjacentHTML("beforeend", html);
    });
};

const applyFilters = () => {
    const nameQuery = document
        .getElementById("nameFilter")
        .value.toLowerCase()
        .trim();
    const brandQuery = document.querySelector(
        'input[name="brand"]:checked',
    ).value;
    const categoryFilter = document.getElementById("categoryFilter");
    const catQuery = categoryFilter ? categoryFilter.value : "all";
    const maxPrice = Number(priceRange.value);
    const sortOrderSelect = document.getElementById("sortOrder");
    const sortOrder = sortOrderSelect ? sortOrderSelect.value : "none";

    // const catQuery = document.getElementById("categoryFilter").value;
    // const maxPrice = Number(priceRange.value);
    // const sortOrder = document.getElementById("sortOrder").value;

    const selectedColors = Array.from(
        document.querySelectorAll(".color-filter:checked"),
    ).map((cb) => cb.value);

    let filtered = products.filter((p) => {
        const matchName = p.name.toLowerCase().includes(nameQuery);
        const matchBrand = brandQuery === "all" || p.brand === brandQuery;
        const matchCat = catQuery === "all" || p.category === catQuery;
        const matchPrice = p.price <= maxPrice;
        const matchColor = selectedColors.length === 0 || selectedColors.includes(p.color);

        return matchName && matchBrand && matchCat && matchPrice && matchColor;
    });

    if (sortOrder === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "higtToLow") {
        filtered.sort((a, b) => b.price - a.price);
    }

    render(filtered);

    if (sortOrder === "lowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
        filtered.sort((a, b) => b.price - a.price);
    }
    render(filtered)
}


findBtn.addEventListener("click", applyFilters);

render(products)

