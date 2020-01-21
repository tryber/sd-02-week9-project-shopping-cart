const fetchParam = {
  headers: ({
    Accept: 'application/json',
  }),
};

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
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function segundaRequisicao(response) {
  const object = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
  }
  const cart = document.querySelector('.cart__items');
  cart.appendChild(createCartItemElement(object));
}

function adicionaCarrinho() {
  fetchArray(`https://api.mercadolibre.com/items/${getSkuFromProductItem(this.parentElement)}`, segundaRequisicao);
}

function deuCerto(response) {
  response.results.forEach((element) => {
    const localItem = document.querySelector('.items');
    const objetoCriado = createProductItemElement({
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    });
    localItem.appendChild(objetoCriado);
  });
  const adiciona = document.querySelectorAll('.item__add');
  adiciona.forEach(element => element.addEventListener('click', adicionaCarrinho));
}

function fetchArray(url, func) {
  fetch(url, fetchParam)
    .then((response) => {
      response.json()
        .then((res) => {
          func(res);
        })
        .catch(() => alert('Não foi possivel achar o resultado'))
    })
    .catch(() => alert('Não foi possivel achar o resultado'));
}

function cookieSession() {
  const NOME = document.querySelector('.input-name');
  NOME.addEventListener('change', () => {
    sessionStorage.setItem('Nome', NOME.value);
  });

  const check = document.querySelector('.input-terms');
  check.addEventListener('click', () => {
    document.cookie = `Checkbox = ${check.checked}`;
  });
}
function limpaPesquisa() {
  const selectLi = document.querySelectorAll('.item');
  const localItem = document.querySelector('.items');
  selectLi.forEach((element) => {
    localItem.removeChild(element);
  })
}

function exibeItens() {
  const pesquisa = document.querySelector('.input-pesquisa');
  pesquisa.addEventListener('change', () => {
    limpaPesquisa();
    fetchArray(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa.value}`,
      deuCerto);
  });
}

window.onload = function onload() {
  cookieSession();
  exibeItens();
};


// let API_URL2 = 'https://api.mercadolibre.com/items/';
