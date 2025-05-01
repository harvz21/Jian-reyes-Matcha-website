// Cart functionality for the product page
// This script handles adding items to the cart, updating quantities, and displaying the cart total.
const cartItems = [];
      const cartList = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      const checkoutBtn = document.getElementById('checkout');
      const clearCartBtn = document.getElementById('clear-cart');

      // Function to update cart items in the UI
      function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

          // Display item information with quantity and cost
          const itemText = document.createElement('span');
          itemText.textContent = `${item.name} (${item.variant}) - ₱${(item.price * item.quantity).toFixed(2)} (x ${item.quantity})`;

          const controls = document.createElement('div');
          controls.className = "flex items-center space-x-2";

          // Minus button
          const minusBtn = document.createElement('button');
          minusBtn.textContent = '-';
          minusBtn.className = 'bg-gray-300 px-2 rounded';
          minusBtn.onclick = () => {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              cartItems.splice(index, 1);
            }
            updateCart();
          };

          // Plus button
          const plusBtn = document.createElement('button');
          plusBtn.textContent = '+';
          plusBtn.className = 'bg-gray-300 px-2 rounded';
          plusBtn.onclick = () => {
            item.quantity++;
            updateCart();
          };

          // Remove button
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.className = 'bg-red-500 text-white px-2 rounded';
          removeBtn.onclick = () => {
            cartItems.splice(index, 1);
            updateCart();
          };

          controls.appendChild(minusBtn);
          controls.appendChild(plusBtn);
          controls.appendChild(removeBtn);

          li.appendChild(itemText);
          li.appendChild(controls);
          cartList.appendChild(li);

          total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);

        // Show "Proceed to Checkout" if the cart is not empty
        if (cartItems.length > 0) {
          checkoutBtn.classList.remove('hidden');
        } else {
          checkoutBtn.classList.add('hidden');
        }
      }

      // Add product to cart
      document.querySelectorAll('.add-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
          const productElement = e.target.closest('.product');
          const name = productElement.dataset.name;
          const price = parseFloat(productElement.querySelector('.variant-select').selectedOptions[0].getAttribute('data-price'));
          const variant = productElement.querySelector('.variant-select').value;

          const existingItem = cartItems.find(item => item.name === name && item.variant === variant);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            cartItems.push({ name, price, variant, quantity: 1 });
          }

          updateCart();
        });
      });

      // Clear cart
      clearCartBtn.addEventListener('click', () => {
        cartItems.length = 0;
        updateCart();
      });