
let carts = document.querySelectorAll('.buy--btn')
let products = [
    {
        name: 'Apple',
        tag: 'Apple',
        price: 80,
        inCart: 0
    },
    {
        name: 'Banana',
        tag: 'Banana',
        price: 50,
        inCart: 0
    },
    {
        name: 'Mango',
        tag: 'Mango',
        price: 400,
        inCart: 0
    },
    {
        name: 'Orange',
        tag: 'Orange',
        price: 80,
        inCart: 0
    },
    {
        name: 'Pineapple',
        tag: 'Pineapple',
        price: 80,
        inCart: 0
    },
    {
        name: 'Watermelon',
        tag: 'Watermelon',
        price: 60,
        inCart: 0
    },
    {
        name: 'Strawberry',
        tag: 'Strawberry',
        price: 300,
        inCart: 0
    },
    {
        name: 'Pear',
        tag: 'Pear',
        price: 56,
        inCart: 0
    },
    {
        name: 'Grapes',
        tag: 'Grapes',
        price: 100,
        inCart: 0
    },
    {
        name: 'Papaya',
        tag: 'Papaya',
        price: 38,
        inCart: 0
    },
    {
        name: 'Coconut',
        tag: 'Coconut',
        price: 30,
        inCart: 0
    },
    {
        name: 'Jackfruit',
        tag: 'Jackfruit',
        price: 500,
        inCart: 0
    },
    {
        name: 'Black grapes',
        tag: 'Black grapes',
        price: 115,
        inCart: 0
    },
    {
        name: 'Pomogranate',
        tag: 'Pomogranate',
        price: 90,
        inCart: 0
    },
    {
        name: 'Cherry',
        tag: 'Cherry',
        price: 140,
        inCart: 0
    },
    {
        name: 'Kiw',
        tag: 'Kiwi',
        price: 200,
        inCart: 0
    },
    {
        name: 'Sugar apple',
        tag: 'Sugar apple',
        price: 60,
        inCart: 0
    },
    {
        name: 'Melon',
        tag: 'Melon',
        price: 70,
        inCart: 0
    },
    {
        name: 'Jamun',
        tag: 'Jamun',
        price: 55,
        inCart: 0
    },
    {
        name: 'Fig',
        tag: 'Fig',
        price: 90,
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