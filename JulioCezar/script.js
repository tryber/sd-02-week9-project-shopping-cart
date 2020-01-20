const mostrar = (event) => {
  const value = event.target.checked;
  criarCookie('termos', value, ' Tue, 01 Jan 2115 12:00:00 UTC ');
};

const criarCookie = (name, value, expire) => {
  const dtExpira = `expires=${expire}`;
  document.cookie = `${name}=${value}; ${dtExpira}`;
};

const salvarCookie = (target, value) => {
  const element = target;
  if (document.cookie !== '') {
    if (value === 'true') {
      element.checked = true;
    }
  }
};

const salvarName = (event) => {
  const key = event.keyCode;
  const name = event.target;
  if (key === 13) {
    sessionStorage.setItem('Name', name.value);
    name.value = '';    
  }
}

window.onload = function onload() {
  const termos = document.querySelector('.input-terms');
  termos.addEventListener('change', mostrar);
  const name = document.querySelector('.input-name');
  name.addEventListener('keyup', salvarName)
  salvarCookie(termos, document.cookie.split('=')[1]);
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
