# Super Endpoint Challenge

A simple endpoit to manage a catalog of mobiles, order and customer

## Starting-up 🚀

_Follow the next steps to run the project_

### Installing 🔧

Download project: 

```bash
# From Source
git clone https://github.com/erniker/endpoint-challenge.git
cd contactApp
```

Then install dependencies:

```bash
yarn install
```
You need configure a .env file in ./src. You can use .env.example.


You need have an a postgres db called contactApp. You could use dockers by typing a command like this:
```bash
docker run --name endpointChallenge -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432
```

And now, make migrations:
```bash
yarn db:migration:create first-migration
```
After this:
```bash
yarn db:migration:run
```
And, in order to avoid compilation errors:
```bash
yarn db:migration:to-js
```

## Running app ⭐

To run in dev mode:
```bash
yarn start:dev
```

## Running tests ⚙️

- You must to create the DB contactsApp-test to run all the behavioural tests there

- Run `yarn test:unit` to get the unit tests executed
- Run `yarn test:behaviour` to get the behavioural tests executed
- Run `yarn test:unit:cov` to get a unit test coverage report
- Run `yarn test:cov` to get a full coverage report

## Docker 🐋

You can dockerize the app using de Dockerfile and Docker-compose files, running the follow comands:
```bash
docker-compose build
docker-compose up -d
```

To stop container:
```bash
docker-compose stop
```

To delete container:
```bash
docker-compose down
```



## Built with 🛠️

* [NodeJS](https://nodejs.org/es/) - A JavaScript runtim
* [NestJS](https://nestjs.com/) - A progressive Node.js framework

## Author ✒️
* **José Pablo Medina Grande** - [erniker](https://github.com/erniker)

## Acknowledgement 🎁

* To Frzurita, who taught me almost everything I know. -> Frzurita.https://github.com/Frzurita)


---
⌨️ con ❤️ por [erniker](https://github.com/erniker) 😊
