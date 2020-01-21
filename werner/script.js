window.onload = function onload() {
  let total = 0;
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

  const cart = document.querySelector('.cart__items');

  function cartItemClickListener(event) {
    cart.removeChild(event.target);
    localStorage.removeItem(`${event.target.classList[1]}`);
    const displayTotal = document.querySelector('.value');
    total -= Math.round(parseFloat(event.target.innerText.split('$')[1]) * 100) / 100;
    console.log(total);
    displayTotal.innerText = `${total}`;
  }

  function createCartItemElement({ sku, name, salePrice }) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
  }

  const NOME = document.querySelector('.input-name');
  NOME.addEventListener('change', () => {
    sessionStorage.setItem('Nome', NOME.value);
  });

