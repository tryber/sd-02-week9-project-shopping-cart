window.onload = function onload() {};


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

function createProductItemElement({
  sku,
  name,
  image
}) {
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

function createCartItemElement({
  sku,
  name,
  salePrice
}) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// 1. Salve o nome da pessoa no SessionStorage
const name = document.getElementsByClassName('input-name')[0];
name.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sessionStorage.setItem('Nome', `${name.value}`);
  }
});

// 2. Salve se a pessoa concorda com os termos da sua página nos Cookies
const checkbox = document.querySelector('.input-terms');
checkbox.addEventListener('click', () => {
  document.cookie = `Nome=${name.value};expires=Thu, 21 Aug 2050 20:00:00 UTC`
});

const search = document.getElementsByClassName('input-search')[0];
const newNode = document.getElementsByClassName('items')[0];
const cartItems = document.getElementsByClassName('cart__items')[0];

function addToCart() {
  const button = document.getElementsByClassName('item__add')[0];
  button.addEventListener('click', (event) => {
    const result = getSkuFromProductItem(event.target.parentElement);
    fetch(`https://api.mercadolibre.com/items/${result}`)
      .then(response => response.json())
      .then(info => {
        const produto = {
          sku: info.id,
          name: info.name,
          image: info.salePrice
        }
        cartItems.appendChild(createCartItemElement(produto));
      })
  })
}

search.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${event.target.value}`)
      /**
       * fetch: opa then, tudo bem?
       * trouxe a resposta vinda da API.
       * poderia me dizer em qual formato 
       * voce deseja que eu trate ela?
       */
      /**
       * then: obrigado, fetch! se espera que esta
       * resposta seja um json
       */
      .then(response => response.json())
      /**
       * response: olha, parece que de fato a resposta era
       * um json! tome aqui seu objeto JS correspondente a
       * este json, que no caso vamos chamar de data
       */
      .then(data => {
        const produto = {
          sku: data.results.id,
          name: data.results.name,
          image: data.results.thumbnail
        }
        const product = createProductItemElement(produto)
        newNode.appendChild(product)
        addToCart()
      })
  }
})

const pessoa = {
  nome: 'Leonardo',
  cidade: 'Belo Horizonte',
  idade: 21
}
