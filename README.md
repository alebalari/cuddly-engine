# Barebones Node.JS Stack
A barebones stack that can be extended as a basis for backend frameworks. 
 
## What's in the stack
- Modern javascript runtime with [Node.js](https://nodejs.org/en/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Cold reloading in development with [Nodemon](https://nodemon.io/)

## Scripts overview

- Builds the application for production in `/dist` directory, cleaning the folder first.
 ```sh
  npm run build
  ```

- Starts the application in development using **nodemon** and **ts-node** for cold reloading.
 ```sh
  npm run start:dev
  ```
  
 - Starts the application in production by compiling the project with `npm run build`, then executing the compiled javascript at `dist/index.js`.
 ```sh
  npm run start:prod
  ```
