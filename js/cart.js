document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartElement = document.getElementById('cart');

    function updateCart() {
        cartElement.innerHTML = '';
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            const cartList = document.createElement('ul');
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - $${item.price.toFixed(2)} (Qty: ${item.quantity})`;
                cartList.appendChild(listItem);
            });
            cartElement.appendChild(cartList);

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const totalElement = document.createElement('p');
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
            cartElement.appendChild(totalElement);
        }
    }

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    updateCart();
});
