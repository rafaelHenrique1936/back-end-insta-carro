# Back-end Insta Carro

Este projeto é parte do Desafio Insta Carro, uma plataforma de leilão na qual carros estão cadastrados e os usuários podem fazer lances nos carros disponíveis na plataforma.

## Bibliotecas Utilizadas

### Produção

- **Express** (v4.19.2): Framework web rápido, flexível e minimalista para Node.js.
- **Express-graphql** (v0.12.0): Middleware para integrar o Express com o GraphQL.
- **GraphQL** (v15.8.0): Linguagem de consulta e manipulação de dados para APIs, com sistema de tipagem para suas operações.
- **Mongoose** (v8.2.3): Biblioteca de modelagem de objetos MongoDB para Node.js.
- **Cors** (v2.8.5): Middleware para habilitar o acesso a recursos de uma aplicação web de diferentes origens.
- **Body-parser** (v1.20.2): Middleware para parsear corpos de requisição em middleware Express.
- **Compression** (v1.7.4): Middleware para compressão gzip/deflate de respostas HTTP.
- **Ioredis** (v5.3.2): Cliente Redis com suporte para Promises.
- **Jsonwebtoken** (v9.0.2): Implementação de tokens JWT para autenticação e autorização.
- **Request** (v2.88.2): Biblioteca simplificada para fazer requisições HTTP.

### Desenvolvimento

- **Nodemon** (v3.1.0): Utilitário que monitora mudanças no código e reinicia automaticamente o servidor.
- **Typescript** (v5.4.3): Superset da linguagem JavaScript que adiciona tipagem estática opcional ao código.
- **Jest** (v29.7.0): Framework de teste de JavaScript com foco na simplicidade.
- **Ts-jest** (v29.1.2): Preset Jest para TypeScript.
- **@types/body-parser** (v1.19.5): Tipos TypeScript para Body-parser.
- **@types/compression** (v1.7.5): Tipos TypeScript para Compression.
- **@types/express** (v4.17.21): Tipos TypeScript para Express.
- **@types/express-graphql** (v0.9.0): Tipos TypeScript para Express-graphql.
- **@types/graphql** (v14.5.0): Tipos TypeScript para GraphQL.
- **@types/http-status** (v1.1.2): Tipos TypeScript para HTTP-status.
- **@types/jsonwebtoken** (v9.0.6): Tipos TypeScript para Jsonwebtoken.
- **@types/mongoose** (v5.11.97): Tipos TypeScript para Mongoose.
- **@types/node** (v20.11.30): Tipos TypeScript para Node.js.
- **@types/redis** (v4.0.11): Tipos TypeScript para Redis.
- **@types/request** (v2.48.12): Tipos TypeScript para Request.
- **@types/cors** (v2.8.17): Tipos TypeScript para Cors.

## Documentação Postman

Para consultar a documentação da API, [clique aqui](https://documenter.getpostman.com/view/12625792/2sA35HY1kb).

## Imagem Docker

A imagem Docker deste projeto pode ser encontrada no Docker Hub [neste link](https://hub.docker.com/r/rafaelalves1936/insta_carro_back_end).

## Instalação

Para instalar a imagem Docker, você pode utilizar o seguinte comando no terminal:

    docker pull rafaelalves1936/insta_carro_back_end



## Autor

- **Rafael Henrique**

## Licença

- **ISC**

Para mais informações sobre como utilizar este projeto, consulte a documentação das bibliotecas individuais e o código-fonte disponibilizado.

## Como Rodar Localmente

Para rodar localmente, você pode utilizar essas duas imagens Docker para MongoDB e Redis. Primeiro, inicie o MongoDB executando o seguinte comando no terminal:


docker run -d -p 27017:27017 -p 27018:27018 -e AUTH=no bitnami/mongodb:latest

Em seguida, inicie o Redis com o comando:

docker run -d -p 6379:6379 redis.

Por fim, é necessário alterar o link de conexão no arquivo `db.ts`. Descomente a opção que deseja utilizar local ou conteinerizado.

## Melhorias Futuras

Se tivesse mais tempo, algumas melhorias poderiam ser implementadas no projeto:

- **Melhoria na Paginação:**

Refinar a lógica de paginação para melhorar a eficiência e resolver problemas relacionados aos testes de paginação com consultas ao banco de dados.

- **Tratamento de Erros Aprimorado:** 

Implementar um tratamento de erros mais robusto e abrangente em todas as partes do código para lidar com situações inesperadas de forma mais elegante e informativa.

- **Validações Adicionais:**

 Adicionar mais validações nos processos de criação e atualização de recursos para garantir a integridade dos dados e a segurança da aplicação.

- **Documentação Expandida:**

 Expandir a documentação do código-fonte para incluir mais detalhes sobre a arquitetura, padrões de design utilizados e fluxos de trabalho da aplicação.

- **Melhorias de Desempenho:**

 Identificar e resolver possíveis gargalos de desempenho na aplicação, otimizando consultas ao banco de dados, cacheamento de dados e outras operações críticas.

- **Implementação de Testes de Integração:**

 Desenvolver testes de integração para garantir que os diferentes componentes da aplicação funcionem bem juntos e que as integrações com APIs externas sejam robustas.

- **Implementação de Funcionalidades Adicionais:**

 Adicionar novas funcionalidades conforme necessário para atender aos requisitos do cliente ou melhorar a experiência do usuário na plataforma.