let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    calculateTotal();
});

function renderCart() {
    const cartContainer = document.getElementById('cart_items');
    const emptyCartDiv = document.getElementById('empty_cart');

    if (cart.length === 0) {
        emptyCartDiv.classList.remove('d-none');
        cartContainer.innerHTML = '';
        return;
    }

    emptyCartDiv.classList.add('d-none');

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="d-flex align-items-center border rounded p-3 mb-3 cart-item shadow-sm">
            <img src="${item.image || './img/no_image.jpeg'}" alt="${item.name}" class="me-3">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <small class="text-muted">${item.description || 'Без опису'}</small>
            </div>
            <div class="text-end">
                <strong class="text-success">${item.price} UAH</strong><br>
                <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${index})">
                    DELETE
                </button>
            </div>
        </div>
    `).join('');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    calculateTotal();
}

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total_price').textContent = total + ' UAH';
}

document.getElementById('order_form').addEventListener('submit', function (e) {
    e.preventDefault();

    const orderData = {
        customer: {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        items: cart,
        total: cart.reduce((sum, i) => sum + i.price, 0)
    };

    console.log('Замовлення:', orderData);
    alert(`Дякуємо, ${orderData.customer.name}! Замовлення на ${orderData.total} UAH оформлено!`);

    localStorage.removeItem('cart');
    cart = [];
    renderCart();
    calculateTotal();
    this.reset();
});