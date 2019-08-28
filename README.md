![](https://emojis.slackmojis.com/emojis/images/1542340470/4976/perfect.gif?1542340470)

# **Museum "Get The Picture"**

## :nerd_face: A multi-player game to test your art smarts :nerd_face:

### :pushpin: What is this?
This is the server side of the "Museum Get The Picture" multi-player game.

### :pushpin: Links
* The Front-End can be found [HERE](https://github.com/JetskevdWouden/museum-game-app-front)
* This server is deployed [HERE](https://protected-eyrie-79199.herokuapp.com)

### :pushpin: Table of contents

* [Technologies used](#technologies_used)
* [Setup](#setup)
* [API](#api)
* [Future Features](#future_features)

### :pushpin: Technologies Used

* Node.js
* PostgreSQL
* Express
* Sequelize

### :pushpin: SetUp

1. git clone
2. npm install
3. npm run dev

Please note that in order to run the server locally you must also start a Postgres container using the following commands
```bash
$ docker run \
  --rm \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres
```
Connect to your database with:
* Mac: Postico
* Linux: DBeaver

### :pushpin: API
**Models:**

**Endpoints:**

### :pushpin: Future Features
