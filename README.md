# Speer BackEnd Assessment
<p>This is a repository for a REST API using JavaScript, NodeJs, ExpressJs, and MongoDB</p>

### Install packages

```shell
npm i
```

### Setup the Environment variable

`Create a .env file and setup env variables MONGO_URI, PORT, JWT_SECRET.You can setup the Mongo Database locally using MongoDB Compass or can setup online using MongoDB Atlas.`

```js
MONGO_URI = mongodb+srv://<username>:<passoword>@cluster0.pbpafrf.mongodb.net/
PORT = 8000
JWT_SECRET = 
```

### Start the app

```shell
npm start
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `start`         | Starts a development instance of the app |
| `test`          | For perfoming unit test using jest       |




## Authentication Endpoints

|          Endoints       |                            description                              |
| :-----------------------| :-------------------------------------------------------------------|
| `POST /api/auth/signup` | create a new user account                                           |
| `POST /api/auth/login`  | log in to an existing user account and receive an access token      |

## Note Endpoints

|           Endoints          |                         description                                 |
| :---------------------------| :-------------------------------------------------------------------|
| `GET /api/notes`            | get a list of all notes for the authenticated user.                 |
| `GET /api/notes/:id `       | get a note by ID for the authenticated user                         |
| `POST /api/notes`           | reate a new note for the authenticated user.                        |
| `PUT /api/notes/`           | update an existing note by ID for the authenticated user.           |
| `DELETE /api/notes/`        | delete a note by ID for the authenticated user.                     |
| `POST /api/notes/:id/share` | share a note with another user for the authenticated user.          |
| `GET /api/search?q=:query`  | search for notes based on keywords for the authenticated user.      |

