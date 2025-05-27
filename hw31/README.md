# Simple project with server and db

Project contain server, database to store information about workers in office. Also in this project I used jwt tokens to make server sefe. Server has public endpints and private.

## API examples

#### Get all workers

```http
  GET /private/profile
```

| Parameter | Type   | Description                                         |
| :-------- | :----- | :-------------------------------------------------- |
| `body`    | `json` | **Required**. body with worker's email and password |

#### Get item

```http
  GET /public/login
```

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `body`    | `json` | **Required**. worker's email and password |

## Run Locally

Clone the project

```bash
  git clone https://github.com/Homa4/halal_node.git
```

Go to the global directory

```bash
  cd halal_node
```

Install dependencies

```bash
  npm install
```

Go to the project directory

```bash
  cd hw31
```

Start the server

```bash
  npm run start
```

## Tech Stack

**DB:** Mongodb

**Server:** Node, Express, Mongoose, Nodemon

## Authors

- [GitHub](https://github.com/Homa4)
- [LinkeIn](https://www.linkedin.com/in/timur-naboka-458200357/)
