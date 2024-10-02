document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.querySelector('.cart-toggle');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close');
    const cartItems = document.querySelector('.cart-items');
    const miniCartEmpty = document.querySelector('.miniCartEmpty');
    
    let cartCount = 0;

    // Función para abrir la ventana modal del carrito
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block'; // Mostrar la ventana modal
        if (cartCount === 0) {
            miniCartEmpty.style.display = 'block'; // Mostrar mensaje si no hay productos
        } else {
            miniCartEmpty.style.display = 'none'; // Ocultar mensaje si hay productos
        }
    });

    // Función para cerrar la ventana modal cuando se hace clic en el botón de cerrar (X)
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none'; // Ocultar la ventana modal
    });

    // Función para eliminar un producto del carrito
    function removeFromCart(event) {
        const productToRemove = event.target.closest('li');
        productToRemove.remove();
        cartCount--;
        document.querySelector('.cart-count').textContent = cartCount;

        // Mostrar el mensaje de carrito vacío si ya no hay productos
        if (cartCount === 0) {
            miniCartEmpty.style.display = 'block';
        }
    }

    // Función para agregar un producto al carrito
    function addToCart(productName) {
        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;

        const newProduct = document.createElement('li');

        // Crear el nombre del producto dentro de un span
        const productSpan = document.createElement('span');
        productSpan.textContent = productName;

        // Crear el botón de eliminar
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', removeFromCart); // Vincular el evento de eliminación

        // Añadir el nombre del producto y el botón al elemento <li>
        newProduct.appendChild(productSpan);
        newProduct.appendChild(removeButton);
        cartItems.appendChild(newProduct);

        miniCartEmpty.style.display = 'none'; // Ocultar mensaje de carrito vacío
    }

    // Agregar el evento a todos los botones "agg al carrito"
    const addToCartButtons = document.querySelectorAll('.produc-box .btn:first-of-type');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent; // Obtener el nombre del producto
            addToCart(productName); // Añadir el producto al carrito
        });
    });
});
