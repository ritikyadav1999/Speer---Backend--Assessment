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
| `test`          | For performing unit test using jest       |




## Authentication Endpoints

|          Endoints       |                            description                              |
| :-----------------------| :-------------------------------------------------------------------|
| `POST /api/auth/signup` | Create a new user account                                           |
| `POST /api/auth/login`  | Log in to an existing user account and receive an access token      |

#### Signing Up takes 3 required properties:
1. name
2. email
3. password
   
```
{name:"Ritik", email:"me.ritik.yadav@gmail.com , password:"password"}
```

### Logging In takes 2 required properties:
1. email
2. password

```
{email:"me.ritik.yadav@gmai.com , password:"password"}
```

## Note Endpoints

#### All these Endpoint require Sign In
```
After Logging In copy the token and set it to the req.headers.authorization
```

#### Example
![image](https://github.com/ritikyadav1999/Speer---Backend--Assessment/assets/122474267/a620a828-86fe-4878-a39a-a2dd78d23400)



|           Endoints          |                         description                                 |
| :---------------------------| :-------------------------------------------------------------------|
| `GET /api/notes`            | Get a list of all notes for the authenticated user.                 |
| `GET /api/notes/:id `       | Get a note by ID for the authenticated user                         |
| `POST /api/notes`           | Create a new note for the authenticated user.                       |
| `PUT /api/notes/`           | Update an existing note by ID for the authenticated user.           |
| `DELETE /api/notes/`        | Delete a note by ID for the authenticated user.                     |
| `POST /api/notes/:id/share` | Share a note with another user for the authenticated user.          |
| `GET /api/search?q=:query`  | Search for notes based on keywords for the authenticated user.      |


