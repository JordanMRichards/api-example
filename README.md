* [Installation](#installation)
* [Testing](#testing)
* [API Endpoints](#api-endpoints)
* [Dependencies](#dependencies)
<br><br><br>
# Introduction

This is my `Web Developement API Task` submission.

Each user has one of the following:
* id
* givenName
* familyName
* email
* password

Data is persisted via the MongoDB database.

This API is consumed via HTTP requests.

**Extra Additions:**
* Each user has a hashed password
* Login system using JWT Authentication for specific read, update, delete requests
* Docker container
* Pagination cursor for fetching users past the limit
* Postman collection with tests

<br><br><br>

# Installation
* Alter the configuration inside [src/config/config.js](src/config/config.js) to meet your needs.
* Make sure you have `docker-compose` installed. (https://docs.docker.com/compose/install/)
* In the shell, navigate to the base directory for this project, then enter `docker-compose up`

<br><br><br>

# Testing

To test this API, simply import the [test_api postman collection](test_api.postman_collection.json) file into Postman. After you have imported it, start a runner on the `Example User Requests`

<br><br><br>

# API Endpoints

By default, the api is hosted on port 3000. This can be changed in the [configuration file](src/config/config.js). If you change this port and are using Docker, make sure you update the port inside of [Dockerfile](Dockerfile) and [docker-compose.yml](docker-compose.yml) too.


## GET `/api/users/`
Fetch all the recent users up to a limit. Limit is 100 by default. You can also specify a cursor to paginate future requests after the limit. 

**Successful Response:**
* `users` array object containing objects of `id, givenName, familyName, email`
* `cursor` string


**Query Options:**

| Query | Value                | Description  |
| ------ | ------------------- | ------------ |
 limit (*optional*) | 1 - 100 | (Optional) Will limit the amount of results. (Defaults to 100)
cursor (*optional*)  | `cursor string` | (Optional) Use this to paginate through results after the records reach the limit. Get the cursor from the response and then use this parameter on the following request.

---

## Authorization
Certain routes are restricted to authenticated users only. In order to authorize your request you must set the `Authorization` header equal to a valid Bearer token. Tokens can be fetched via POST `/api/users/login`.

Considering that this is just an example, do not use this API in production. This is because SSL is not implemented.

**Format**: `Authorization: Bearer <token>`

## POST `/api/users/login`
Login with an email and password in return for an authentication token.
**Successful Response:**  `token`

**Body:**

| Key  | Value  |
----------- | -----------
 `email` | `String` *Required.
`password` | `String` *Required.

---

## GET `/api/users/:id`
Fetch a specific user by `:id`
* Requires [Authorization](#authorization)
* Successful Response  User object containing `id, givenName, familyName, email`

---

## PUT `/api/users/:id`
* Update a user in the database specified by `:id`. You can have as few or as many values updated as needed.
* Requires [Authorization](#authorization)
* Successful Response  `204` status

**Body:**

| Key  | Value  |
----------- | -----------
 `givenName` | `String` *Optional. Max length: 25
 `familyName` | `String` *Optional. Max length: 25
 `email` | `String` *Optional. Valid email address.
`password` | `String` *Optional. Max length: 50

---


## POST `/api/users/`
* Insert a new user into the database.
* Requires [Authorization](#authorization)
* Successful Response:  `201` status and an object containing the new user. `id, givenName, familyName, email`

**Body:**

| Key  | Value  |
----------- | -----------
 `givenName` | `String` *Required. Max length: 25
 `familyName` | `String` *Required. Max length: 25
 `email` | `String` *Required. Valid email address.
`password` | `String` *Required. Max length: 50


---

## DELETE `/api/users/:id`
* Delete a user from the database by `:id`.
* Requires [Authorization](#authorization)
* Successful Response:  `204` status

---

<br><br><br>

# Dependencies

**Language**: Node.js v8.10> (Docker: node:carbon)

**Tools**: [npm](https://www.npmjs.com/get-npm)

**DBMS**: [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
<br><br>
**NPM Packages**:
 * [express](https://www.npmjs.com/package/express) - Framework used for the http server and routing
 * [express-validator](https://www.npmjs.com/package/express-validation) - Middleware to validate the joi user schema for each route.
 * [joi](https://www.npmjs.com/package/joi) - Used to create the validation schema
 * [body-parser](https://www.npmjs.com/package/body-parser) - Middleware used to populate the req.body with the submitted request data
 * [faker](https://www.npmjs.com/package/faker) - Used to create the fake email, givenName and familyName values when populating the DB with dummy users.
 * [bycrpt](https://www.npmjs.com/package/bcrypt) Used to hash the user passwords.
 * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used to sign and verify tokens to create the authentication system
 * [mongoose](https://www.npmjs.com/package/mongoose) - Used to create database schemas and models that interact with MongoDB.
 * [mongoose-unique-validator](https://www.npmjs.com/mongoose-unique-validator) - Mongoose plugin to add the "unique" property to the Schema, which prevents duplicate inserts of the same value in the DB.
 * [mongo-cursor-pagination](https://www.npmjs.com/package/mongo-cursor-pagination) - Used the mongoose Plugin from this to add cursor pagination functionalty to the /users/ GET route.
 * [@babel/core](https://www.npmjs.com/package/@babel/core), [@babel/cli](https://www.npmjs.com/package/@babel/cli), [@babel/node](https://www.npmjs.com/package/@babel/node), [@babel/core](https://www.npmjs.com/package/@babel/preset-env) - Used to transpile Javascript for use of import/export syntax.
 
