import "./style.css";
// *========== DOM Elements ================
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

// *=============================================

type TProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

// *============ Function for Rendering the List===============

function renderList(product: TProduct) {
  const productCard = document.createElement("div");
  const imgOfCard = document.createElement("img");
  const titleOfCard = document.createElement("p");
  const priceDivOfCard = document.createElement("div");
  const priceOfCard = document.createElement("p");
  const buttonOfCard = document.createElement("button");

  imgOfCard.setAttribute("src", product.image);
  titleOfCard.textContent = product.title;
  priceOfCard.textContent = `$ ${product.price}`;
  buttonOfCard.textContent = "Add to cart";
  //  for CSS Selectors
  productCard.classList.add("productCard", "flex");
  priceDivOfCard.classList.add("priceDivOfCard", "flex");
  titleOfCard.classList.add("titleOfCard");

  productCard.append(imgOfCard, titleOfCard, priceDivOfCard);
  priceDivOfCard.append(priceOfCard, buttonOfCard);
  cardsWrapper.appendChild(productCard);
}

// *=============================================

let updatedList: TProduct[];

// *========= function for fetching Products' Data ===================

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
      updatedList = [...products];

      products.forEach((product: TProduct) => {
        renderList(product);
      });

      return updatedList;
    })
    .catch((error: Error) => {
      console.error(error);
    });
}

fetchProducts("https://fakestoreapi.com/products");

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

// *========= button for searching function ===================

btnSearch?.addEventListener("click", () => {
  const inputValue = textInput.value.trim().toLowerCase();

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
      updatedList = [...filteredProducts];
      return updatedList;
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

// *========= functions for sorting by price ===================

const sortHighPrice = (products: TProduct[]): TProduct[] => {
  return products.sort((a: TProduct, b: TProduct) => b.price - a.price);
};

const sortLowPrice = (products: TProduct[]): TProduct[] => {
  return products.sort((a: TProduct, b: TProduct) => a.price - b.price);
};

selectInput?.addEventListener("change", () => {
  cardsWrapper.innerHTML = "";

  switch (selectInput.value) {
    case "highPrice":
      sortHighPrice(updatedList).forEach((product: TProduct) => {
        renderList(product);
      });
      break;

    case "lowPrice":
      sortLowPrice(updatedList).forEach((product: TProduct) => {
        renderList(product);
      });
      break;
  }
});
