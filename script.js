

// объекты товаров
let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

const addButtons = document.querySelectorAll(".add-to-cart-btn");

// список корзины (ul)
const cartList = document.querySelector("#cart-list");

const cartTotal = document.querySelector("#cart-total");

//  "Оплатить"
const payBtn = document.querySelector("#pay-btn");

// кнопка "Очистить корзину"
const clearBtn = document.querySelector("#clear-btn");

// выпадающий список фильтра
const filterSelect = document.querySelector("#filter");

// все карточки товаров
const productCards = document.querySelectorAll(".card");

const saveCartToStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


// подсчёт общей суммы
// перебор массива и сумма цены

const calculateTotal = () => {
    let total = 0; // сумма = 0
    
    cart.forEach(item => {
        total += item.price;
    });
    return total; // итоговая сумма
};



// Стрелочная функция
// Очищает список и заново пишет все товары

const renderCart = () => {
    // Очистка корзины
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }

    //перебор и создание элементы списка
    cart.forEach((item, index) => {
        
        const li = document.createElement("li");
        li.textContent = item.name + " — " + item.price + " руб. ";

        //  кнопка "Удалить" 
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Удалить";
        removeBtn.className = "remove-btn";

        
        removeBtn.addEventListener("click", () => {
           
            cart.splice(index, 1);
            saveCartToStorage();
            renderCart();
        });

        
        li.appendChild(removeBtn);

        cartList.appendChild(li);
    });

    // Пересчет суммы 
    const total = calculateTotal();
    cartTotal.textContent = "Итого: " + total + " руб.";
};



const addToCart = (product) => {
    // Добавляем товар в массив корзины
    cart.push(product);
    saveCartToStorage();
    renderCart();
};



addButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Получаем данные товара 
        const name = button.dataset.name;           
        const price = Number(button.dataset.price);  

        // Создаём объект товара и добавляем в корзину
        addToCart({ name: name, price: price });
    });
});



// кнопка "Оплатить"

payBtn.addEventListener("click", () => {
    // проверка пустоты корзины
    if (cart.length === 0) {
        alert("Корзина пуста!");
    } else {
       
        alert("Оплата прошла успешно! Спасибо за покупку!");
       
        cart = [];
        saveCartToStorage();
        renderCart();
    }
});



clearBtn.addEventListener("click", () => {
  
    cart = [];
   saveCartToStorage();
    renderCart();
});

// фильтруем товары

const filterProducts = (category) => {
    
    productCards.forEach(card => {
        
        const cardCategory = card.dataset.category;

       
        if (category === "all" || cardCategory === category) {
            card.style.display = "block"; // показать 
        } else {
            card.style.display = "none";  // скрыть 
        }
    });
};


filterSelect.addEventListener("change", () => {
    
    const selectedCategory = filterSelect.value;
    
    filterProducts(selectedCategory);
});
renderCart();