const USER_API = "https://dummyjson.com";
const card = document.querySelector(".popular__card");

async function getProducts(api) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get("id");
  let response = await fetch(`${api}/products/1`);
  response
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.error(err));
}

getProducts(USER_API);

function createCard(data) {
  console.log(data);
  card.innerHTML = `
    <a href="details.html?id=${data.id}" class="card__link">
      <div class="card__img">
        <span>${data.rating} <i class="fa-solid fa-star"></i></span>
        <img width="300px" src=${data.images[0]} alt="${data.title}" />
      </div>
      <div class="card__desc">
        <div class="card__title">
          <h3>${data.title}</h3>
          <span>${data.price} K</span> <!-- Изменено значение на ${data.price} для демонстрации -->
        </div>
        <div class="card__buttons">
          <p>${data.description}</p>
          <img src="./img/Frame 5.svg" alt="Button Image" />
        </div>
      </div>
    </a>
    `;
}
