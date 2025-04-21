async function fetchCouches() {
    let url = 'https://jsonmockserver.vercel.app/api/shopping/furniture/products?category=couches';
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching data!")
        }
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function createContainer() {
    let root = document.querySelector("#root");
    let productParentContainer = document.createElement("section");
    productParentContainer.classList.add("productParentContainer");
    root.appendChild(productParentContainer);
    createCartArea(root);
}

function createCartArea(container) {
    let cartContainer = document.createElement("section");
    cartContainer.classList.add("cartParentContainer");
    let wishAndCartToggleContainer = document.createElement("section");
    wishAndCartToggleContainer.classList.add("wishAndCartToggleContainer");
    let cartToggleButton = document.createElement("button");
    cartToggleButton.innerHTML = "My Cart";
    let wishToggleButton = document.createElement("button");
    wishToggleButton.innerHTML = "My Wishlist";
    wishAndCartToggleContainer.append(cartToggleButton, wishToggleButton);
    cartContainer.appendChild(wishAndCartToggleContainer)
    let cartContents = document.createElement("section");
    cartContents.classList.add("cartContents");
    cartContents.innerHTML = "Cart Content";
    cartContainer.appendChild(cartContents);

    container.appendChild(cartContainer);
}

function plusButton() {
    //for funcitonality of adding and subtracting items in cart
}

function createProductCard(products) {
    let productParentContainer = document.querySelector(".productParentContainer");
    if (!products) {
        let errorMessage = document.createElement("h3");
        errorMessage.innerHTML = "Error fetching products";
        productParentContainer.insertBefore(errorMessage, productParentContainer.firstChild)
        return
    }
    products.forEach(product => {
    let productContainer = document.createElement("section");
    productContainer.classList.add("productContainer");
    productContainer.setAttribute("id", product.id)
    productContainer.setAttribute("data", JSON.stringify(product));
    createProductImage(product, productContainer);
    createProductNameandPrice(product, productContainer)
    createProductDescription(product, productContainer)
    createWishlistAndCartButton(productContainer)

    productParentContainer.appendChild(productContainer);
    })
}

function createProductImage(product, container) {
    let productPicture = document.createElement("img");
    productPicture.classList.add("productPicture");
    productPicture.src = product.photo;
    productPicture.alt = `Picture of ${product.name}`;
    container.appendChild(productPicture);
}

function createProductNameandPrice(product, container) {
    let productNameandPriceContainer = document.createElement("div");
    productNameandPriceContainer.classList.add("nameAndPriceContainer");
    let productName = document.createElement("h3");
    productName.classList.add("productName");
    let productPrice = document.createElement("h3");
    productPrice.classList.add("productPrice");
    productName.innerHTML = product.name;
    productPrice.innerHTML = `$${product.price}`
    productNameandPriceContainer.append(productName, productPrice);
    container.appendChild(productNameandPriceContainer);
}

function createProductDescription(product, container) {
    let productDescriptionContainer = document.createElement("section");
    let descriptionContainer = document.createElement("p");
    let guaranteeContainer = document.createElement("p");
    descriptionContainer.innerHTML = product.description;
    guaranteeContainer.innerHTML = `${product.guarantee} Year Guarantee`;
    productDescriptionContainer.append(descriptionContainer, guaranteeContainer);
    container.appendChild(productDescriptionContainer)
}

function createWishlistAndCartButton(container) {
    let wishlistAndCartButtonContainer = document.createElement("div");
    wishlistAndCartButtonContainer.classList.add("wishlistAndCartButtonContainer");
    let wishlistButton = document.createElement("button");
    let addToCartButton = document.createElement("button");
    wishlistButton.innerHTML = "Add to Wishlist";
    addToCartButton.innerHTML = "Add to Cart";
    addToCartButton.addEventListener("click", function(e) {
        addToCart(e);
    });
    // addToCartButton.onclick = addToCart(e);
    wishlistAndCartButtonContainer.append(wishlistButton, addToCartButton);
    container.appendChild(wishlistAndCartButtonContainer);
}

