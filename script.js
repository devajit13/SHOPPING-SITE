const products = {
  1: { name: "Cricket Bat", price: 1999 },
  2: { name: "Football", price: 799 },
  3: { name: "T-Shirt", price: 499 },
  4: { name: "Shoes", price: 1299 },
  5: { name: "Smart Watch", price: 2199 },
  6: { name: "Headphones", price: 1599 }
};

/* PRODUCT PAGE */
if (location.pathname.includes("product.html")) {
  const id = new URLSearchParams(location.search).get("id");
  document.getElementById("name").innerText = products[id].name;
  document.getElementById("price").innerText = "₹" + products[id].price;

  window.addToCart = function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(products[id]);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart 💗");
  };
}

/* CART PAGE */
if (location.pathname.includes("cart.html")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  const list = document.getElementById("cart-list");

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}
