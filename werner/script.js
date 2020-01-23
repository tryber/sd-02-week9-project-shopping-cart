
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

function createProductItemElement({ sku, name, image }) {
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
  const shoppingCart = localStorage.getItem('shoppingCart').split(' ; ');
  const itemPosition = ([...event.target.parentNode.children].indexOf(event.target));
  event.target.remove();
  shoppingCart.splice(itemPosition, 1);
  if (document.querySelectorAll('.cart__item').length >= 1) {
    localStorage.setItem('shoppingCart', shoppingCart.reduce((acc, item) => `${acc} ; ${item}`));
  } else localStorage.removeItem('shoppingCart');
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

//  começa o código aqui

function saveName() {
  const nome = document.querySelector('.input-name');
  nome.addEventListener('change', () => {
    sessionStorage.setItem('Nome', nome.value);
  });
}

function checkbox() {
  const check = document.querySelector('.input-terms');
  check.addEventListener('click', () => {
    if (check.checked) {
      document.cookie = 'terms=accepted';
    } else {
      document.cookie = 'terms=denied';
    }
  })
};

const QUERY = 'carro';
const URL1 = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;

function addElement(parent, child) {
  document.querySelector(parent).appendChild(child);
}

function findSku() {
  const sku = getSkuFromProductItem(this.parentNode);
  const URL2 = `https://api.mercadolibre.com/items/${sku}`;
  addToCart(URL2);
}

const showProducts = (URL1) => {
  fetch(URL1)
    .then(response => response.json())
    .then((json) => {
      json.results.forEach((resultados) => {
        addElement('.items', createProductItemElement({ sku: resultados.id, name: resultados.title, image: resultados.thumbnail }));
      });
    })
    .then(() => {
      const addCartButton = document.querySelectorAll('.item__add');
      addCartButton.forEach((product) => {
        product.addEventListener('click', findSku);
      });
    });
};

const addToCart = (URL2) => {
  fetch(URL2)
    .then(response => response.json())
    .then(({ id, title, price }) => {
      addElement('.cart__items', createCartItemElement({ sku: id, name: title, salePrice: price }));
      const shoppingCart = (localStorage.getItem('shoppingCart'));
      if (!shoppingCart) {
        localStorage.setItem('shoppingCart', `${id}, ${title}, ${price}`);
       } else {
        localStorage.setItem('shoppingCart', `${shoppingCart} ; ${id}, ${title}, ${price}`);
      }
    })
};

function loadCart() {
  const savedCart = localStorage.getItem('shoppingCart').split(' ; ');
  savedCart.forEach((product) => {
    const [id, title, price] = product.split(', ');
    addElement('.cart__items', createCartItemElement({ sku: id, name: title, salePrice: price }));
  });
};

window.onload = function onload() {
  showProducts(URL1);
  checkbox();
  saveName();
  loadCart();
};