function addToCart(e) {
    let productItemContainer = e.target.closest(".productContainer");
    let cartContainer = document.querySelector(".cartContents");
    let productId = productItemContainer.getAttribute("id");
    let productName = productItemContainer.querySelector(".productName").textContent;
    let productPhoto = productItemContainer.querySelector(".productPicture").src;
    let productPrice = productItemContainer.querySelector(".productPrice").textContent.slice(1);
    let productObject = {
        productId: productId,
        productName: productName,
        productPhoto: productPhoto,
        productPrice: productPrice
    }
    createCartItem(productObject, cartContainer);
}

function createCartItem(product, container) {
    console.log(product)
    let result = checkCart(product);
    if (result) {
        //add logic to increase counter on cart
        console.log("true");
        console.log(container)
        console.log(product);
    } else {
        let newCartItem = document.createElement("section");
        newCartItem.classList.add("cartItem");
        newCartItem.setAttribute("id", product.productId);
        createCartImg(product, newCartItem);
        createCartNameAndPrice(product, newCartItem);
        createCartAmount(1, newCartItem);
        container.appendChild(newCartItem);
    }
}

function checkCart(product) {
    console.log(product)
    let productId = product.productId;
    let productName = product.productName;
    let productPhoto = product.productPhoto;
    let productPrice = product.productPrice;
    let localStorageResponse = JSON.parse(localStorage.getItem("cart"));
    if (!localStorageResponse) {
        let productObject = [{
            // productId: productId,
            // productName: productName,
            // productPhoto: productPhoto,
            // productPrice: productPrice,
            ...product,
            quantity: 1
        }]
        console.log(productObject);
        localStorage.setItem('cart', JSON.stringify(productObject));
        return false;
    } 
    let presentInCart = false;
    localStorageResponse.forEach(item => {
        if (item.productId === productId) {
            item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(localStorageResponse))
            presentInCart = true;
        }
    });
    if (presentInCart) {
        return true;
    } else {
        let productObject = {
            productId: productId,
            productName: productName,
            productPhoto: productPhoto,
            productPrice: productPrice,
            quantity: 1
        }
        localStorageResponse.push(productObject);
        localStorage.setItem("cart", JSON.stringify(localStorageResponse));
        return false;
    }
}

function createCartImg(product, container) {
    let productPicture = product.productPhoto;
    let productPictureSection = document.createElement("img");
    productPictureSection.src = productPicture;
    container.appendChild(productPictureSection);
}
function createCartNameAndPrice(product, container) {
    let productName = product.productName;
    let productPrice = product.productPrice;
    let productNameAndPriceContainer = document.createElement("div");
    productNameAndPriceContainer.classList.add("cartNameandPrice");
    let productNameSection = document.createElement("p");
    productNameSection.innerHTML = productName;
    let productPriceSection = document.createElement("p");
    productPriceSection.innerHTML = `$${productPrice}`;
    productNameAndPriceContainer.append(productNameSection, productPriceSection);
    container.appendChild(productNameAndPriceContainer)
}

function createCartAmount(amount, container) {
    let productAmountSection = document.createElement("div");
    productAmountSection.classList.add("cartAmount")
    let minusButton = document.createElement("button");
    minusButton.innerHTML = "-"
    let amountDisplay = document.createElement("p");
    if (amount) {
        amountDisplay.innerHTML = amount;
    } else {
        amountDisplay.innerHTML = 1;
    }
    let plusButton = document.createElement("button");
    plusButton.innerHTML = "+";
    productAmountSection.append(minusButton, amountDisplay, plusButton);
    container.appendChild(productAmountSection)
}

function fillCart() {
    let localStorageResponse = JSON.parse(localStorage.getItem("cart"));
    if (localStorageResponse) {
        localStorageResponse.forEach(item => {
            let cartContainer = document.querySelector(".cartContents");
            let newCartItem = document.createElement("section");
            newCartItem.classList.add("cartItem");
            newCartItem.setAttribute("id", item.productId);
            createCartImg(item, newCartItem);
            createCartNameAndPrice(item, newCartItem);
            createCartAmount(item.quantity, newCartItem);
            cartContainer.appendChild(newCartItem);
        })
    }
}
export { fetchCouches, createContainer, createProductCard, fillCart }
