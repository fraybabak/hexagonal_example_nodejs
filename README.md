# Hexagonal Architecture example in Node.js using TypeScript
This is a simple example of Hexagonal Architecture in Node.js using TypeScript.
I made this example to show how to implement the Hexagonal Architecture in Node.js using TypeScript with my underestanding of the concept.

## What is Hexagonal Architecture?
Hexagonal Architecture is an architectural pattern that helps us to create applications that are more independent of the external world.
It is also known as Ports and Adapters Architecture or Onion Architecture.



## How to run the application

pre-requisites:

- Node.js
- npm
- prisma => `npm install -g prisma`


1. Clone the repository


2. Run `npm install`


3. cd into the `src/infrastructure/db` folder 
```
cd src/infrastructure/db

npx prisma migrate dev --name init
```


4. Run `npm run start` to start the application


5. Run `npm run test` to run the tests