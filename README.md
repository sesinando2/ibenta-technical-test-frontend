# Ibenta Technical Test (Frontend)

Welcome to the Ibenta Technical Test for Frontend Developers. Please make sure you have access to this repo.

#### To do this test:
You can either use this template from creative-tim (see details below) or create a new template of your liking. But it should:
1. Run on `npm 6` and `node 10`
1. Should be based on `Vuejs`
1. Should use `Bootstrap` whether its applied manually or using Bootstrap Vue plugin.

If you choose to use this template:
1. Fork this repo to your github account.
1. Create a branch: `feature/<Your Name in Kebab Case>-<Todays Date>` e.g. `feature/john-smith-25-09-2020`
1. Push all your changes in that branch.
1. When you're done with the test, create a pull request.
1. Send me the link of your pull request. Make sure I have access to your repo and PR.
1. Please also indicate the local path of your page for this test.

If you choose to use a different template:
1. Only bush the base template to master.
1. Create a branch: `feature/<Your Name in Kebab Case>-<Todays Date>` e.g. `feature/john-smith-25-09-2020`
1. Push all your changes in that branch.
1. When you're done with the test, create a pull request.
1. Send me the link of your pull request. Make sure I have access to your repo and PR.
1. Please also indicate the local path of your page for this test.

---

#### Level 1:
1. Create a page.
1. In that page create a form with the following fields:
    1. `Username` - This is a required text field.
    1. `Email` - This is a required email field. This should only contain a valid email value.
    1. `First Name` - This is a required text field.
    1. `Last Name` - This is a required text field
    1. `Password` - This is a required password field.
1. Add a help text for each field.
1. Also add a text place holder on each field.
1. Add a validation for the fields. Please refer to the field definition above.
1. Add a submit button. Clicking this button will display an alert/notification that the user has been added.

---

#### Level 2:
1. Do all the steps in Level 1 but make use of Vue components and reuse as much as possible including the validation logic.
1. Create a table below the form that will display all the users that has been created.
1. Implement a delete functionality that will remove previously added user.
1. When the table is empty, display a message indicating the user that they need to add a user first.
1. Implement an edit functionality that will allow user to edit existing users from the table.

Bonus: Implement some form of automated testing.

---

#### Level 3:
1. Do all steps in Level 1 & Level 2
1. Implement an API client with the following details:
    * Base URL is `http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api`
    * Will use `OAuth2` for security. OAuth2 details are as follows:
        * Grant Type: `Client Credentials`
        * Access Token URL: `http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/oauth/token`
        * Client ID: `AITWD1zyBVuPWgn4ZBHSREtXJDZXL9Lt`
        * Client Secret: `ELEGpyarKD0OWDrzfiqWqmpkOb4FSKnb`
        * Scope: `read write`
1. Use this client to:
    1. Create new users:
        * Request: `POST http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users`
        * Request Body:
            ```
                {
                    "name": "jon.jones@ibenta.com.au",
                    "firstName": "Jon",
                    "lastName": "Jones",
                    "email": "jon.jones@ibenta.com.au"
                    "password": "Password1"
                }
            ```
        * Response: `HTTP 201`
        * Response Body: Note ignore permission, roles, groups and organisation
            ```
                {
                    "name": "jon.jones@ibenta.com.au",
                    "permissions": [],
                    "firstName": "Jon",
                    "lastName": "Jones",
                    "email": "jon.jones@ibenta.com.au",
                    "password": null,
                    "roles": [],
                    "groups": [],
                    "id": 79,
                    "organisation": null
                }
            ```
    1. Update existing users:
        * Request: `PUT http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users/{id}`
        * Request Body:
            ```
                {
                    "name": "jon.jones@ibenta.com.au",
                    "firstName": "Jon",
                    "lastName": "Jones",
                    "email": "jon.jones@ibenta.com.au"
                    "password": "Password1"
                }
            ```
        * Response: `HTTP 200`
        * Response Body: Note ignore permission, roles, groups and organisation
            ```
                {
                    "name": "james.jones@ibenta.com.au",
                    "permissions": [],
                    "firstName": "Jon",
                    "lastName": "Jones",
                    "email": "jon.jones@ibenta.com.au",
                    "password": null,
                    "roles": [],
                    "groups": [],
                    "id": 79,
                    "organisation": null
                }
            ```
    1. Delete existing user:
        * Request: `DELETE http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users/{id}`
        * Response: `HTTP 204`
    1. List all users:
        * Request: `GET http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users`
        * Response: `HTTP 200`
        * Response Body: Note ignore permission, roles, groups and organisation
            ```
                {
                    "content": [
                        {
                            "name": "jon.jones@ibenta.com.au",
                            "permissions": [],
                            "firstName": "Jon",
                            "lastName": "Jones",
                            "email": "jon.jones@ibenta.com.au",
                            "password": null,
                            "roles": [],
                            "groups": [],
                            "id": 79,
                            "organisation": null
                        }
                    ],
                    "pageable": {
                        "sort": {
                            "sorted": false,
                            "unsorted": true,
                            "empty": true
                        },
                        "pageSize": 20,
                        "pageNumber": 0,
                        "offset": 0,
                        "paged": true,
                        "unpaged": false
                    },
                    "totalPages": 1,
                    "totalElements": 1,
                    "last": true,
                    "first": true,
                    "sort": {
                        "sorted": false,
                        "unsorted": true,
                        "empty": true
                    },
                    "numberOfElements": 1,
                    "size": 20,
                    "number": 0,
                    "empty": false
                }
            ```

Bonus: Implement pagination.


# [Vue Paper Dashboard](https://cristijora.github.io/vue-paper-dashboard/)

> Admin dashboard based on paper dashboard UI template + vue-router

This project is a vue version of [Paper-dashboard](https://www.creative-tim.com/product/paper-dashboard)
designed for vue js.The dashboard includes vue-router

Check the [Live Demo here](https://cristijora.github.io/vue-paper-dashboard).

[Nuxt Version (outdated Bootstrap 3)](https://github.com/cristijora/vue-paper-dashboard-nuxt)
![](http://i.imgur.com/3iC1hOs.gif)

## Documentation
Link to [Documentation](http://vuejs.creative-tim.com/vue-paper-dashboard/documentation/)

## Build Setup

### install dependencies
```
npm install
```
### serve with hot reload at localhost:8080
```
npm run dev
```
### build for production with minification
```
npm run build
```
### lint
```
npm run lint
```
## Contribution guide
* Fork the repository
* `npm install` or `yarn install`
* Make changes
* Open Pull Request

For detailed explanation on how things work, checkout the [guide](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)
- [CHANGELOG](./CHANGELOG.md)
- [version-badge](https://img.shields.io/badge/version-2.0.0-blue.svg)
- [license-badge](https://img.shields.io/badge/license-MIT-blue.svg)

## License

[MIT](https://github.com/cristijora/vue-paper-dashboard/blob/master/LICENSE.md)
