const catalogo = document.querySelector('.items');
const headers = {
  Accept: 'application/json',
};

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
const urlId = 'https://api.mercadolibre.com/items/';

const ol = document.querySelector('.cart__items');
const total = document.querySelector('.total');
const carregando = document.querySelector('.carregando');


const delay = milliseconds => data =>
  new Promise(resolve =>
    setTimeout(() => resolve(data), milliseconds));

function carregaTotal() {
  const storages = allStorage();
  const prices = storages.reduce((acc, value) => {
    let s = localStorage.getItem(value);
    acc += Number.parseFloat(s.slice(s.indexOf("PRICE")+8, s.length));
    return acc;
  }, 0);
  total.innerHTML = prices;
}

function buscaSkuLi(sku) {
  const lis = document.querySelectorAll('ol > li');
  const array = [];
  lis.forEach(item => array.push(item))
  return array.some(li => li.outerText.slice(5, 18) === sku);
}

function allStorage() {
  let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }
  return keys;
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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  localStorage.removeItem(event.target.outerText.slice(5, 18));
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function clearShopCar() {
  ol.innerHTML = '';
  localStorage.clear();
  carregaTotal();
}

function createButtons(buttons) {
  buttons.forEach(async (button) => {
    button.addEventListener('click', async () => {
      const section = button.parentNode;
      const sku = getSkuFromProductItem(section);
      let name;
      let salePrice;

      if (!buscaSkuLi(sku)) {
        await fetch(`${urlId}${sku}`, headers)
          .then(res => res.json())
          .then(data => { name = data.title;
            salePrice = data.price });

        const obj =  { sku, name, salePrice };
        const li = createCartItemElement(obj);

        li.addEventListener('click', cartItemClickListener);

        localStorage.setItem(li.innerText.slice(5, 18), li.innerText );

        ol.appendChild(li);

        carregaTotal();
      }
    });
  });
}

const storages = allStorage();

carregaTotal();

storages.forEach((item) => {
  const li = document.createElement('li');
  li.innerText = localStorage.getItem(item);
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
});

window.onload = async function onload() {
  let items = [];

  await fetch(url, headers)
  .then(res => res.json())
  .then(delay(3000))
  .then((data) => {
    items = [...data.results];
    carregando.style.display = 'none';
  });

  items.forEach((item) => {
    const { id: sku, title: name, thumbnail: image } = item;
    const element = { sku, name, image };
    const section = createProductItemElement(element);
    catalogo.appendChild(section);
  });

  const buttons = document.querySelectorAll('.item__add');
  createButtons(buttons);
};

const name = document.querySelector('.input-name');
const agree = document.querySelector('input[type=checkbox]');

name.addEventListener('keyup', () => {
  if (name.value.length > 0) {
    sessionStorage.setItem('name', name.value);
    agree.disabled = false;
  } else {
    sessionStorage.removeItem('name');
    agree.disabled = true;
  }
});

agree.addEventListener('click', () => {
  if (agree.checked) {
    document.cookie = `cookie = aceito`;
  } else {
    document.cookie = 'cookie = ';
  }
});
