function somaCustoCarrinho() {
  if (localStorage.getItem('listaCompras')) {
    const arranjoCarrinho = localStorage.getItem('listaCompras').split(' | ');
    const totalStr = arranjoCarrinho.map(itemCarrinho => itemCarrinho.split(', ')[2]);
    return totalStr.reduce((acc, item) => acc + parseFloat(item), 0);
  }
  return 'Total: 0';
}

function atualizarPrecoCarrinho() {
  const pPrecoCarrinho = document.getElementsByTagName('p')[0];
  pPrecoCarrinho.innerHTML = `Total: ${somaCustoCarrinho()}`;
  if (!localStorage.getItem('listaCompras')) pPrecoCarrinho.innerHTML = 'Total = 0';
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
  const arranjoCarrinho = localStorage.getItem('listaCompras').split(' | ');
  const posicaoASerRemovida = ([...event.target.parentNode.children].indexOf(event.target));
  arranjoCarrinho.splice(posicaoASerRemovida, 1);
  if (document.getElementsByClassName('cart__item').length > 1) {
    localStorage.setItem('listaCompras', arranjoCarrinho.reduce((acc, item) => `${acc} | ${item}`));
  } else localStorage.removeItem('listaCompras');
  event.target.remove();
  atualizarPrecoCarrinho();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const pesquisa = 'ssd';
const headers = {
  headers: { Accept: 'application/json' },
};

function appendarChild(classe, filho) {
  document.getElementsByClassName(classe)[0].appendChild(filho);
}

const fetchSku = (URL, header) => {
  fetch(URL, header)
    .then(resposta => resposta.json())
    .then(({ id, title, price }) => {
      appendarChild('cart__items', createCartItemElement({ sku: id, name: title, salePrice: price }));
      const valorAtual = (localStorage.getItem('listaCompras'));
      if (!valorAtual) localStorage.setItem('listaCompras', `${id}, ${title}, ${price}`);
      else {
        localStorage.setItem('listaCompras', `${valorAtual} | ${id}, ${title}, ${price}`);
      }
      atualizarPrecoCarrinho();
    });
};

function adicionarAoCarrinho() {
  const nomeSku = getSkuFromProductItem(this.parentElement);
  const URL = `https://api.mercadolibre.com/items/${nomeSku}`;
  fetchSku(URL, headers);
}

function loading(a) {
  const divCarregar = document.getElementById('carregar');
  divCarregar.innerHTML = 'Loading...';
  if (a) divCarregar.innerHTML = '';
}

const fetchPesquisa = (URL, header) => {
  fetch(URL, header)
    .then(resp => resp.json())
    .then((json) => {
      loading();
      setTimeout(() => {
        json.results.forEach((resultados) => {
          appendarChild('items', createProductItemElement({ sku: resultados.id, name: resultados.title, image: resultados.thumbnail }))
          loading(1);
        })
      }, 3000);
    })
};

function carregarCarrinho() {
  if (localStorage.getItem('listaCompras')) {
    const arranjoCarrinho = localStorage.getItem('listaCompras').split(' | ');
    arranjoCarrinho.forEach((element) => {
      const [id, title, preco] = element.split(', ');
      appendarChild('cart__items', createCartItemElement({ sku: id, name: title, salePrice: preco }));
    });
  }
}

function apagarcarrinho() {
  const paiCarrinho = document.querySelector('ol.cart__items');
  while (paiCarrinho.firstChild) paiCarrinho.removeChild(paiCarrinho.firstChild);
  localStorage.removeItem('listaCompras');
  atualizarPrecoCarrinho();
}

function criarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.innerHTML = texto;
  if (tag === 'button') elemento.addEventListener('click', apagarcarrinho);
  if ((tag === 'p') && (somaCustoCarrinho())) {
    elemento.innerHTML = `Total: ${somaCustoCarrinho()}`;
  } else {
    elemento.innerHTML = texto;
  }
  document.getElementsByClassName('cart')[0].appendChild(elemento);
}

function carregarCookies() {
  const seletorAceitaTermos = document.querySelector('.input-terms');
  seletorAceitaTermos.addEventListener('click', () => {
    document.cookie = `aceita=${seletorAceitaTermos.checked}; expires = sat, 02 May 2020 01:00:00 UTC`;
  });
}


window.onload = function onload() {
  fetchPesquisa(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`, headers);
  const inputName = document.querySelector('.input-name');
  if (this.localStorage.getItem('nome')) inputName.value = this.localStorage.getItem('nome');
  inputName.addEventListener('change', () => localStorage.setItem('nome', inputName.value));
  carregarCookies();
  criarElemento('p', 'Total: 0');
  criarElemento('button', 'Apagar carrinho');
  carregarCarrinho();

  setTimeout(() => {
    const seletorBotaoCarrinho = document.querySelectorAll('.item__add');
    seletorBotaoCarrinho.forEach((elem) => {
      elem.addEventListener('click', adicionarAoCarrinho);
    })
  }, 4000)
};
