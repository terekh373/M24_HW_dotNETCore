async function orderProduct(id) {
    try {
        const res = await fetch(`https://localhost:7089/api/apiproduct/${id}`);
        if (!res.ok) throw new Error("Товар не знайдено");
        const product = await res.json();

        const hasImage = product.imageData || product.imageFile || product.imageType;
        const imageUrl = hasImage ? `https://localhost:7089/images/${product.id}.jpg` : '../img/no_image.jpeg';

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description || "Без опису",
            image: imageUrl
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} додано в кошик!`);

    } catch (err) {
        console.error(err);
        alert("Помилка додавання в кошик");
    }
}

async function getProducts() {
    const url = `https://localhost:7089/api/apiproduct`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const products = await res.json();

        const parent_div = document.getElementById("product_list");
        parent_div.innerHTML = "";

        products.forEach(product => {
            const col = document.createElement("div");
            col.className = "col";

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0 overflow-hidden transition-all hover-shadow">
                    <div class="position-relative overflow-hidden bg-light">
                        <img src="${product.image || './img/no_image.jpeg'}" 
                             class="card-img-top"
                             alt="${product.name}"
                             style="height: 220px; width: 100%; object-fit: contain; transition: transform .3s;">
                    </div>
                    <div class="card-body d-flex flex-column p-4">
                        <h5 class="card-title fw-bold mb-2" style="font-size: 1.1rem;">
                            ${product.name}
                        </h5>
                        <p class="card-text text-muted small flex-grow-1 mb-3" 
                           style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                            ${product.description || 'Немає опису'}
                        </p>
                        <div class="mt-auto">
                            <p class="h5 text-success fw-bold mb-3">${product.price} грн</p>
                            <button onclick="orderProduct(${product.id})" 
                                    class="btn btn-success w-100 fw-semibold shadow-sm">
                                Купити
                            </button>
                        </div>
                    </div>
                </div>
            `;

            const card = col.querySelector('.card');
            card.addEventListener('mouseenter', () => {
                card.querySelector('img').style.transform = 'scale(1.08)';
            });
            card.addEventListener('mouseleave', () => {
                card.querySelector('img').style.transform = 'scale(1)';
            });

            parent_div.appendChild(col);
        });
    } catch (err) {
        document.getElementById("output").innerHTML =
            `<div class="alert alert-danger">Помилка завантаження товарів: ${err.message}</div>`;
    }
}

async function main() {
    getProducts();
}
main();