function adicionaCookie() {
  if (document.querySelector('.input-terms').checked = true) {
    return document.cookie = 'User=Usuário; expires=Thu, 18 Dec 2021 12:00:00 UTC';
  } else if (document.querySelector('.input-terms').checked = false) {
    return document.cookie = 'User=; expires=Thu, 18 Dec 1970 12:00:00 UTC';
  }
}

const verificaChecked = () => {
  if (document.cookie.length > 5){
    document.querySelector('.input-terms').checked = true;
  }
  document.querySelector('.input-terms').checked = false;
}



window.onload = function onload() {
document.querySelector('.input-terms').addEventListener('click', adicionaCookie);
verificaChecked();
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
