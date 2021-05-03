## Description

A couple of weeks ago I was wondering what new things were in the Nodejs space. I started reading about some frameworks and discovered [Nest](https://github.com/nestjs/nest) - a Typescript-based framework that looked promising. I said to myself: "that looks amazing, now I just need a free weekend and a funny project". I just have had it both.

So here it is, my first Nest project: a Pokepedia.  


Once run -using npm or docker-, go to `http://localhost:3000` to get information about the endpoints.
  
## Running the app via Node/Npm

Please make sure you have your [Node and NPM](https://www.npmjs.com/get-npm) environment properly set.


```bash
# installing dependencies
$ npm install

# running the app
$ npm run start

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```


## Running the app via Docker
Once you have your [Docker / Docker Compose](https://docs.docker.com/compose/install/) set, you can run:

```
$ docker-compose up -d
```

## Development
I have two modules `AppModule` and `TranslationModule`. 

`TranslationModule` contains all the elements related to the translation -services, interfaces, etc-.
`AppModule` contains all the elements related to the main app -controllers, providers, services and interfaces-.

In the main module, I am calling `Provider` to a class that retrieves data -like a repository, dao, or ...-. And `Service` to the rest of classes that handles the data.

## TODO list
Here are some items I would like to complete when I get some time again:
- [ ] Refactor translation service. My translation services can share code. Lets say, writing a new `FunTranslationService.get(path, text)` to handle the `success` cases.
- [ ] I wrote a v2 controller to handle both use cases (`get` and `getTranslated`) using a single function. Nice. But I am using a path-versioning approach. I wanted to send the version in the header instead but didn't find a built-in decorator in Nest. Next time I will build my own.
- [ ] The app runs in port 3000 by default (:/). It needs to be changed in order to be deployed. Btw, that is another thing I want to try: deploying a nodejs app to Firebase as Function.
- [ ] Tests. Add more. Some services are not tested.
- [ ] Move each class/interface to its own file. Basic.
