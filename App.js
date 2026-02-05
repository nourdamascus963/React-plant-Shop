// Plant data - 6 plants in 3 categories
const plants = [
    { id: 1, name: "Snake Plant", price: 25.99, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1593482892290-5d188b9e56dc?w=400&h=300&fit=crop" },
    { id: 2, name: "Peace Lily", price: 19.99, category: "Flowering", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w-400&h=300&fit=crop" },
    { id: 3, name: "Aloe Vera", price: 15.99, category: "Succulents", image: "https://images.unsplash.com/photo-1517191434909-f8477d8aaa80?w=400&h=300&fit=crop" },
    { id: 4, name: "Spider Plant", price: 22.99, category: "Indoor Plants", image: "https://images.unsplash.com/photo-1545243421-89e5c9b6d12c?w=400&h=300&fit=crop" },
    { id: 5, name: "Orchid", price: 34.99, category: "Flowering", image: "https://images.unsplash.com/photo-1517232115160-ff9336471832?w=400&h=300&fit=crop" },
    { id: 6, name: "Echeveria", price: 12.99, category: "Succulents", image: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=400&h=300&fit=crop" }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('plantCart')) || [];

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = totalItems;
    });
    localStorage.setItem('plantCart', JSON.stringify(cart));
}

// Add to cart function
function addToCart(plantId) {
    const plant = plants.find(p => p.id === plantId);
    const existingItem = cart.find(item => item.id === plantId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...plant, quantity: 1 });
    }
    
    updateCartCount();
    alert(`${plant.name} added to cart!`);
    
    // Disable button if on products page
    const btn = document.querySelector(`button[onclick="addToCart(${plantId})"]`);
    if (btn) btn.disabled = true;
}

// Render plants on products page
function renderPlants() {
    const container = document.getElementById('plants-container');
    if (!container) return;
    
    container.innerHTML = plants.map(plant => `
        <div class="col-md-4 mb-4">
            <div class="card plant-card h-100">
                <img src="${plant.image}" class="card-img-top" alt="${plant.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <span class="badge bg-success category-badge">${plant.category}</span>
                    <h5 class="card-title mt-2">${plant.name}</h5>
                    <p class="card-text">$${plant.price.toFixed(2)}</p>
                    <button class="btn btn-success w-100" onclick="addToCart(${plant.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render cart items
function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-muted">Your cart is empty</p>';
        document.getElementById('empty-cart').style.display = 'block';
    } else {
        document.getElementById('empty-cart').style.display = 'none';
        container.innerHTML = cart.map(item => `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}" style="height: 100px; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price.toFixed(2)} each</p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="mx-3">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center justify-content-end">
                        <h5>$${(item.price * item.quantity).toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        `).join('');
        
        updateCartSummary();
    }
}

// Update quantity
function updateQuantity(plantId, change) {
    const item = cart.find(item => item.id === plantId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== plantId);
        }
        updateCartCount();
        renderCart();
    }
}

// Remove from cart
function removeFromCart(plantId) {
    cart = cart.filter(item => item.id !== plantId);
    updateCartCount();
    renderCart();
}

// Update cart summary
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Checkout function
function checkout() {
    alert("Checkout feature coming soon!");
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    if (document.getElementById('plants-container')) {
        renderPlants();
    }
    
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});
