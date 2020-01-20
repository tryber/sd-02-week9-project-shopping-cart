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
  localStorage.removeItem(`${event.target.classList[1]}`)
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

const check = document.querySelector('.input-terms');
check.addEventListener('click', () => {
  document.cookie = `Checkbox = ${check.checked}`;
});
const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=retrovisor';
let API_URL2 = 'https://api.mercadolibre.com/items/';
const header = {
  headers: ({
    Accept: 'application/json',
  }),
};

function salvaCart(object, local) {
  localStorage.setItem(`${object.sku}*${localStorage.length + 1}`, `${object.sku}*${object.name}*${object.salePrice}`);
  local.classList.add(`${object.sku}*${localStorage.length}`);
}

function addcart() {
  const botaozinho = document.querySelector('.item__add');
  botaozinho.addEventListener('click', () => {
    fetch(API_URL2, header)
      .then((response) => {
        response.json()
          .then((respon) => {
            const object = {
              sku: respon.id,
              name: respon.title,
              salePrice: respon.price,
            };
            const cria = createCartItemElement(object)
            cart.appendChild(cria);
            salvaCart(object, cria);
            createCartItemElement(object).addEventListener('click', () => cartItemClickListener)
          })
          .catch(() => alert('Não foi possivel adicionar o produto'));
      });
  });
}

fetch(API_URL, header)
  .then((response) => {
    response.json()
      .then((respon) => {
        const add = document.querySelector('.items');
        const objeto = {
          sku: respon.results[0].id,
          name: respon.results[0].title,
          image: respon.results[0].thumbnail,
        };
        API_URL2 = `${API_URL2}${objeto.sku}`;
        const criando = createProductItemElement(objeto);
        add.appendChild(criando);
        addcart();
      });
  })
  .catch(() => alert('Não foi possivel encontrar o produto'));

let object = {
  sku: '',
  name: '',
  salePrice: 0,
};
for (let i = 0; i < localStorage.length; i += 1) {
  let a = localStorage.getItem(localStorage.key(i));
  a = a.split('*');
  object.sku = a[0];
  object.name = a[1];
  object.salePrice = a[2];
  const cria = createCartItemElement(object)
  cart.appendChild(cria);
  console.log(`${localStorage.key(i)}`)
  cria.classList.add(`${localStorage.key(i)}`);
  cria.addEventListener('click', () => cartItemClickListener)
}

