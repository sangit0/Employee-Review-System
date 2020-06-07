# Full Stack Developer Challenge

This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

# Employee Review System

### Techstack

- React.js
- Express.js
- MongoDB
- Graphql

# Features & Implemented Module

1. Add/remove/update/view employees
2. Add/update/view performance reviews
3. Assign employees to participate in another employee's performance review
4. List of performance reviews requiring feedback (only employee access)
5. Submit feedback (only employee access)
6. Role base Access reusable access module for both frontend and backend.
7. Mongo DB Seeder for testing
8. Login and Register module for user

### In this project, we have 2 roles where every role has some specific feature. Every query in this project is using GraphQL including user authentication and role based access. The project using a boilerplate created by me which is using stack of Express-GraphQL-Mongo (https://github.com/sangit0/Express-graphql-mongodb-boilerplate).

## How to use the Seeder Commands

### Before running the seed or running the backend copy .env.example to .env and setup your Database information.

    ``` bash
            #cd to backend folder
            yarn md-seed run
            #for dropping the database
            yarn md-seed run --dropdb
    ```

### Login (if you use DB seed)

    user: admin@sangit.info  (admin user)
    pass: secret

    user: user2@gmail.info  (normal user)
    pass: secret

### Screenshots

![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/login.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/create-employee.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/assign-employee.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/performance-page.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/edit-performances.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/submit-review-1.png "Screenshot")
![alt text](https://github.com/sangit0/FullStackEngineerChallenge/blob/master/screenshots/submit-review-2.png "Screenshot")
