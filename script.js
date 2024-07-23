const USER_API = "https://dummyjson.com";
const wrappers = document.querySelector(".special__wrapper");
const collection = document.querySelector(".collection");
const skeleton = document.querySelector(".skeleton");
const btn = document.querySelector(".btn");

let offSet = 1;
let count = 6;

async function getProducts(api, limit, category) {
  let response = await fetch(`${api}/products${category}?limit=${limit}`);
  response
    .json()
    .then((res) => createCard(res.products))
    .catch((err) => err);
}

getProducts(USER_API, count, "");

btn.addEventListener("click", () => {
  offSet++;
  getProducts(USER_API, offSet * count, "");
});
function createCard(products) {
  while (wrappers.firstChild) {
    wrappers.firstChild.remove();
  }
  products.forEach((e) => {
    let card = document.createElement("div");
    card.classList.add("wrapper");
    card.innerHTML = ` 
    <div class="popular__card">
    <div class="card__img ">
      <span>4.8 <i class="fa-solid fa-star"></i></span>
      <img src=${e.images[0]} alt="">
    </div>
    <div class="card__desc">
      <div class="card__title">
        <h3>${e.title}</h3>
        <span>21 K</span>
      </div>
      <div class="card__buttons">
        <p>${e.brand}</p>
        <img src="./img/Frame 5.svg" alt="" />
      </div>
    </div>
  </div>`;
    wrappers.appendChild(card);
  });
}

async function getCategories(api) {
  let response = await fetch(`${api}/products/category-list?limit=10`);
  response
    .json()
    .then((res) => createCategories(res))
    .catch((err) => console.error(err));
}
getCategories(USER_API);

function createCategories(categories) {
  categories.forEach((e) => {
    let addCategory = document.createElement("li");
    addCategory.classList.add("data-button");
    addCategory.innerHTML = `
          <data value="/category/${e}">${e}</data>
        `;
    collection.appendChild(addCategory);
    console.log(e);
  });
}

collection.addEventListener("click", (e) => {
  if (e.target.tagName === "DATA") {
    let val = e.target.value;
    getProducts(USER_API, count, val);
  }
});
