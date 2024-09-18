# Groupe 2 - Projet SkillFusion 

![image](https://images.unsplash.com/photo-1595814432314-90095f342694?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=712x472)*[source](https://unsplash.com/fr/@roselyntirado) by Roselyn Tirado*

Welcome to our vibrant online DIY lesson platform project made by students ! 

Here, you'll discover a virtual space dedicated to mastering the art of DIY and construction. From woodworking to interior design to electronic repairs, our diverse range of online lessons has something for everyone.

Whether you're just starting out or a seasoned DIY enthusiast, our platform empowers you to unlock your potential, hone your skills, and bring your projects to life with boundless enthusiasm !

## Contributors

[![Static Badge](https://img.shields.io/badge/Lead_Developer-Charles--Edouard_Breton_(FragRappy)-blue)](https://github.com/FragRappy)

[![Static Badge](https://img.shields.io/badge/Product_Owner-Yannis_Pacak_(3YANNIS3)-yellow)](https://github.com/3YANNIS3)

[![Static Badge](https://img.shields.io/badge/Scrum_Master-Cihan_Turna_(CihanTurna)-violet)](https://github.com/CihanTurna)

[![Static Badge](https://img.shields.io/badge/Git_Master-Gabriel_Gourouvin_(GabrielGrvn)-orange)](https://github.com/GabrielGrvn)

## Project status:

![Static Badge](https://img.shields.io/badge/Server-in_development-red?link=https://github.com/O-clock-Accessidev-Session1/projet-02-skillfusion)
![Static Badge](https://img.shields.io/badge/Client-in_development-red?link=https://github.com/O-clock-Accessidev-Session1/projet-02-skillfusion)

## Project dependencies :

### Client 

![Static Badge](https://img.shields.io/badge/React-v18.2-darkblue?link=https://www.npmjs.com/package/react) ![Static Badge](https://img.shields.io/badge/React--router--dom-v6.22-blue?link=https://www.npmjs.com/package/react-router-dom) 

#### dev dependency : ![Static Badge](https://img.shields.io/badge/Parcel-_v2.11-brown?link=https://www.npmjs.com/package/parcel) 

### Server

![Static Badge](https://img.shields.io/badge/Node->=_v20-green?link=https://www.npmjs.com/package/node) ![Static Badge](https://img.shields.io/badge/Express-v4.18.2-brown?link=https://www.npmjs.com/package/express) ![Static Badge](https://img.shields.io/badge/Sequelize-v6.36-darkgreen?link=https://www.npmjs.com/package/sequelize) ![Static Badge](https://img.shields.io/badge/Bcrypt-_v5.1.1-orange?link=https://www.npmjs.com/package/bcrypt) ![Static Badge](https://img.shields.io/badge/Dotenv-_v16.4.1-cyan?link=https://www.npmjs.com/package/dotenv) ![Static Badge](https://img.shields.io/badge/Postgres-_v8.11.3-blue?link=https://www.npmjs.com/package/pg) ![Static Badge](https://img.shields.io/badge/Cors-_v2.8.5-red?link=https://www.npmjs.com/package/pg)

#### dev dependency : ![Static Badge](https://img.shields.io/badge/Nodemon-v3.0.3-yellow?link=https://www.npmjs.com/package/nodemon)

## REST API Documentation
You must have node and postgres installed on your server
### Installation
    npm install
### Server configuration
You can configure the accessible port of your server as well as the connection information to your database given in the `.env.example` file.
### Run in dev environment
    npm run dev
### Run in production environment
    npm run start
## Users routes 
<details>
  <summary>Get user by id</summary>

#### Request :
`GET /users/:user_id`

    example: http://[server_url]/users/1
#### Response :
    200 OK 
    {
        "status": "succes",
        "message": "Data of user sent",
        "datas": {
            "id": 1,
            "role": "member",
            "username": "member",
            "email": "member@test.fr"
        }
    }
</details>
<details>
  <summary>Get all users</summary>

#### Request :
`GET /users`

    example: http://[server_url]/users
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Data of users sent",
        "datas": [
            {
                "id": 1,
                "role": "member",
                "username": "member",
                "email": "member@test.fr"
            },
            {
                "id": 2,
                "role": "member",
                "username": "member2",
                "email": "member2@test.fr"
            },
            {
                "id": 3,
                "role": "member",
                "username": "member3",
                "email": "member3@test.fr"
            }
        ]
    }
</details>
<details>
  <summary>Create new user</summary>

#### Request :
`POST /users/register`
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Created user"
    }
</details>
<details>
  <summary>Login</summary>

#### Request :
`POST /users/login`
#### Response :
    201 CREATED
    {
        "status": "success",
        "token": "83bb496c997840bd90e053bc360701b3d852c1808dfeeb2ccf90be243440fdb2",
        "tokenExpires": "2024-02-11T17:18:57.561Z"
    }
</details>
<details>
  <summary>Update user</summary>

#### Request :
`PATCH /users`
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Updated user"
    }
</details>
<details>
  <summary>Delete user</summary>

#### Request :
`DELETE /users/:user_id`
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Deleted user"
    }
</details>
<details>
  <summary>Logout</summary>

#### Request :
`PATCH /users/logout`
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Deleted token"
    }
</details>

## Lessons routes 
<details>
    <summary>Get lesson by id</summary>

#### Request : 
`GET` /lessons/:lesson_id`

    example:http://[server_url]/lessons/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of lesson sent',
    }
</details>
<details>
    <summary>Get all lesson </summary>

#### Request : 
`GET` /lessons`

    example:http://[server_url]/lessons
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of lessons sent',
    }
</details>
<details>
    <summary>Create new lesson</summary>

#### Request :
`POST /lessons/`

        example:http://[server_url]/lessons/
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Created lesson"
    }
</details>
<details>
  <summary>Update lesson</summary>

#### Request :
`PATCH /lessons/:lessons_id/:user_id`

    example:http://[server_url]/lessons/1/12
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Updated lesson"
    }
</details>
<details>
  <summary>Delete lesson</summary>

#### Request :
`DELETE /lessons/:lessons_id/:user_id`

    example:http://[server_url]/lessons/1/12
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Deleted lesson"
    }
</details>

## Categories routes
<details>
    <summary>Get category by id</summary>

#### Request : 
`GET` /categories/:category_id`

    example:http://[server_url]/categories/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of category sent',
    }
</details>
<details>
    <summary>Get all categories </summary>

#### Request : 
`GET` /categories/`

    example:http://[server_url]/categories/
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of categories sent',
    }
</details>
<details>
  <summary>Create new categories</summary>

#### Request :
`POST /categories/`

    example:http://[server_url]/categories/
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Created categories"
    }
</details>

## Steps routes
<details>
    <summary>Get step by id</summary>

#### Request : 
`GET` /steps/:step_id`

    example:http://[server_url]/steps/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of step sent',
    }
</details>
<details>
    <summary>Get all step </summary>

#### Request : 
`GET` /steps`

    example:http://[server_url]/steps
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of steps sent',
    }
</details>
<details>
    <summary>Create new step</summary>

#### Request :
`POST /steps/`

        example:http://[server_url]/steps/
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Created step"
    }
