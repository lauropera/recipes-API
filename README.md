# 🍣 Recipes API

![Preview do Projeto Recipes API](./images/project-preview.png)

## 📡 Desenvolvimento

Essa é uma API de receitas, ondê você pode criar, buscar ou favoritar receitas de outros usuários.

<br />

## ⚙️ Tecnologias

- Node.js
- TypeScript
- Express.js
- Sequelize.js
- MySQL
- Json Web Tokens
- Zod
- Docker
- Docker Compose

## 🚀 Instalação e execução

<details>
<summary>Instalação e execução com Docker</summary>
<br />

Para rodar está aplicação é necessário ter **Git**, **Node**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior e o Node na versão 16.

Para conseguir executar os comandos do abaixo também é necessário que seu sistema operacional tenha um terminal Bash instalado. Caso você esteja utilizando Linux ou macOS, o Bash já vem instalado por padrão. Porém, se o seu sistema for Windows, você pode [aprender como instalar](https://dicasdeprogramacao.com.br/como-instalar-o-git-no-windows/).

### 1 - Clone o repositório:

```
git clone git@github.com:lauropera/recipes-API.git
```

### 2 - Na raíz do projeto, suba os containers do backend (`rcp_backend`) e o banco de dados (`rcp_db`) com o comando:

    npm run compose:up

Os containers estão mapeados nas seguintes portas:

- rcp_backend: 3001
- rcp_db: 3002

Para parar os containers, na pasta raiz do projeto execute o comando:

    npm run compose:down

### 3 - Usuários para fazer login

Nessa aplicação é necessário fazer o login com um email e senha. A tabela abaixo disponibiliza usuários pré-cadastrados para o acesso:

| Email              |    Senha    |
| ------------------ | :---------: |
| mallu@artist.com   | sambinhabom |
| sebastian@sebs.com |    piano    |

</details>
<br />

## 🔎 Rotas

### Auth

<details>
  <summary><strong>POST /auth/register</strong></summary>
  <br/ >

• Cadastra um novo usuário.

  <h3>Exemplo de requisição:</h3>

```
{
    "name": "Arezu",
    "email": "arezu@pokemail.com",
    "password": "pokepass"
}
```

</details>

<details>
  <summary><strong>POST /auth/login</strong></summary>
  <br/ >

• Faz o login na aplicação.

  <h3>Exemplo de requisição:</h3>

```
{
  "email": "sebastian@sebs.com",
  "password": "piano"
}
```

</details>

<br />

### Recipe

<details>
  <summary><strong>GET /recipe</strong></summary>
  <br/ >

• Traz todas as receitas.

</details>

<details>
  <summary><strong>GET /recipe/favorites</strong></summary>
  <br/ >

• Traz as receitas favoritadas do usuário.

</details>

<details>
  <summary><strong>GET /recipe/:id</strong></summary>
  <br/ >

• Traz uma receita pelo seu id.

</details>

<details>
  <summary><strong>GET /recipe/?category=</strong></summary>
  <br/ >

• Traz todas as receitas pela categoria.

  <h3>Exemplo de rota</h3>

```
/recipe/?category=lanchesF
```

</details>

<details>
  <summary><strong>POST /recipe/:id/favorite</strong></summary>
  <br/ >

• Adiciona uma receita nos favoritos pelo seu id.

</details>

<details>
  <summary><strong>POST /recipe/new</strong></summary>
  <br/ >

• Cria uma nova receita.

  <h3>Exemplo de requisição:</h3>

```
{
    "name": "Miojo",
    "chef": "mallu@artist.com",
    "preparationTime": 5,
    "servings": 1,
    "videoUrl": "",
    "imageUrl": "",
    "category": "Massas",
    "tags": [
        "Macarrão instantâneo"
    ],
    "ingredients": [
        {
            "amount": 1,
            "name": "Pacote de miojo"
        }
    ],
    "instructions": [
        "Ferva a agua em 2 minutos",
        "Despeje o miojo na agua por 3 minutos",
        "Desligue o fogo e jogue o tempero"
    ]
}
```

</details>

<details>
  <summary><strong>DELETE /recipe/:id/unfavorite</strong></summary>
  <br/ >

• Remove uma receita nos favoritos pelo seu id.

</details>

<br />

### Category

<details>
  <summary><strong>GET /category</strong></summary>
  <br/ >

• Traz todas as categorias.

</details>

<details>
  <summary><strong>GET /category/:id</strong></summary>
  <br/ >

• Traz todas as receitas relacionadas a categoria pelo seu id.

</details>

<br />

#

<div>
  <p align="center">🍐</p>
</div>
