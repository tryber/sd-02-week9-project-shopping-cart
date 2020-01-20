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

const NOME = document.querySelector('.input-name');
NOME.addEventListener('change', ()=>{
  sessionStorage.setItem('Nome', NOME.value);
})

const check = document.querySelector('.input-terms');
check.addEventListener('click', ()=> {
  document.cookie= `Checkbox = ${check.checked}`;
})

const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=retrovisor';

const teste = fetch(API_URL, {
    headers: ({
        method : 'GET',
        Accept : 'application/json',
})})
.then(response => {
    response.json()
    .then(response => {
      const add = document.querySelector('.items');
      const objeto ={
        sku : response.results[0].id,
        name : response.results[0].title,
        image: response.results[0].thumbnail,
      }
      add.appendChild(createProductItemElement(objeto))
    })
    .catch(() => console.error('Não foi possivel encontrar o produto'))
})
.catch(()=> console.error('Não foi possivel encontrar o produto'))