</details>
<details>
  <summary>Update step</summary>

#### Request :
`PATCH /steps/:step_id`

    example:http://[server_url]/steps/1
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Updated steps"
    }
</details>
<details>
  <summary>Delete step</summary>

#### Request :
`DELETE /stepss/:steps_id`

    example:http://[server_url]/steps/1
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Deleted step"
    }
</details>

## Rates routes 
<details>
    <summary>Get rates by id</summary>

#### Request : 
`GET` /rates/:rate_id`

    example:http://[server_url]/rates/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of rate sent',
    }
</details>
<details>
    <summary>Get all rates </summary>

#### Request : 
`GET` /rates/`

    example:http://[server_url]/rates/
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of rates sent',
    }
</details>
<details>
  <summary>Create new rate</summary>

#### Request :
`POST /rates/:lesson_id/:user_id`

    example:http://[server_url]/rates/1/10
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "added rate"
    }
</details>

## Likes routes
<details>
    <summary>Get likes by id</summary>

#### Request : 
`GET` /likes/:like_id`

    example:http://[server_url]/likes/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of like sent',
    }
</details>
<details>
    <summary>Get all likes </summary>

#### Request : 
`GET` /likes/`

    example:http://[server_url]/likes/
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of likes sent',
    }
</details>
<details>
  <summary>Create new like</summary>

#### Request :
`POST /likes/:comment_id`

    example:http://[server_url]/likes/1
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "added like"
    }

## Comments routes
<details>
    <summary>Get comment by id</summary>

#### Request : 
`GET` /comments/:comment_id`

    example:http://[server_url]/comments/1
#### Reponse : 
    200 OK
    {
    'status': 'succes',
    'message': 'Data of comment sent',
    }
</details>
<details>
    <summary>Get all comments </summary>

#### Request : 
`GET` /comments`

    example:http://[server_url]/comments/
#### Reponse : 
    200 OK
    {
    status:'succes',
    message: 'Data of comments sent',
    }
</details>
<details>
    <summary>Create new comment</summary>

#### Request :
`POST /comments/`

        example:http://[server_url]/comments/
#### Response :
    200 OK
    {
        "status": "succes",
        "message": "Created comment"
    }
</details>
<details>
  <summary>Update comment</summary>

#### Request :
`PATCH /comments/:comments_id`

    example:http://[server_url]/comments/1
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Updated comment"
    }
</details>
<details>
  <summary>Delete comment</summary>

#### Request :
`DELETE /comments/:commentToDelete_id/:userWhoDelete_id`

    example:http://[server_url]/comments/1/12
#### Response :
    200 OK
    {
        "status": "success",
        "message": "Deleted comment"
    }
</details>
