## RESTful API with NodeJS and MongoDB
***
Basic NodeJS and MongoDB RESTful API. This project allows to create, get, update and delete users (with email and password attributes). If you want to test the code you need to follow this steps:

* Clone this repository.
* Install and setup MongoDB and NodeJS.
* Open a terminal at the project folder and do a ``npm install``.
* Execute ``npm start``.

Now, using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) or your favorite REST simulator, you can work with the following requests:

* **GET** [localhost:3000/users](localhost:3000/users): get all users.
* **POST** [localhost:3000/users](localhost:3000/users): create a new user passing *"email"* and *"password"* attributes in JSON format.
* **GET** [localhost:3000/users/:id](localhost:3000/users/:id): get an user by its identifier.
* **PUT** [localhost:3000/users/:id](localhost:3000/users/:id): update an existing user passing the new *"email"* and *"password"* attributes in JSON format.
* **DELETE** [localhost:3000/users/:id](localhost:3000/users/:id): delete an user by its identifier.

***

*This code was created following [this post](https://codeforgeek.com/2015/08/restful-api-node-mongodb/).*
