  document.addEventListener("DOMContentLoaded", function () {
    const cartTableBody = document.getElementById("cart-items");
    const totalElement = document.querySelector(".product-total");

    function getCartItems() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function renderCart() {
        const cart = getCartItems();
        cartTableBody.innerHTML = ""; 
        let total = 0;

        if (cart.length === 0) {
            cartTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No products in the cart</td></tr>`;
            totalElement.textContent = "$0.00";
            return;
        }

        cart.forEach((product, index) => {
            let productTotal = parseFloat(product.price) * product.quantity; 
            total += productTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="product-thumbnail"><img src="${product.image}" alt="${product.title}" class="img-fluid" width="50"></td>
                <td class="product-name"><h2 class="h5 text-black">${product.title}</h2></td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control quantity-amount" value="${product.quantity}" min="1" data-index="${index}">
                </td>
                <td class="product-total">$${productTotal.toFixed(2)}</td>
                <td><button class="btn btn-black btn-sm remove" data-index="${index}">X</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    renderCart();

    
    document.addEventListener("change", function(event) {
        if (event.target.classList.contains("quantity-amount")) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);

            let cart = getCartItems();
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart(); 
        }
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove")) {
            const index = event.target.dataset.index;

            let cart = getCartItems();
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            renderCart(); 
        }
    });

    document.querySelector(".btn-black.btn-sm.btn-block").addEventListener("click", function() {
        const quantityInputs = document.querySelectorAll(".quantity-amount");

        let cart = getCartItems();
        quantityInputs.forEach((input, index) => {
            cart[index].quantity = parseInt(input.value);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });
});



//thank you


function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")); 

    if (cart && cart.length > 0) {
      
        window.location = 'thankyou.html';
    } else {
    
        alert("يرجى إضافة منتجات إلى العربة أولاً.");
    }
}
