# Simple full stack project

Project contain backend, database and frontend to store information about workers in office. Also in this project I used jwt tokens to make server safe. Server has public and private endpoints. Frontend has good and userfriendly ui .

## Table of Contents

- [Features](#features)
- [Demo Screenshot](#demo-screenshot)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)

## Features

- **Login Page**

  - Allows workers/admins to authenticate with email & password.
  - Stores a JWT token in `sessionStorage` on successful login.

- **Admin Dashboard**

  - Displays admin information and a list of all registered workers.
  - Provides a form to create new workers (name, age, position, salary, email, password, role).
  - Delete a worker by email.
  - Search for a worker by email (private endpoint).

- **Worker Info Page**

  - Shows the logged-in worker’s profile (name, age, position, salary, email, role).
  - Accessible only when a valid JWT is present.

- **Protected Routes**

  - Routes under `/private/*` require a valid `Authorization: Bearer <token>` header.
  - Public routes (`/public/*`) are accessible without a token.

- **Responsive Layout**
  - Built with React/Next.js and CSS modules (or global CSS) for styling.

## Demo Screenshot

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- The backend server running on `http://localhost:8080`
- MongoDB (the backend must be connected to a running MongoDB instance).

## Installation

Install this project with npm:

```bash
  git clone https://github.com/Homa4/hw33
```

```bash
  cd hw33
  npm install
```

## API examples

Private routes (/private) could be accessible only having jwt token. JWT token you get after authorization.

#### Get worker info

```http
  POST /private/profile
```

| Parameter | Type      | Description                                            |
| :-------- | :-------- | :----------------------------------------------------- |
| `body`    | `json`    | **Required**. body with worker's email and password    |
| `coockie` | `coockie` | Coockie required to get access to endpoints on backend |

#### GET all wokers in company

```http
  GET /private/getList
```

| Parameter | Type      | Description                                            |
| :-------- | :-------- | :----------------------------------------------------- |
| `-`       | `-`       | **Required:** nothing                                  |
| `coockie` | `coockie` | Coockie required to get access to endpoints on backend |

#### DELETE delete worker from admin account

```http
  DELETE /private/deleteWorker
```

| Parameter | Type      | Description                                            |
| :-------- | :-------- | :----------------------------------------------------- |
| `body`    | `json`    | **Required:** Worker’s email to delete                 |
| `coockie` | `coockie` | Coockie required to get access to endpoints on backend |

#### POST add both worker or admin

```http
  POST /private/addWorker
```

| Parameter | Type      | Description                                                                          |
| :-------- | :-------- | :----------------------------------------------------------------------------------- |
| `body`    | `json`    | **Required:** Worker’s info, like name, age, salary, position, email, password, role |
| `coockie` | `coockie` | Coockie required to get access to endpoints on backend                               |

#### POST find special worker by email

```http
  POST /private/findWorker
```

| Parameter | Type      | Description                                            |
| :-------- | :-------- | :----------------------------------------------------- |
| `body`    | `json`    | **Required:** Worker’s email                           |
| `coockie` | `coockie` | Coockie required to get access to endpoints on backend |

#### Login

```http
  POST /public/login
```

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `body`    | `json` | **Required**. worker's email and password |

#### Logout

```http
  GET /public/logout
```

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `-`       | `-`  | `-`         |

## Folder Structure

```text
  transport_company/
  ├── public/
  │   └── images/
  │
  ├── src/  (or directly under /pages if not using src folder)
  │   ├── components/
  │   │   ├── Header/
  │   │   ├── LoginForm/
  │   │   ├── AdminPage/
  │   │   ├── WorkerInfo/
  │   │   └── Carousel/
  │   │
  │   ├── pages/
  │   │   ├── index.jsx
  │   │   ├── login.jsx
  │   │   ├── admin.jsx
  │   │   └── worker.jsx
  │   │
  │   ├── styles/
  │   │   ├── globals.css
  │   │   └── [Component].module.css
  │   │
  │   └── utils/
  │       └── auth.js
  │
  ├── .env.local
  ├── package.json
  ├── next.config.js
  ├── .eslintrc.js
  └── README.md
```

## Tech Stack

**DB:** Mongodb

**Backend:** Node.js, Express, Mongoose, Nodemon

**Frontend:** Next.js
