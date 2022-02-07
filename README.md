# Project Fullstack
- Cadastro de desenvolvedores, que possuem um determinado nível.

### [Casos de Uso](/backend-app/UseCases.md)
### Docker Compose do Aplicação

```yaml
version: '3'

services:
  db:
    image: postgres:14.1-alpine
    container_name: postgres_db
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=test
    ports:
      - '5432:5432'
  api:
    container_name: api
    build: 
      context: ./backend-app
      dockerfile: Dockerfile
    image: api
    entrypoint: dockerize -wait tcp://db:5432 -timeout 30s 
    depends_on:
      - db
    command: yarn dev
    ports:
      - 3333:3333
    environment:
      DB_HOST: db
    links:
      - db
```

### Como testar?

1. [Instalar Docker Compose](https://docs.docker.com/compose/install/)
1. Clone este repo
1. Rodar todos os containers com `docker-compose up ou docker-compose up -d`
