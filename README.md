# cuddly-engine

nodejs-barebones-stack combined with express for a basic api backend.

## What's in the stack

- Unopinionated, web framework with [Express](https://expressjs.com/)
- Modern javascript runtime with [Node.js](https://nodejs.org/en/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Cold reloading in development with [Nodemon](https://nodemon.io/)

## Scripts overview

- Installs necessary dependencies then compiles project with `npm run build` into `/dist` directory, cleaning the folder first.

```sh
 npm install
```

- Starts the application in development using **nodemon** and **ts-node** for cold reloading.

```sh
 npm run start:dev
```

- Starts the application in production by compiling the project with `npm run build`, then executing the compiled javascript at `dist/index.js`.

```sh
 npm run start:prod
```
