
let carts = document.querySelectorAll('.buy--btn')
let products = [
    {
        name: 'potato',
        tag: 'potato',
        price: 30,
        inCart: 0
    },
    {
        name: 'Onion',
        tag: 'Onion',
        price: 20,
        inCart: 0
    },
    {
        name: 'Tomato',
        tag: 'Tomato',
        price: 14,
        inCart: 0
    },
    {
        name: 'Cabbage',
        tag: 'Cabbage',
        price: 43,
        inCart: 0
    },
    {
        name: 'Brinjal',
        tag: 'Brinjal',
        price: 60,
        inCart: 0
    },
    {
        name: 'Carrot',
        tag: 'Carrot',
        price: 23,
        inCart: 0
    },
    {
        name: 'Cauliflower',
        tag: 'Cauliflower',
        price: 44,
        inCart: 0
    },
    {
        name: 'Green peas',
        tag: 'Green peas',
        price: 45,
        inCart: 0
    },
    {
        name: 'Green capsicum',
        tag: 'Green capsicum',
        price: 53,
        inCart: 0
    },
    {
        name: 'Curry leaves',
        tag: 'Curry leaves',
        price: 5,
        inCart: 0
    },
    {
        name: 'Green chilli',
        tag: 'Green chilli',
        price: 13,
        inCart: 0
    },
    {
        name: 'French beans',
        tag: 'French beans',
        price: 52,
        inCart: 0
    },
    {
        name: 'Bottle-gourd',
        tag: 'Bottle-gourd',
        price: 52,
        inCart: 0
    },
    {
        name: 'Bitter-gourd',
        tag: 'Bitter-gourd',
        price: 26,
        inCart: 0
    },
    {
        name: 'Garlic',
        tag: 'Garlic',
        price: 39,
        inCart: 0
    },
    {
        name: 'Lemon',
        tag: 'Lemon',
        price: 5,
        inCart: 0
    },
    {
        name: 'Ginger',
        tag: 'Ginger',
        price: 20,
        inCart: 0
    },
    {
        name: 'French beans',
        tag: 'French beans',
        price: 52,
        inCart: 0
    },
    {
        name: 'Mint leaves',
        tag: 'Mint leaves',
        price: 7,
        inCart: 0
    },
    {
        name: 'Beetroot',
        tag: 'Beetroot',
        price: 23,
        inCart: 0
    },
    {
        name: 'Broad beans',
        tag: 'Broad beans',
        price: 34,
        inCart: 0
    },
    {
        name: 'Matki',
        tag: 'Matki',
        price: 34,
        inCart: 0
    },
    {
        name: 'Green moong',
        tag: 'Green moong',
        price: 35,
        inCart: 0
    },
    {
        name: 'Mixed sprouts',
        tag: 'Mixed sprouts',
        price: 37,
        inCart: 0
    },
    {
        name: 'Fenugreek',
        tag: 'Fenugreek',
        price: 42,
        inCart: 0
    },
    {
        name: 'corriander leaves',
        tag: 'Corriander leaves',
        price: 8,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumber(){
    let productNumber = localStorage.getItem('Cartnumbers')
    if(productNumber){
        document.querySelector('.menubar span').textContent = productNumber;
    }
}

function cartNumbers(product) {
    
    let productNumber = localStorage.getItem('Cartnumbers')
    productNumber = parseInt(productNumber)

    if(productNumber){
        localStorage.setItem('Cartnumbers', productNumber + 1);
        document.querySelector('.menubar span').textContent = productNumber + 1;
    }
    else{
        localStorage.setItem('Cartnumbers', 1);
        document.querySelector('.menubar span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){

    let cartItems = localStorage.getItem('productInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }

    
    localStorage.setItem("productInCart", JSON.stringify(cartItems))
}

function totalCost(product){
    let cartCost = localStorage.getItem("TotalCost")

    if(cartCost != null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("TotalCost", cartCost + product.price)
    }
    else{
        localStorage.setItem("TotalCost", product.price)
    }
    
}

function displayCart(){
    let cartItems = localStorage.getItem('productInCart')
    let cartCost = localStorage.getItem('TotalCost')

    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products')
    console.log(cartItems)
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        productContainer.innerHTML = `
        <div class="product">
            <table class="table table-success table-striped>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">TOTAL</th>
                    </tr>
                </thead>
            </table>
          </div>

        `
        Object.values(cartItems).map(item => 
            {
            productContainer.innerHTML += `
            <div class="product">
            <table class="table table-striped">
            
            <tbody>
              <tr>
                <th class="name"> ${item.name} </th>
                <td>Rs ${item.price}</td>
                <td>${item.inCart}</td>
                <td class="total">Rs ${item.inCart * item.price}</td>
              </tr>
            </tbody>
          </table>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total </h4>
                <h4 class="basketTotal">
                    Rs. ${cartCost}.00
                </h4>
            </div>
        `;
    }

}



onLoadCartNumber();
displayCart();