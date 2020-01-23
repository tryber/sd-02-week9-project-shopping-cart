window.onload = function onload() {};


function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({
  sku,
  name,
  image
}) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  window.localStorage.removeItem(`${event.target.innerText.split(' ')[1]}`);
}

function createCartItemElement({
  sku,
  name,
  salePrice
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const name = document.getElementsByClassName('input-name')[0];
name.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sessionStorage.setItem('Nome', `${name.value}`);
  }
});

const checkbox = document.querySelector('.input-terms');
checkbox.addEventListener('click', () => {
  document.cookie = `Nome=${name.value};expires=Thu, 21 Aug 2050 20:00:00 UTC`;
});

const search = document.getElementsByClassName('input-search')[0];
const newNode = document.getElementsByClassName('items')[0];
const cartItems = document.getElementsByClassName('cart__items')[0];


function addToLocalStorage(product, title, price) {
  localStorage.setItem(`${product}`, [product, title, price]);
}

function addToCart() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach(chosenButton =>
    chosenButton.addEventListener('click', (event) => {
      const result = getSkuFromProductItem(event.target.parentElement);
      fetch(`https://api.mercadolibre.com/items/${result}`)
        .then(response => response.json())
        .then(info => {
          const produto = {
            sku: info.id,
            name: info.title,
            salePrice: info.price
          };
          cartItems.appendChild(createCartItemElement(produto));
          addToLocalStorage(info.id, info.title, info.price);
        });
    }));
}

search.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${event.target.value}`)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(item => {
          const produto = {
            sku: item.id,
            name: item.title,
            image: item.thumbnail
          };
          const produtoElement = createProductItemElement(produto);
          newNode.appendChild(produtoElement);
        });
        addToCart();
      });
  }
});
