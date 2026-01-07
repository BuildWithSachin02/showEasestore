// const { createElement } = require("react");

const cart_container = document.getElementById("cart-items");
const totalitems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");
const CartSumm = document.getElementById("cart-summary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function LoadCart(){
    let cart = localStorage.getItem("cart");//abb mne main js ki file me cart ka data cart.js ki file leke aagye hum

    //agr in future fresh user jab visit ke liye aye toh ussne koi add nhi kiya hoga product toh usse mujhe kuch toh show krwna hogaa na 
    if(!cart || cart === "undefined"){
        return []; //return krdo khali array 
    }
    return JSON.parse(cart);//js ki file ke language me hmne convert krdiya hmne
}

function ShowCartitems(){
    let cart = LoadCart();//abmne iss fun ke liye mene jo data hmne local ke mnwaya toh usse muje wahi product display krwana h usse 
    let total = 0;
    let totalqty = 0;
    //agr cart empty h toh uske liye mujhe cart page pe message show krwna h 
    if(cart.length === 0){
        cart_container.innerHTML = `<p>Your cart is empty</p>`;
        totalPrice.textContent = 0;
        totalitems.textContent = 0;
        return;
    }
    cart_container.innerHTML = "";// clear old content
    
    cart.forEach(items =>{
        total += items.price * items.qty;
        totalqty += items.qty;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = 
            `<img src="${items.productimg}" alt="${items.title}">

        <div class="item-details">
          <h3>${items.title}</h3>
          <p>Price:$${items.price}</p>
          <p>stocks: ${items.stock} - left</p>
        </div>
        <div class="item-price">
          <div class="quantity-control">
            <button onclick="decreseQty(${items.id})" class="qty-btn">−</button>
            <span class="qty">${items.qty}</span>
            <button onclick="increseQty(${items.id})"  class="qty-btn">+</button>
          </div>

          <p class="price">Total:$${(items.price * items.qty).toFixed(2)}</p>
          <button onclick="removeitem(${items.id})"  class="remove-btn">Remove</button>
        </div>
            `;
            cart_container.appendChild(div);
            totalPrice.textContent = (total).toFixed(2);
            totalitems.textContent = totalqty;
    });
}

// ===============================
// INCREASE QUANTITY
// ===============================
function increseQty(id){//cart ke array me product element => us pro ki id === click ki huii ki product ki id dono same honi chhiye tabhi increase hoga 
    const item  = cart.find(product => product.id === id);
    //safety check
    if(!item)return;
    if(item.stock <= item.qty){
        alert(`⚠️ only ${item.stock} item available in stock`);
        return;
    }
    item.qty += 1;
    UpdateItems(); 
}
// ===============================
// DECREASE QUANTITY
// ===============================
function decreseQty(id){
    const item = cart.find(product => product.id === id);//same jesa hmne increase ke liye kiya the

    if(item.qty>1){
        item.qty -= 1;
    }else{
        removeitem(id);//issme hmne jo current add to cart ke page jo item ki id h ussse hmne remove ke function ke ander ke parameter ke ander bej diya hmne
        return;
    }
    UpdateItems();
}
// ===============================
// REMOVE ITEM
// ===============================
function removeitem(id){//hmne filter func ka use kiya jo ek element ko hata ke usse update krne kaa kaam krta h 
    cart = cart.filter(item => item.id !== id);//abb hmne arror fun create kiya aur ussme hmne bola ki agr 2!==2 =>false uss element ko hmne hata diya 
    UpdateItems();
}
// ===============================
// UPDATE CART (SAVE + RERENDER)
// ===============================
function UpdateItems(){//yeh settitme kyy krta h smjo mere pss ek page h mene ek data likha ussme fir baad me mene usse kaat ke new data likha diya iska mtlb yehi h 
    localStorage.setItem("cart",JSON.stringify(cart));
    ShowCartitems();//fir update krne ke baad mujhe baki ke items ko display krwanh  mujhe isse 
}

// ===============================
// INITIAL CALL
// ===============================
ShowCartitems();