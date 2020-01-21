window.onload = function onload() { };

const descreveProduto = document.querySelector('.items');

const inputName = document.getElementsByClassName('input-name')[0];

const caixaCookies = document.querySelector('.input-terms');

const buscaProduto = document.getElementsByClassName('input-item')[0];

const cartItems = document.querySelector('.cart__items');

caixaCookies.addEventListener('click', () => document.cookie = 'agree = yes; expires = Thu, 18 Dec 2021 12:00:00 UTC');

inputName.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sessionStorage.setItem('fullname', `${inputName.value}`);
    inputName.value = null;
  }
});

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

buscaProduto.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const secaoItens = document.querySelector('.items');
    while (secaoItens.firstChild) {secaoItens.removeChild(secaoItens.firstChild)};
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${buscaProduto.value}`)
    .then(response => response.json())
    .then(produtoAchado => {
      produtoAchado.results.forEach(element => {
      const produto = {sku: element.id, name: element.title, image: element.thumbnail};
      descreveProduto.appendChild(createProductItemElement(produto));
      adicionaListener()
    });
  })
  buscaProduto.value = null;
  }
});

function adicionaListener() {
  const botaoAdiciona = document.querySelectorAll('.item__add');
  botaoAdiciona.forEach(botao => botao.addEventListener('click', adicionaCarrinho))
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const produtosnaCesta = document.querySelectorAll('li');
  produtosnaCesta.forEach(clicado => clicado.addEventListener('click', event.target.remove));
}

function adicionaCarrinho(event) {
  const caixaProduto = event.target.parentElement;
  fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(caixaProduto)}`)
  .then(response => response.json())
  .then(clicado => {
    const produtoclicado = {sku: clicado.id, name: clicado.title, salePrice: clicado.price};
    cartItems.appendChild(createCartItemElement(produtoclicado));
    salvaLocalStorage(produtoclicado)
  });
}

// function salvaLocalStorage(item) {
//   sessionStorage.setItem('SKU', )
//   console.log(item.salePrice)
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
