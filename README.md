# Prerequisites
## Mysql
This project uses MySQL as the database.
- Install Docker.
- Pull the MySQL image.
- Start the MySQL container.

You can use sample.sql located in the root of the project to set up the database for testing purposes.

## NodeJS and ExpressJs
The project works well with:
- NodeJs: v16.16.0
- ExpressJs: ^4.19.2
- Sequelize: ORM tool MySQL

Typescript is used for type safety

# Installation
Install all dependencies

```
npm install
```

## Available endpoints
### <a name="ep-register"></a>Register a new user
To register a new user.

Method: GET

URL: api/v1/auth/register

Body: 
```
{
    "username": "ducnguyen8",
    "password": "HCM@City89"
}
```
Response:
```
{
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 33,
            "username": "ducnguyen8",
            "updatedAt": "2024-06-27T08:07:42.692Z",
            "createdAt": "2024-06-27T08:07:42.692Z"
        }
    }
}
```

Example CURL:
```
curl --location 'http://localhost:3000/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "ducnguyen8",
    "password": "HCM@City89"
}'
```

### <a name="ep-login"></a>Login
To log in with the new user's credentials and obtain an access token.

Method: POST

URL: api/v1/auth/login

Body: 
```
{
    "username": "ducnguyen8",
    "password": "HCM@City89"
}
```

Response:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1Y25ndXllbjYiLCJpYXQiOjE3MTk0NzU2NzgsImV4cCI6MTcxOTQ3OTI3OH0.gRqsiKa2YknsJ_PFrTEhYaJg6JVYDoFxS6ILyxPri1Y"
}
```

Example CURL:
```
curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "ducnguyen8",
    "password": "HCM@City89"
}'
```

### <a name="ep-get-user"></a>Get user basic information
To get the basic information from a user.

Method: GET

URL: api/v1/user

Header:
- Authorization: (user token)

Response: 
```
{
    "user": {
        "id": 33,
        "username": "ducnguyen8",
        "createdAt": "2024-06-27T08:07:42.000Z",
        "updatedAt": "2024-06-27T08:07:42.000Z"
    }
}
```

Example CURL:
```
curl --location 'http://localhost:3000/api/v1/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1Y25ndXllbjYiLCJpYXQiOjE3MTk0NzU2NzgsImV4cCI6MTcxOTQ3OTI3OH0.gRqsiKa2YknsJ_PFrTEhYaJg6JVYDoFxS6ILyxPri1Y'
```

# Use
Follow these steps to test all APIs

1. Use [Register API](#ep-register) to register a new user with 
2. Use [Login API](#ep-login) to log in with the new user's credentials and obtain an access token.
3. Use [Get user API](#ep-get-user) to retrieve user information using the access token.