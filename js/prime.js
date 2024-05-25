document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartElement = document.getElementById('cart');
    const paymentForm = document.getElementById('payment-form');
    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentDetails = document.getElementById('payment-details');

    function updateCart() {
        cartElement.innerHTML = '';
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Your cart is empty.</p>';
            paymentForm.style.display = 'none';
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

            paymentForm.style.display = 'block';
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

    paymentMethodSelect.addEventListener('change', function() {
        paymentDetails.innerHTML = '';
        switch (this.value) {
            case 'credit-card':
                paymentDetails.innerHTML = `
                    <label for="cc-number">Credit Card Number:</label>
                    <input type="text" id="cc-number" name="cc-number" required>
                    <label for="cc-expiry">Expiry Date:</label>
                    <input type="text" id="cc-expiry" name="cc-expiry" required>
                    <label for="cc-cvc">CVC:</label>
                    <input type="text" id="cc-cvc" name="cc-cvc" required>
                `;
                break;
            case 'paypal':
                paymentDetails.innerHTML = `
                    <label for="paypal-email">PayPal Email:</label>
                    <input type="email" id="paypal-email" name="paypal-email" required>
                `;
                break;
            case 'bank-transfer':
                paymentDetails.innerHTML = `
                    <label for="bank-account">Bank Account Number:</label>
                    <input type="text" id="bank-account" name="bank-account" required>
                    <label for="bank-routing">Routing Number:</label>
                    <input type="text" id="bank-routing" name="bank-routing" required>
                `;
                break;
        }
    });

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment submitted successfully!');
        // Here you can add functionality to handle the payment submission
    });

    updateCart();
});