const descreveProduto = document.querySelector('.items');

const inputName = document.getElementsByClassName('input-name')[0];

const caixaCookies = document.querySelector('.input-terms');

const buscaProduto = document.getElementsByClassName('input-item')[0];

const cartItems = document.querySelector('.cart__items');

const botaoLimpa = document.querySelector('.empty-cart');

botaoLimpa.addEventListener('click', () => {
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
  window.localStorage.clear();
});

function armazenaStorage(produtoV, nomeV, precoV) {
  localStorage.setItem(`${produtoV}`, JSON.stringify({ id: produtoV, title: nomeV, price: precoV }));
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

caixaCookies.addEventListener('click', () => {
  document.cookie = 'agree = yes; expires = Thu, 18 Dec 2021 12:00:00 UTC';
});

inputName.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sessionStorage.setItem('fullname', `${inputName.value}`);
    inputName.value = null;
  }
});

function cartItemClickListener(event) {
  event.target.remove();
  window.localStorage.removeItem(event.target.innerText.split(' ')[1]);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

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

function adicionaCarrinho(event) {
  const caixaProduto = event.target.parentElement;
  fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(caixaProduto)}`)
    .then(response => response.json())
    .then((clicado) => {
      const produtoclicado = { sku: clicado.id, name: clicado.title, salePrice: clicado.price };
      cartItems.appendChild(createCartItemElement(produtoclicado));
      armazenaStorage(clicado.id, clicado.title, clicado.price);
    });
}

function adicionaListener() {
  const botaoAdiciona = document.querySelectorAll('.item__add');
  botaoAdiciona.forEach(botao => botao.addEventListener('click', adicionaCarrinho));
}

buscaProduto.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const secaoItens = document.querySelector('.items');
    while (secaoItens.firstChild) {
      secaoItens.removeChild(secaoItens.firstChild);
    }
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${buscaProduto.value}`)
      .then((response) => {
        response.json()
          .then((produtoAchado) => {
            produtoAchado.results.forEach((element) => {
              const produto = {
                sku: element.id,
                name: element.title,
                image: element.thumbnail,
              };
              adicionaListener();
              descreveProduto.appendChild(createProductItemElement(produto));
            });
          })
          .catch(() => alert('erro do servidor'));
      })
      .catch(() => alert('produto não encontrado'));
    buscaProduto.value = null;
  }
});

function carregaStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const produto = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const objeto = { sku: produto.id, name: produto.title, salePrice: produto.price };
      cartItems.appendChild(createCartItemElement(objeto));
    }
  }
}

window.onload = function onload() {
  carregaStorage();
}
