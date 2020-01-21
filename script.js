window.onload = function onload() {
  const inputName = document.querySelector('.input-name');
  if (this.localStorage.getItem('nome')) inputName.value = this.localStorage.getItem('nome');
  inputName.addEventListener('change', () => localStorage.setItem('nome', inputName.value));

  const seletorAceitaCookies = this.document.getElementsByClassName('input-terms')[0];
  if (localStorage.getItem('aceitaCookies') === 'true') seletorAceitaCookies.checked = this.localStorage.getItem('aceitaCookies');
  seletorAceitaCookies.addEventListener('click', () => this.localStorage.setItem('aceitaCookies', seletorAceitaCookies.checked));
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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const pesquisa = 'computador';
const headers = {
  headers: { Accept: 'application/json' },
};

function appendarChild(classe, filho) {
  document.getElementsByClassName(classe)[0].appendChild(filho);
}

const fetchSku = (URL, header) => {
  fetch(URL, header)
    .then(resposta => resposta.json())
    .then(({ id, title, price }) => {
      appendarChild('cart__items', createCartItemElement({ sku: id, name: title, salePrice: price }));
    });
};

function adicionarAoCarrinho() {
  const nomeSku = getSkuFromProductItem(this.parentElement);
  const URL = `https://api.mercadolibre.com/items/${nomeSku}`;
  fetchSku(URL, headers);
}

const fetchPesquisa = (URL, header) => {
  fetch(URL, header)
    .then(resp => resp.json())
    .then((json) => {
      this.console.log(json.results);
      json.results.forEach(({ id, title, thumbnail }) => {
        appendarChild('items', createProductItemElement({ sku: id, name: title, image: thumbnail }));
      });
    })
    .then(() => {
      const seletorBotaoCarrinho = document.querySelectorAll('.item__add');
      console.log(seletorBotaoCarrinho[0]);
      seletorBotaoCarrinho.forEach((elem) => {
        elem.addEventListener('click', adicionarAoCarrinho);
      });
    });
};
fetchPesquisa(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`, headers);
