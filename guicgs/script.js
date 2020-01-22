window.onload = function onload() { };

// Função que salva o nome passado no input na session storage
const nameInput = document.getElementsByClassName('input-name')[0];
nameInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sessionStorage.setItem('Name', nameInput.value);
  }
});

// Função que cria um cookie caso o usuário marque a checkbox dos termos
const termsInput = document.querySelector('.input-terms');
termsInput.addEventListener('click', () => {
  if (termsInput.checked) {
    document.cookie = 'terms=checked; expires=expires= Thu, 21 Aug 2050 20:00:00 UTC';
  } else if (!termsInput.checked) {
    document.cookie = 'terms= ; expires=expires= Thu, 21 Aug 2050 20:00:00 UTC';
  }
});

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

const clearPreviousSearch = () => {
  const items = document.querySelector('.items');
  while (items.firstChild) {
    items.firstChild.remove();
  }
};

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
  const cartItem = document.getElementsByClassName('cart_item');
  cartItem.forEach(element => {
    element.addEventListener('click', () => {

    })
  })
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
          document.querySelector('.items').appendChild(createProductItemElement({
            sku: element.id,
            name: element.title,
            image: element.thumbnail,
          })));
      }))
      .then(() => {
        const addCart = document.querySelectorAll('.item');
        addCart.forEach(element => {
          element.addEventListener('click', () => {
            fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(element)}`)
              .then(response => response.json().then(item => {
                document.querySelector('.cart__items').appendChild(createCartItemElement({
                  sku: item.id,
                  name: item.title,
                  salePrice: item.price,
                }))
              }))
          })
        })
      })
      .catch(error => console.log(error));
  }
});



