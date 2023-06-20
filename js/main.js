let productList = document.getElementById('product-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(productId) {
    let product = productos.find(function(p) {
        return p.id === productId;
    });

    let cartItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (cartItem) {
        cartItem.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    updateCart();
    renderCart();
    renderTotal();
}
function removeCart(productId) {
    let index = cart.findIndex(function(p) {
        return p.id === productId;
    });

    if (index !== -1) {
        let cartItem = cart[index];
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart.splice(index, 1);
        }

        updateCart();
        renderCart();
        renderTotal();
    }
}
function renderProductos() {
    for (let i = 0; i < productos.length; i++) {
        let product = productos[i];

        let col = document.createElement('div');
        col.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'my-3');

        let card = document.createElement('div');
        card.classList.add('card');

        let imagen = document.createElement('img');
        imagen.classList.add('card-img-top');
        imagen.src = product.imagen;
        imagen.alt = product.nombre;

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.nombre;

        let cardPrecio = document.createElement('p');
        cardPrecio.classList.add('card-text');
        cardPrecio.textContent = 'Precio: $' + product.precio;

        let addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-primary');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.addEventListener('click', function(productId) {
            return function() {
                addToCart(productId);
            };
        }(product.id));

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrecio);
        cardBody.appendChild(addToCartButton);
        card.appendChild(imagen);
        card.appendChild(cardBody);
        col.appendChild(card);
        productList.appendChild(col);
    }
}

function renderCart() {
    let cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];

        let col = document.createElement('div');
        col.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');

        let card = document.createElement('div');
        card.classList.add('card');
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.nombre;

        let cardPrecio = document.createElement('p');
        cardPrecio.classList.add('card-text');
        cardPrecio.textContent = 'Precio: $' + product.precio;

        let cardQuantity = document.createElement('p');
        cardQuantity.classList.add('card-text');
        cardQuantity.textContent = 'Cantidad: ' + product.quantity;

        let removeCartButton = document.createElement('button');
        removeCartButton.classList.add('btn', 'btn-danger');
        removeCartButton.textContent = 'Quitar';
        removeCartButton.addEventListener('click', function(productId) {
            return function() {
                removeCart(productId);
            };
        }(product.id));

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrecio);
        cardBody.appendChild(cardQuantity);
        cardBody.appendChild(removeCartButton);
        card.appendChild(cardBody);
        col.appendChild(card);
        cartList.appendChild(col);
    }
}
function renderTotal() {
    let totalElemento = document.getElementById('total');
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        total += product.precio * product.quantity;
    }
    totalElemento.textContent = 'Total: $' + total;
}

renderProductos();
renderCart();
renderTotal();

