# Boas vindas ao repositório do projeto de Carrinho de Compras!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

---

## Utilização dos templates (index.html, style.css e script.js)

Você **não** deve alterar a lógica das funções implementadas no arquivo `script.js`.

Os arquivos `index.html` e `style.css` serão alterados apenas se você decidir fazer os requisitos bônus.
Você pode alterar estes arquivos, mas lembre-se de **não** alterar a hierarquia presente na estrutura.

---

## Requisitos do projeto

⚠️ Lembre-se que o seu projeto só será avaliado se estiver passando pelos _checks_ do **CodeClimate** e do **TravisCI**

### 1. Salve o nome da pessoa no **SessionStorage**

Você deve salvar o nome da pessoa que utiliza a página na **SessionStorage**.
A pessoa deve digitar o nome dela no campo `<input class="input-name" type="text">` (já presente na página).

### 2. Salve se a pessoa concorda com os termos da sua página nos **Cookies**

Salve se a pessoa concorda com os termos da sua página ou não nos **Cookies**.
A pessoa deve marcar ou desmarcar o campo `<input class="input-terms" type="checkbox">` (já presente na página).

Os cookies não são salvos no navegador quando o site é acessado pelo file path, isto é, clicando no index.html. Recomendamos então o teste dos cookies utilizando o localhost via um servidor que é possivel utilizar pela instalação desta [extensão](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VS Code. Basta instalar ele, executar o clique secundário e abrir o Live Server. Para testar a aplicação, valeria colocar ela no GitHub Pages e verificar se os cookies são salvos.

### 3. Listagem de produtos

Você deve criar uma listagem de produtos que devem ser consultados através da API do Mercado Livre.

Você deve utilizar o _endpoint_:
```javascript
"https://api.mercadolibre.com/sites/MLB/search?q=$QUERY"
```
onde `$QUERY` deve ser o valor da sua busca.

O retorno desse _endpoint_ será algo no formato json. Por exemplo, se for pesquisado "computador":
```json
{
    "site_id": "MLB",
    "query": "computador",
    "paging": {
        "total": 406861,
        "offset": 0,
        "limit": 50,
        "primary_results": 1001
    },
    "results": [
        {
            "id": "MLB1341925291",
            "site_id": "MLB",
            "title": "Processador Intel Core I5-9400f 6 Núcleos 128 Gb",
            "seller": {
                "id": 385471334,
                "permalink": null,
                "power_seller_status": null,
                "car_dealer": false,
                "real_estate_agency": false,
                "tags": []
            },
            "price": 899,
            "currency_id": "BRL",
            "available_quantity": 1,
            "sold_quantity": 0,
            "buying_mode": "buy_it_now",
            "listing_type_id": "gold_pro",
            "stop_time": "2039-10-10T04:00:00.000Z",
            "condition": "new",
            "permalink": "https://www.mercadolivre.com.br/processador-intel-core-i5-9400f-6-nucleos-128-gb/p/MLB13953199",
            "thumbnail": "http://mlb-s2-p.mlstatic.com/813265-MLA32241773956_092019-I.jpg",
            "accepts_mercadopago": true,
            "installments": {
                "quantity": 12,
                "amount": 74.92,
                "rate": 0,
                "currency_id": "BRL"
            },
            "address": {
                "state_id": "BR-SP",
                "state_name": "São Paulo",
                "city_id": "BR-SP-27",
                "city_name": "São José dos Campos"
            },
            "shipping": {
                "free_shipping": true,
                "mode": "me2",
                "tags": [
                    "fulfillment",
                    "mandatory_free_shipping"
                ],
                "logistic_type": "fulfillment",
                "store_pick_up": false
            },
            "seller_address": {
                "id": "",
                "comment": "",
                "address_line": "",
                "zip_code": "",
                "country": {
                    "id": "BR",
                    "name": "Brasil"
                },
                "state": {
                    "id": "BR-SP",
                    "name": "São Paulo"
                },
                "city": {
                    "id": "BR-SP-27",
                    "name": "São José dos Campos"
                },
                "latitude": "",
                "longitude": ""
            },
            "attributes": [
                {
                    "source": 1,
                    "id": "ALPHANUMERIC_MODEL",
                    "value_id": "6382478",
                    "value_struct": null,
                    "values": [
                        {
                            "name": "BX80684I59400F",
                            "struct": null,
                            "source": 1,
                            "id": "6382478"
                        }
                    ],
                    "attribute_group_id": "OTHERS",
                    "name": "Modelo alfanumérico",
                    "value_name": "BX80684I59400F",
                    "attribute_group_name": "Outros"
                },
                {
                    "id": "BRAND",
                    "value_struct": null,
                    "attribute_group_name": "Outros",
                    "attribute_group_id": "OTHERS",
                    "source": 1,
                    "name": "Marca",
                    "value_id": "15617",
                    "value_name": "Intel",
                    "values": [
                        {
                            "id": "15617",
                            "name": "Intel",
                            "struct": null,
                            "source": 1
                        }
                    ]
                },
                {
                    "name": "Condição do item",
                    "value_id": "2230284",
                    "attribute_group_id": "OTHERS",
                    "attribute_group_name": "Outros",
                    "source": 1,
                    "id": "ITEM_CONDITION",
                    "value_name": "Novo",
                    "value_struct": null,
                    "values": [
                        {
                            "id": "2230284",
                            "name": "Novo",
                            "struct": null,
                            "source": 1
                        }
                    ]
                },
                {
                    "id": "LINE",
                    "value_name": "Core i5",
                    "attribute_group_id": "OTHERS",
                    "attribute_group_name": "Outros",
                    "name": "Linha",
                    "value_id": "7769178",
                    "value_struct": null,
                    "values": [
                        {
                            "id": "7769178",
                            "name": "Core i5",
                            "struct": null,
                            "source": 1
                        }
                    ],
                    "source": 1
                },
                {
                    "id": "MODEL",
                    "value_struct": null,
                    "values": [
                        {
                            "id": "6637008",
                            "name": "i5-9400F",
                            "struct": null,
                            "source": 1
                        }
                    ],
                    "attribute_group_id": "OTHERS",
                    "name": "Modelo",
                    "value_id": "6637008",
                    "value_name": "i5-9400F",
                    "attribute_group_name": "Outros",
                    "source": 1
                }
            ],
            "differential_pricing": {
                "id": 33580182
            },
            "original_price": null,
            "category_id": "MLB1693",
            "official_store_id": null,
            "catalog_product_id": "MLB13953199",
            "tags": [
                "brand_verified",
                "good_quality_picture",
                "good_quality_thumbnail",
                "immediate_payment",
                "cart_eligible"
            ],
            "catalog_listing": true
        },
    ]
}
```
A lista de produtos que devem ser exibidos é o _array_ `results` no `JSON` acima.

Você **deve** utilizar a função `createProductItemElement(product)` para criar os componentes _HTML_ referentes a um produto.

Adicione o elemento retornado da função `createProductItemElement(product)` como filho do elemento `<section class="items">`.

**Obs:** sku se referem as `id`

### 4. Adicione o produto ao carrinho de compras

Cada produto na página _HTML_ possui um botão com o nome `Adicionar ao carrinho!`.

Ao clicar nesse botão você deve realizar uma requisição para o _endpoint_:
```javascript
"https://api.mercadolibre.com/items/$ItemID"
```
onde `$ItemID` deve ser o valor `id` do item selecionado.

Quando colocado o id `MLB1341706310` retorno desse _endpoint_ será algo no formato:
```JSON
{
    "id": "MLB1341706310",
    "site_id": "MLB",
    "title": "Processador Amd Ryzen 5 2600 6 Núcleos 64 Gb",
    "subtitle": null,
    "seller_id": 245718870,
    "category_id": "MLB1693",
    "official_store_id": 1929,
    "price": 879,
    "base_price": 879,
    "original_price": null,
    "currency_id": "BRL",
    "initial_quantity": 0,
    "available_quantity": 0,
    "sold_quantity": 0,
    ...
    "warranty": "Garantia de fábrica: 3 anos",
    "catalog_product_id": "MLB9196241",
    "domain_id": "MLB-COMPUTER_PROCESSORS",
    "parent_item_id": null,
    "differential_pricing": null,
    "deal_ids": [],
    "automatic_relist": false,
    "date_created": "2019-10-15T18:13:00.000Z",
    "last_updated": "2019-12-20T18:06:54.000Z",
    "health": null,
    "catalog_listing": true
}
```
Preste atenção que o JSON deve conter apenas **um** item.

Você **deve** utilizar a função `createCartItemElement()` para criar os componentes _HTML_ referentes a um item do carrinho.

Adicione o elemento retornado da função `createCartItemElement(product)` como filho do elemento `<ol class="cart__items">`.

### 5. Remova o item do carrinho de compras ao clicar nele

Ao clicar no **produto no carrinho de compra**, ele deve ser removido da lista.
Para isso, uma função (já existente) chamada `cartItemClickListener(event)` deve ser implementada com a lógica necessária para realizar a remoção.

### 6. Salve o carrinho de compras no **LocalStorage**

O carrinho de compras deve ser salvo no **LocalStorage**, ou seja, todas as **adições** e **remoções** devem ser abordadas para que a lista atual seja salva.

### 7. Carregue o carrinho de compras através do **LocalStorage** ao iniciar a página

Ao carregar a página, o estado atual do carrinho de compras deve ser carregado do **LocalStorage**

### 8. (BÔNUS) Botão para limpar carrinho de compras

Crie um botão para remover todos os itens do carrinho de compras.

### 9. (BÔNUS) Custo total do carrinho de compras

Apresente o valor total do carrinho de compras.

### 10. (BÔNUS) "loading" durante uma requisição à API

Uma requisição à API gasta um tempo e durante ele, ficamos sem saber se está tudo certo ou se algo deu errado.
Normalmente é utilizada alguma forma para mostrar que a requisição está em andamento.
Mostre a palavra "loading..." em alguma lugar da página **apenas durante** a requisição à API.

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone https://github.com/tryber/sd-02-week9-project-shopping-cart.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-02-week9-project-shopping-cart`

2. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora, crie uma branch onde você vai guardar os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-project-shopping-cart`

3. Crie uma pasta na raiz do projeto com o seu nome e um arquivo **README.md** dentro dessa pasta:
  * Verifique que você está na raiz do projeto
    * Exemplo: `pwd` -> o retorno vai ser algo tipo _/Users/joaozinho/code/**sd-02-week9-project-shopping-cart**_
  * Crie a pasta e o arquivo **README.md**
    * Exemplo:
      * `mkdir joaozinho`
      * `echo "the quick brown fox jumped over the lazy dog" > joaozinho/README.md`

4. Adicione ao diretória criado os arquivos `index.html`, `style.css` e `script.js` presentes na raiz desse repositório. Você utilizará esses arquivos como base.

5. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto. VAMOS COM TUDO :rocket:'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

6. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-project-shopping-cart`

7. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-02-week9-project-shopping-cart/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-02-week9-project-shopping-cart/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* ⚠ **LEMBRE-SE DE CRIAR TODOS OS ARQUIVOS DENTRO DA PASTA COM O SEU NOME** ⚠

* ⚠ **PULL REQUESTS COM ISSUES NO CODE CLIMATE NÃO SERÃO AVALIADAS, ATENTE-SE PARA RESOLVÊ-LAS ANTES DE FINALIZAR O DESENVOLVIMENTO!** ⚠

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  5. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  4. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-02`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

⚠ Lembre-se que garantir que todas as _issues_ comentadas pelo CodeClimate estão resolvidas! ⚠

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Os monitores também farão a revisão de todos os projetos, e irão avaliar tanto o seu _Pull Request_, quanto as revisões que você fizer nos _Pull Requests_ dos seus colegas!!!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
