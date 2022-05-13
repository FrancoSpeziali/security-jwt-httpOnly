# Handling JWT Tokens in the frontend (httpOnly cookie)

This assignment will allow you to experience handling JWT in the frontend, via httpOnly cookies

## What you will be doing

For this assignment you will have to:

1. Setup cookie-parser and other middleware
2. Finish writing the controllers
3. Sending the jwt token as a httpOnly cookie
4. Setting up the frontend to handle the httpOnly cookie
5. Setting up passport.js as the authorisation middleware

## Folder Structure

The `/client` subfolder contains the **create-react-app** frontend build

When you run `node server.js`, all requests which are not handled by **express** will automatically be forwarded to the production **React** application in the folder `/client/build`

You can view the frontend here [http://localhost:3001/](http://localhost:3001/)

## Getting Started

```bash
npm run setup
```

This will install the `npm` dependencies for both server and client

```bash
npm run build
```

This will build the production version of the **React** client

## Tasks

### Task 1 - Setting up the .env file

1. Using the `.env.example` file as a template, create a `.env` file

2. Add your database connection details to your `.env` file, filling in the details as provided to you by MongoDB
   > Hint: The key `DB_NAME` points to the name of the database you want to connect to. Use the name `db-validation`. This will ensure that Mongoose will try and use the existing sample dataset you previously set up.

   > Hint: The key `DB_HOST` is the **domain** of your MongoDB connection string

### Task 2 - Installing extra dependencies

1. Install the [cors](https://www.npmjs.com/package/cors) npm package
2. Install the [cookie-parser](https://www.npmjs.com/package/cookie-parser) npm package

### Task 3 - Creating the middleware stack

Add the following packages to your middleware stack;

1. `cors`
2. `cookie-parser`
3. `express.json`

> Remember to run your middleware before any of your routes!

### Task 4 - Allowing the 'credentials' header with CORS

1. Modify your `cors()` middleware to use the following object
```javascript
{
    credentials: true
}
```

This configures the **Access-Control-Allow-Credentials** CORS header. Set to true to pass the header, otherwise it is omitted.

### Task 5 - The registration controller

For your convenience, all routes and endpoints have been created. However, you must complete the controller logic for the endpoints

Complete the controller for the `/registration` endpoint. The controller should;

1. Take the registration information from the client **request** body object
2. Check to make sure the **username** is available
3. Use **bcrypt** to create a hash of the password
4. Create a new user if all the expected details are applied

> Hint: Make sure to check the `user` schema to see what information is required!

### Task 6 - The login controller

Complete the controller for the `/login` endpoint. The controller should;

1. Take the login information from the client **request** body object
2. Check to make sure the user exists
3. Use **bcrypt** to verify the password matches with the user hash from the database

### Task 7 - Sending the JWT token from server to client

We would like the client to receive the JWT token, after a successful login

In your login controller, after you have validated that the user has provided the correct login details;

1. Generate a JWT token using the provided JWT helper
2. Send the token back to the client using a httpOnly cookie
3. Test your endpoint so ensure that the cookie (with the token) is being sent to the client

> Hint: To attach a cookie to the client response, you can use the **response** method `cookie`, for example:
> ```javascript
>   cookie('jwt', jwtToken, {
>      httpOnly: true,
>      secure: false,
>      sameSite: 'lax'
>   })
> ```

### Task 8 - Setting up our frontend to receive the cookie

In your frontend, `Login` component, modify the server request so that it has the credentials

1. Decide whether to use ES6 `fetch` or the `axios` library
   > Hint: If you wish to use `axios`, you need to run `npm i axios` from your `/client` folder
2. Modify your request to point to the URL for the backend endpoint
3. Modify your request so it is of type `post`
4. Modify your request so that it sends the httpOnly cookie

> Hint: For a **fetch** request, you need to use the `credentials` option
> ```javascript
> credentials: 'include'
> ```

> Hint: For an **axios** request, you need to use the `withCredentials` option
> ```javascript
> withCredentials: true
> ```

### Task 9 - Test that the cookie with the JWT is returned when logging in

Run the frontend in your browser

1. If you haven't already, create a new user which you can login with
2. Open the **network** tab in your developer tools
3. Login
4. Monitor that the **response** from the server includes the cookie

### Task 10 - Using passport.js

We would like the option to authorise certain requests from the user

1. Use **npm** to install the `passport` and the `passport-jwt` package
2. Initialise the passport middleware and apply it to your middleware stack

### Task 11 - Setup passport.js to read the token from the httpOnly cookie

1. Configure passport.js with the `passport-jwt` strategy

> Hint: We need to tell `passport-jwt` that our jwt token is available from the cookie
> Configure the JwtStrategy to use the following line:
> ```javascript
> jwtFromRequest: (request) => request.cookies.jwt
> ```

2. Use `passport` to ensure that the **user** details are attached to the **request** object
   > Hint: Here you can import your `User` model and search for the user using the mongoose `findById()` method with the `id` of the user from the cookie

3. Setup passport to use the new configuration

### Task 12 - Adding the auth middleware to the profile route

1. Add the passport middleware to the `/profile` route

### Task 13 - Completing the profile controller

Complete the controller for the `/profile` endpoint. The controller should;

1. Read the **user** details from the **request** object 
2. Return the user details to the client as part of the **response**

### Task 14 - Complete the Profile React component

In the following file `client/src/components/Login/index.js`;

1. Complete the component so that it requests the profile from the backend
2. Ensure that your request sends the httpOnly cookie credentials with the request, like you did in **Task 8**
3. Display the results on the page

### Task 15 - Test everything!

Test that everything works, and that after logging in, a user can make a request to a route that requires authorisation!