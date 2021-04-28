# EntryPointApp

Sample registration and login flow with welcome page. Build with Angular and Boostrap. Using IndexedDB to store user data. After login it stores user id in the session storage.

App preview can be found under this address: https://eloquent-visvesvaraya-fd5d87.netlify.app/

## Running the application

This instruction assume you have `node` of version 14+ already installed on your machine.

1. Clone the repository

`https://github.com/Stajgar/entry-point-app.git`

2. Install the dependencies

`npm install`

3. Start development server

`ng serve`

Application should be running on `http://localhost:4200/`

## Fields for improvement

- storing session in the session storage is not secure and I would look for another solution (it was enough given scope of this application but wouldn't do this in real application)
- password stored in the IndexDB should be encrypted
- in the real world application when someone is trying to register with email which was already used to create account we probably shouldn't tell them that this email was already used. Instead we could send email to owner informing that someone is trying to use his email to register password
- there are certain parts of code which could probably be extracted to separate methods or shared components

## Acknowledgements

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.
