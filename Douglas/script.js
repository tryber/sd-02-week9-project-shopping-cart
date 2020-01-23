const fetchParam = {
  headers: ({
    Accept: 'application/json',
  }),
};
function ani() {
  return document.querySelector('.animation');
}

function pegaTotal() {
  const total = document.querySelector('.value');
  return total;
}

function numero() {
  const controle = pegaTotal();
  return (parseFloat(controle.innerText));
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
  localStorage.removeItem(`${event.target.classList[1]}`);
  event.target.remove();
  pegaTotal().innerText = (numero() - (parseFloat(event.target.innerText.split('PRICE: $')[1]))).toFixed(2);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function exclueTudo() {
  const cart = document.querySelector('.cart__items');
  const excludeLi = document.querySelectorAll('.cart__item');
  excludeLi.forEach((element) => {
    cart.removeChild(element);
  });
  localStorage.clear();
  const controle = pegaTotal();
  controle.innerText = 0;
}

function adicionaExclusao() {
  const limpador = document.querySelector('.limpa');
  limpador.addEventListener('click', exclueTudo);
}

function auxiliaCriação(object) {
  const cart = document.querySelector('.cart__items');
  const itens = createCartItemElement(object);
  adicionaExclusao();
  return cart.appendChild(itens);
}

function segundaRequisicao(response) {
  const object = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
  };
  const valor = numero();
  const controle = pegaTotal();
  controle.innerText = (valor + object.salePrice).toFixed(2);
  const addclasse = auxiliaCriação(object);
  if (localStorage.getItem(object.sku)) {
    localStorage.setItem(`${object.sku}${localStorage.length}`, JSON.stringify(object));
    addclasse.classList.add(`${object.sku}${localStorage.length}`);
  }
  localStorage.setItem(`${object.sku}`, JSON.stringify(object));
  addclasse.classList.add(`${object.sku}`);
}

function fetchArray(url, func) {
  fetch(url, fetchParam)
    .then((response) => {
      response.json()
        .then((res) => {
          func(res);
        });
    })
    .catch(() => alert('Não foi possivel achar o resultado'));
}

function adicionaCarrinho() {
  fetchArray(`https://api.mercadolibre.com/items/${getSkuFromProductItem(this.parentElement)}`, segundaRequisicao);
}

function deuCerto(response) {
  if (response.results[0] != null) {
    setTimeout(() => {
      const animation = document.querySelector('.progress');
      animation.classList.toggle('progress');
      animation.classList.toggle('animation');
      response.results.forEach((element) => {
        const localItem = document.querySelector('.items');
        const objetoCriado = createProductItemElement({
          sku: element.id,
          name: element.title,
          image: element.thumbnail,
        });
        localItem.appendChild(objetoCriado);
      });
      const adiciona = document.querySelectorAll('.item__add');
      adiciona.forEach(element => element.addEventListener('click', adicionaCarrinho));
    }, 1200);
  } else {
    const animation = document.querySelector('.progress');
    animation.classList.toggle('progress');
    animation.classList.toggle('animation');
    alert('Sua pesquisa não retornou nenhum resultado');
  }
}

function salvaNome() {
  const NOME = document.querySelector('.input-name');
  NOME.addEventListener('change', () => {
    sessionStorage.setItem('Nome', NOME.value);
  });
}

function botaoCheck() {
  const check = document.querySelector('.input-terms');
  check.addEventListener('click', () => {
    if (check.checked) {
      document.cookie = 'terms=checked';
    } else if (!check.checked) {
      document.cookie = 'terms= ';
    }
  });
}

function RecuperaCookieESession() {
  const check = document.querySelector('.input-terms');
  if (document.cookie.split('=')[1] !== '') {
    check.checked = true;
  }
  const NOME = document.querySelector('.input-name');
  NOME.value = sessionStorage.getItem('Nome');
}

function inicia() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const object = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const { name, salePrice, sku } = object;
      const addclasse = auxiliaCriação({ sku, name, salePrice });
      addclasse.classList.add(`${localStorage.key(i)}`);
      const controle = numero();
      const controle1 = pegaTotal();
      controle1.innerText = (parseFloat(controle + salePrice).toFixed(2));
    }
  }
  botaoCheck();
  RecuperaCookieESession();
}

function limpaPesquisa() {
  const selectLi = document.querySelectorAll('.item');
  const localItem = document.querySelector('.items');
  selectLi.forEach((element) => {
    localItem.removeChild(element);
  });
}

function exibeItens() {
  const pesquisa = document.querySelector('.input-pesquisa');
  pesquisa.addEventListener('change', () => {
    limpaPesquisa();
    animation = ani();
    animation.classList.toggle('progress');
    animation.classList.toggle('animation');
    fetchArray(`https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa.value}`,
      deuCerto);
  });
}

window.onload = function onload() {
  inicia();
  salvaNome();
  exibeItens();
};
