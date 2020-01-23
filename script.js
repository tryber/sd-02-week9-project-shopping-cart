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
  event.target.remove();

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function saveName() {
  const name = document.getElementsByClassName('input-name')[0];
  name.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      sessionStorage.setItem('name', name.value);
    }
  });
  name.value = sessionStorage.getItem('name');
}

function querySelectorItem (classItem, child) {
  document.querySelector(classItem).appendChild(child)
}

function createLoad() {
  const itemsProduct = document.querySelector('.items')
  const titleLoad = document.createElement('h1');
  titleLoad.setAttribute('id', 'load');
  titleLoad.innerText = 'Carregando...'
  itemsProduct.appendChild(titleLoad);
  setTimeout(() => {
    itemsProduct.removeChild(itemsProduct.childNodes[1]);
  }, 998)
}

let sum = 0;
setTimeout(() => {
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=casa')
  .then((response) => {
    response.json().then((res) => {
      res.results.forEach((item) => {
        querySelectorItem('.items',createProductItemElement({ sku: item.id, name: item.title, image: item.thumbnail }))    
        });
      }).then(() => {
        const total = document.getElementById('total');
        const createItemAdd = document.querySelectorAll('.item__add');
        createItemAdd.forEach((element) => {
          element.addEventListener('click', (event) => {
            fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(event.target.parentNode)}`)
              .then((response) => {
                response.json().then((res) => {
                  querySelectorItem('.cart__items', createCartItemElement({sku: res.id, name: res.title, salePrice: res.price}));
                  sum = sum + res.price;
                  total.innerText = `Total: ${sum}`
                  })
                })
              })  
            });
            
          });
      });
}, 1000)


function createCookie () {
  const checkTerm = document.querySelector('.input-terms');
  checkTerm.addEventListener('click', () => {
    if (checkTerm.checked) {
      document.cookie = 'Term=checked; expires=expires= Thu, 21 Aug 2100 20:00:00 UTC';
    } else {
      document.cookie = 'Term= ; expires=expires= Thu, 21 Aug 2100 20:00:00 UTC';
    }
  });
}

function removeCart () {
  const cart = document.querySelector('.cart__items');
  const buttonRemoveAll = document.getElementById('remove-all');
  buttonRemoveAll.addEventListener('click', () => {
    cart.innerText = '';
    total.innerText = 'Total: '
  })
}

window.onload = function onload() {
  saveName();
  createCookie ();
  removeCart ();
  createLoad();
};
