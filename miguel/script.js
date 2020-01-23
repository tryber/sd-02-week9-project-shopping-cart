let valor = 0;

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
  const elementoPai = event.target.parentElement;
  valor = (Number(valor) - Number(event.target.innerText.split('$')[1])).toFixed(1);
  const total = document.querySelector('h3');
  total.innerText = `Total: $${valor}`;
  elementoPai.removeChild(event.target);

  localStorage.setItem('lista', elementoPai.innerHTML);
  localStorage.setItem('valor', valor);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = function onload() {
  const total = document.querySelector('h3');
  valor = Number(localStorage.getItem('valor'));
  total.innerText = `Total: $${valor}`;

  const elementoPai = document.querySelector('.cart__items');
  elementoPai.innerHTML = localStorage.getItem('lista');
  const filhos = document.querySelectorAll('li');
  filhos.forEach(element => element.addEventListener('click', cartItemClickListener));

  const input = document.getElementsByClassName('input-name')[0];
  input.value = sessionStorage.getItem('Nome');
  input.addEventListener('keyup', function () {
    sessionStorage.setItem('Nome', this.value);
  });

  const check = document.getElementsByClassName('input-terms')[0];
  check.checked = document.cookie.split('=')[1] === 'true';
  check.addEventListener('click', function () {
    document.cookie = `concorda=${check.checked}`;
  });
};

fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
.then(res => res.json())
.then((data) => {
  data.results.forEach((item) => {
    const objeto = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const items = document.querySelector('.items');
    items.appendChild(createProductItemElement(objeto));
  });

  const botoes = document.querySelectorAll('.item__add');
  botoes.forEach(element => element.addEventListener('click', function () {
    const elementoPai = document.querySelector('.cart__items');
    const loading = document.createElement('li');
    loading.innerText = 'Loading...';
    loading.style.fontSize = '50px';
    elementoPai.appendChild(loading);

    fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(event.target.parentElement)}`)
    .then(res => res.json())
    .then((obj) => {
      const objeto = {
        sku: obj.id,
        name: obj.title,
        salePrice: obj.price,
      };
      elementoPai.removeChild(loading);
      elementoPai.appendChild(createCartItemElement(objeto));
      valor = (Number(valor) + Number(obj.price)).toFixed(1);
      const total = document.querySelector('h3');
      total.innerText = `Total: $${valor}`;

      localStorage.setItem('lista', elementoPai.innerHTML);
      localStorage.setItem('valor', valor);
    });
  }));

  const botaoLimpar = document.querySelector('.limpar');
  botaoLimpar.addEventListener('click', function () {
    const elementoPai = document.querySelector('.cart__items');
    elementoPai.innerHTML = '';
    const total = document.querySelector('h3');
    valor = 0;
    total.innerText = `Total: $${valor}`;

    localStorage.setItem('lista', elementoPai.innerHTML);
    localStorage.setItem('valor', valor);
  });
});
