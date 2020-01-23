
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
  const arranjoCarrinho = localStorage.getItem('listaCompras').split(' | ');
  const posicaoASerRemovida = ([...event.target.parentNode.children].indexOf(event.target));
  arranjoCarrinho.splice(posicaoASerRemovida, 1);
  if (document.getElementsByClassName('cart__item').length > 1) {
    localStorage.setItem('listaCompras', arranjoCarrinho.reduce((acc, item) => `${acc} | ${item}`));
  } else localStorage.removeItem('listaCompras');
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

//começa o código aqui

function saveName() {
  const nome = document.querySelector('.input-name');
  nome.addEventListener('change', () => {
    sessionStorage.setItem('Nome', nome.value);
  });
}

function checkbox() {
  const check = document.querySelector('.input-terms');
  check.addEventListener('click', () => {
  const save = check.checked ?  document.cookie = 'terms=accepted' : document.cookie = 'terms=denied';
    }
  )};

const QUERY = "carro"
const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`

function adicionarElemento(classe, filho) {
  document.querySelector(classe).appendChild(filho);
}

const listarProduto = (URL) => {
  fetch(URL)
    .then(response => response.json())
    .then((json) => {
       json.results.forEach((resultados) => {
        adicionarElemento('.items', createProductItemElement({ sku: resultados.id, name: resultados.title, image: resultados.thumbnail }));
      });
    })
    .then(() => {
      const addCartButton = document.querySelectorAll('.item__add');
      addCartButton.forEach((product) => {
        product.addEventListener('click', findSku);
      });
    });
};

function findSku() {
  const sku = getSkuFromProductItem(this.parentNode);
  console.log(sku)
  const URL = `https://api.mercadolibre.com/items/${sku}`;
  addToCart(URL);
}

const addToCart = (URL) => {
  fetch(URL)
    .then(response => response.json())
    .then(({ id, title, price }) => {
      adicionarElemento('.cart__items', createCartItemElement({ sku: id, name: title, salePrice: price }));
      const shoppingCart = (localStorage.getItem('shoppingCart'));
      if (!shoppingCart) { localStorage.setItem('shoppingCart', `${id}, ${title}, ${price}`);
     } else {
        localStorage.setItem('listaCompras', `${shoppingCart} \ ${id}, ${title}, ${price}`);
      }
    })
};

function loadCart() {
  const arranjoCarrinho = localStorage.getItem('listaCompras').split(' | ');
  arranjoCarrinho.forEach((element) => {
    const [id, title, preco] = element.split(', ');
    adicionarElemento('.cart__items', createCartItemElement({ sku: id, name: title, salePrice: preco }));
  });
}

window.onload = function onload() {
  listarProduto(URL)
  checkbox()
  saveName()
};
