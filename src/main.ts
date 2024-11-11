import "./style.css";

const textInput = document.querySelector("#textInput") as HTMLInputElement;
const btnSearch = document.querySelector("#btnSearch") as HTMLButtonElement;
const selectInput = document.querySelector("#selectInput") as HTMLSelectElement;
const btnFilterByElec = document.querySelector(
  "#btnFilterByElec"
) as HTMLButtonElement;
const btnFilterByJewel = document.querySelector(
  "#btnFilterByJewel"
) as HTMLButtonElement;
const btnFilterByMens = document.querySelector(
  "#btnFilterByMens"
) as HTMLButtonElement;
const btnFilterByWomens = document.querySelector(
  "#btnFilterByWomens"
) as HTMLButtonElement;
const cardsWrapper = document.querySelector("#cardsWrapper") as HTMLDivElement;

type TProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function renderList(product: TProduct) {
  const productCard = document.createElement("div");
  const imgOfCard = document.createElement("img");
  const titleOfCard = document.createElement("p");
  const priceDivOfCard = document.createElement("div");
  const priceOfCard = document.createElement("p");
  const buttonOfCard = document.createElement("button");
  // *=============================================
  imgOfCard.setAttribute("src", product.image);
  titleOfCard.textContent = product.title;
  priceOfCard.textContent = `$ ${product.price}`;
  buttonOfCard.textContent = "Add to cart";
  // *=============================================
  productCard.classList.add("productCard", "flex");
  priceDivOfCard.classList.add("priceDivOfCard", "flex");
  titleOfCard.classList.add("titleOfCard");
  // *=============================================
  productCard.append(imgOfCard, titleOfCard, priceDivOfCard);
  priceDivOfCard.append(priceOfCard, buttonOfCard);
  cardsWrapper.appendChild(productCard);
}

function fetchProducts(URL: string) {
  cardsWrapper.innerHTML = "";
  fetch(URL)
    .then((response: Response) => {
      if (!response.ok) {
        console.error("Response doesnt work");
      }

      return response.json();
    })
    .then((products: TProduct[]) => {
      products.forEach((product: TProduct) => {
        renderList(product);
      });
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

fetchProducts("https://fakestoreapi.com/products");
sortProducts("https://fakestoreapi.com/products");

btnFilterByElec?.addEventListener("click", () => {
  fetchProducts("https://fakestoreapi.com/products/category/electronics");
});
btnFilterByJewel?.addEventListener("click", () => {
  fetchProducts("https://fakestoreapi.com/products/category/jewelery");
});
btnFilterByMens?.addEventListener("click", () => {
  fetchProducts("https://fakestoreapi.com/products/category/men's clothing");
});
btnFilterByWomens?.addEventListener("click", () => {
  fetchProducts("https://fakestoreapi.com/products/category/women's clothing");
});

function sortProducts(URL: string) {
  selectInput?.addEventListener("change", () => {
    switch (selectInput.value) {
      case "asc":
        const ascURL = `${URL}?sort=asc`;
        fetchProducts(ascURL);
        break;
      case "desc":
        const descURL = `${URL}?sort=desc`;
        fetchProducts(descURL);
    }
  });
}

btnSearch?.addEventListener("click", () => {
  const inputValue = textInput.value.trim().toLowerCase();
  console.log(inputValue);

  cardsWrapper.innerHTML = "";

  fetch("https://fakestoreapi.com/products")
    .then((response: Response) => {
      if (!response.ok) {
        console.error("Response doesnt work");
      }

      return response.json();
    })
    .then((products: TProduct[]) => {
      const filteredProducts = products.filter((product: TProduct) =>
        product.title.toLowerCase().includes(inputValue)
      );
      return filteredProducts;
    })
    .then((products: TProduct[]) => {
      products.forEach((product: TProduct) => {
        renderList(product);
      });
    })
    .catch((error: Error) => {
      console.error(error);
    });
});
