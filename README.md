# Project Fullstack
- Registration of developers, each with a specific skill level.

### [Use Cases](/backend-app/UseCases.md)
### Docker Compose for the Application

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

### How to Test?

1. [Install Docker Compose](https://docs.docker.com/compose/install/)
2. Clone this repository
3. Run all containers with `docker-compose up` or `docker-compose up -d`
4. Alternatively, use `make build` to build the containers.
