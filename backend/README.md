<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/.github/logo.png" width="300px" />
</h1>

---

Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack.

---

## :information_source: Iniciando a aplicação

### Requerimentos

_Para rodar a aplicação é necessário que você possua esses três programas:_
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)


### Também foram utilizados três bancos de dados da aplicação
- [Postegres](https://github.com/postgres/postgres)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Porém, para facilitar, usamos o [Docker](https://www.docker.com/) para rodar os bancos de dados facilmente.
---

```bash
# Instale uma imagem do Redis
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

# Instale uma imagem do Postgres
docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
(Neste caso, seu login e senha será: fastfeet)

# Inicie o Redis
docker start redisfastfeet

# Inicie o Postgres
docker start fastfeet

```
### Iniciando o Backend
Agora clone este repositório e instale suas dependências
```bash
# clonando o repositório
git clone https://github.com/MicaelliMedeiros/FastFeet.git

# entrando na pasta do backend
cd fastfeet/backend

#instalando as dependências
yarn

```
Para que haja a conexão do backend com o banco de dados, você precisará colocar suas informações no arquivo .env, baseado no .env.example que está dentro do backend.

```bash
# rodando as migrations para o banco
yarn sequelize db:migrate

# permitindo que haja o administrador no banco
yarn sequelize db:seed:all

# iniciando a aplicação
yarn dev & yarn queue
```

Após estes passos, você poderá iniciar o frontend ou o mobile!

# Envio de emails:
![Screenshot_2020-02-11 Mailtrap - Safe Email Testing](https://user-images.githubusercontent.com/54600663/74209995-c5f99780-4c68-11ea-9ce6-06052325d0d9.png)

# Testando pelo insomnia:
![insomnia](https://user-images.githubusercontent.com/54600663/74209998-c85bf180-4c68-11ea-9677-f540b7198c18.png)

---

By [Micaelli Medeiros](https://www.linkedin.com/in/micaellimedeiros/)

---
