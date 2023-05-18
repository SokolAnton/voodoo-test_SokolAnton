function toggleHidden() {
  const hiddenContent = document.getElementById("hiddenContent");
  hiddenContent.classList.toggle("hidden");
}

function fetchProducts() {
  return fetch("https://voodoo-sandbox.myshopify.com/products.json?limit=12")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.products); // Output the products data to the console
      return data.products;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
}

function createProductCards(products) {
  const productContainer = document.getElementById("wrapper");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card", "flex", "flex-col", "gap-3");

    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("cardPhoto", "relative","border", "border-black");
    const productImage = document.createElement("img");
    productImage.src = product.images[0].src;
    productImage.alt = "";
    cardPhoto.appendChild(productImage);
    const conditionBadge = document.createElement("div");
    conditionBadge.classList.add(
      "absolute",
      "text-white",
      "bg-black",
      "top-3",
      "left-3",
      "px-2",
      "py-2",
      "rounded"
    );
    conditionBadge.textContent = product.condition;
    cardPhoto.appendChild(conditionBadge);
    card.appendChild(cardPhoto);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo", "flex", "justify-between", "text-sm");
    const productName = document.createElement("div");
    productName.classList.add("productName", "flex", "flex-col", "font-bold");
    const productNameSpan = document.createElement("span");
    productNameSpan.textContent = product.title;
    productName.appendChild(productNameSpan);
    const priceSpan = document.createElement("span");
    priceSpan.textContent = product.variants[0].price;;
    productName.appendChild(priceSpan);
    cardInfo.appendChild(productName);
    const conditionInfo = document.createElement("div");
    conditionInfo.classList.add("condition", "flex", "flex-col", "items-end");
    const conditionTitle = document.createElement("span");
    conditionTitle.classList.add("font-medium");
    conditionTitle.textContent = "Condition";
    conditionInfo.appendChild(conditionTitle);
    const conditionDescription = document.createElement("span");
    conditionDescription.classList.add("font-normal");
    conditionDescription.textContent = product.conditionDescription;
    conditionInfo.appendChild(conditionDescription);
    cardInfo.appendChild(conditionInfo);
    card.appendChild(cardInfo);

    const pickupBtn = document.createElement("div");
    pickupBtn.classList.add(
      "btn",
      "bg-black",
      "font-bold",
      "text-center",
      "text-white",
      "py-4",
      "rounded",
      "cursor-pointer"
    );
    pickupBtn.textContent = "PICK-UP IN 2200";
    card.appendChild(pickupBtn);

    productContainer.appendChild(card);
  });
}

fetchProducts().then((products) => {
  createProductCards(products);
});
