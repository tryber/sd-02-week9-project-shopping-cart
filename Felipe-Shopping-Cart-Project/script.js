function salvaSession() {
  const input = document.querySelector('.input-name');
  input.addEventListener('change', () => {
    sessionStorage.setItem('Nome', input.value);
  });
  input.value = sessionStorage.getItem('Nome');
}

function adicionaCookie() {
  if (document.querySelector('.input-terms').checked) {
    return (document.cookie = 'User=Usuário; expires=Thu, 18 Dec 2021 12:00:00 UTC');
  }
  return (document.cookie = 'User=; expires=Thu, 18 Dec 1970 12:00:00 UTC');
}

const verificaChecked = () => {
  if (document.cookie.includes('User=Usuário')) {
    return (document.querySelector('.input-terms').checked = true);
  }
  return (document.querySelector('.input-terms').defaultChecked);
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const objItemCart = event.target.innerText.split(' ')[1];
  let objKey = JSON.parse(localStorage.getItem(objItemCart));
  const count = objKey.count;
  if (count > 1) {
    objKey = { id: objKey.id, title: objKey.title, price: objKey.price, count: count - 1 };
    localStorage.setItem(objItemCart, JSON.stringify(objKey));
  } else {
    localStorage.removeItem(objItemCart);
  }
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function criaStorage(itemId, title, price) {
  if (localStorage.getItem(itemId) === null) {
    localStorage
      .setItem(itemId, JSON.stringify(
        { id: itemId, title, price, count: 1 }));
  } else {
    const objKeyInfo = JSON.parse(localStorage.getItem(itemId));
    const lS = { id: itemId, title, price, count: objKeyInfo.count += 1 };
    localStorage.setItem(itemId, JSON.stringify(lS));
  }
}

function botaoAdiciona() {
  const botaozinCapeta = document.querySelectorAll('.item__add');
  botaozinCapeta.forEach((element) => {
    element.addEventListener('click', (event) => {
      const resultado = event.target.parentNode;
      fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(resultado)}`)
      .then((response) => {
        response.json().then((item) => {
          const itemPadrao = {
            sku: item.id,
            name: item.title,
            salePrice: item.price,
          };
          document.querySelector('.cart__items')
          .appendChild(createCartItemElement(itemPadrao));
          criaStorage(item.id, item.title, item.price);
        });
      });
    });
  });
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
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
function carregaTudo() {
  setTimeout(() => {
    fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => {
      response.json().then((res) => {
        res.results.forEach((item) => {
          const produto = {
            sku: item.id,
            name: item.title,
            image: item.thumbnail,
          };
          document.querySelector('.items')
            .appendChild(createProductItemElement(produto));
        });
        botaoAdiciona();
      });
    })
    .catch();
    const escondeLoading = document.querySelector('.load');
    escondeLoading.style.display = 'none';
  }, 6000);
  const loading = document.createElement('section');
  loading.className = 'loading';
  loading.appendChild(createCustomElement('p', 'load', 'loading...'));
  return document.querySelector('.items').appendChild(loading)
}
// fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
// .then((response) => {
//   response.json().then((res) => {
//     res.results.forEach((item) => {
//       const produto = {
//         sku: item.id,
//         name: item.title,
//         image: item.thumbnail,
//       };
//       document.querySelector('.items')
//         .appendChild(createProductItemElement(produto));
//     });
//     botaoAdiciona();
//   });
// })
// .catch();

function carregaCarrinho() {
  const infoKey = Object.keys(localStorage);
  for (i = 0; i < infoKey.length; i += 1) {
    const objKeys = JSON.parse(localStorage.getItem(infoKey[i]));
    for (j = 0; j < objKeys.count; j += 1) {
      document.querySelector('.cart__items')
      .appendChild(createCartItemElement(
        { sku: objKeys.id, name: objKeys.title, salePrice: objKeys.price }));
    }
  }
}

window.onload = function onload() {
  document.querySelector('.input-terms').addEventListener('click', adicionaCookie);
  verificaChecked();
  salvaSession();
  carregaCarrinho();
  carregaTudo();
};
