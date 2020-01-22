window.onload = function onload() {
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

  // document.cookie = `concorda=${concorda.value}; expires=Fri, 31 Dec 2100 00:00:01 GMT`
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
