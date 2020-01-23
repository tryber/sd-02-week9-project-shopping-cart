window.onload = function onload() { };

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function sessionName() {
  const name = document.getElementsByClassName('input-name')[0];
  name.addEventListener('blur', () => sessionStorage.setItem('userName', name.value));
}

function toggleCookie() {
  const termsAgreement = document.getElementsByClassName('input-terms')[0];
  const days = 7;
  termsAgreement.addEventListener('change', () => {
    const expiryDate = new Date(Date.now() + (days * 864e5)).toUTCString();
    document.cookie = `agreed-to-terms = ${encodeURIComponent(termsAgreement.checked)}; expires = ${expiryDate}; path=/`;
  });
}

const clearPreviousSearch = () => {
  const items = document.querySelector('.items');
  while (items.firstChild) {
    items.firstChild.remove();
  }
};

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
  document.querySelector('.items').appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const searchInput = document.getElementsByClassName('input-search')[0];
searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    clearPreviousSearch();
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchInput.value}`)
      .then(response => response.json().then((responseObj) => {
        responseObj.results.forEach(element =>
          createProductItemElement({
            sku: element.id,
            name: element.title,
            image: element.thumbnail,
          }));
      }))
      .then(() => {
        const id = document.querySelector('.items');
        const addCart = document.querySelectorAll('.item__add');
        addCart.forEach(element => element.addEventListener('click', () => {
          fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(id)}`)
            .then(response => response.json().then((object) => {
              document.getElementsByClassName('cart__items')[0].appendChild(createCartItemElement({
                sku: object.id,
                name: object.title,
                salePrice: object.price,
              }));
            }));
        }));
      })
      .catch(error => console.log(error));
  }
});

// function cartItemClickListener(event) {
  // coloque seu código aqui
// }

window.onload = function loadFunction() {
  sessionName();
  toggleCookie();
};
