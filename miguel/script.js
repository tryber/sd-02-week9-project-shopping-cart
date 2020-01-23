window.onload = function onload() {
  const elementoPai = document.querySelector('.cart__items')
  elementoPai.innerHTML = localStorage.getItem('lista')

  const filhos = document.querySelectorAll('li')
  filhos.forEach(element => element.addEventListener('click', cartItemClickListener))

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
};

fetch ("https://api.mercadolibre.com/sites/MLB/search?q=computador")
.then(res => res.json())
.then(data => {
  data.results.forEach(item => {
    const objeto = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail
    }
    const items = document.querySelector('.items')
    items.appendChild(createProductItemElement(objeto))
  })

  const botoes = document.querySelectorAll('.item__add')
  botoes.forEach(element => element.addEventListener('click', function () {
    fetch(`https://api.mercadolibre.com/items/${getSkuFromProductItem(event.target.parentElement)}`)
    .then(res => res.json())
    .then(data => {
      const objeto = {
        sku: data.id,
        name: data.title,
        salePrice: data.price
      }
      const elementoPai = document.querySelector('.cart__items')
      elementoPai.appendChild(createCartItemElement(objeto))

      localStorage.setItem('lista', elementoPai.innerHTML)
    })
  }))
})

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
  const elementoPai = event.target.parentElement
  elementoPai.removeChild(event.target)

  localStorage.setItem('lista', elementoPai.innerHTML)
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
