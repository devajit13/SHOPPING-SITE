const products = [
 {id:1,name:"Cricket Bat",price:1999,cat:"sports",img:"https://picsum.photos/200?1"},
 {id:2,name:"Football",price:799,cat:"sports",img:"https://picsum.photos/200?2"},
 {id:3,name:"T-Shirt",price:499,cat:"fashion",img:"https://picsum.photos/200?3"},
 {id:4,name:"Shoes",price:1299,cat:"fashion",img:"https://picsum.photos/200?4"},
 {id:5,name:"Smart Watch",price:2199,cat:"electronics",img:"https://picsum.photos/200?5"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* HOME PAGE */
if (document.getElementById("productList")) {
  showProducts(products);
}

function showProducts(list) {
  productList.innerHTML = "";
  list.forEach(p=>{
    productList.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p.id}" class="cart-link">View</a>
      </div>`;
  });
}

function filterProducts(cat){
  showProducts(cat==="all"?products:products.filter(p=>p.cat===cat));
}

function searchProducts(){
  const v = search.value.toLowerCase();
  showProducts(products.filter(p=>p.name.toLowerCase().includes(v)));
}

/* PRODUCT PAGE */
if (location.pathname.includes("product.html")) {
  const id = new URLSearchParams(location.search).get("id");
  const p = products.find(x=>x.id==id);
  img.src=p.img; name.innerText=p.name; price.innerText="₹"+p.price;
  window.addToCart=()=>{ 
    const item=cart.find(i=>i.id==p.id);
    item?item.qty++:cart.push({...p,qty:1});
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Added 💗");
  };
}

/* CART PAGE */
if (document.getElementById("cartItems")) {
  let total=0; cartItems.innerHTML="";
  cart.forEach((i,idx)=>{
    total+=i.price*i.qty;
    cartItems.innerHTML+=`
      <div>
        ${i.name} ₹${i.price} × ${i.qty}
        <button onclick="cart[${idx}].qty++;save()">+</button>
        <button onclick="cart[${idx}].qty--;save()">-</button>
        <button onclick="cart.splice(${idx},1);save()">Remove</button>
      </div>`;
  });
  totalEl.innerText=total;
}

function save(){
  cart=cart.filter(i=>i.qty>0);
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload();
}

/* LOGIN */
function login(){
  localStorage.setItem("user",user.value);
  alert("Login successful");
  location.href="index.html";
}
