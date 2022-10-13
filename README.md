# MERN auth client

# Client Installation instructions

To run Pod Cats on your local machine, first fork and clone this repository. Then follow these steps:

* In your terminal, navigate to the cloned repository. Run the command ```npm -install```  or  ```npm i```
to install all of the packages needed to run the app.

* You will need to add a local file for functionality. In your terminal in the same location as above, run the following command: ```touch .env.local``` 
* In the ```.gitignore``` file, add ```.env.local```

* In the ```.env.local``` file, you need to set your router variable. Enter the following:
 ```
 REACT_APP_SERVER_URL=http://localhost:8000
 ``` 

* You're all set! run the command ```npm run start``` in your cloned repository and your client is ready to go.
* Make sure your server is running as well.
* Enjoy!

# Server Installation instructions

To run Pod Cats on your local machine, first fork and clone this repository. Then follow these steps:

* In your terminal, navigate to the cloned repository. Run the command ```npm -install```  or  ```npm i```
to install all of the packages needed to run the app.

* You will need to add a gitignore file for your node modules. In your terminal in the same location as above, run the following command: ```node_modules >> .gitignore```
* In the ```.gitignore``` file, add ```.env``` to keep environmental variables off of github

* In the ```.env``` file, you need to set your ```PORT``` variable and your ```JWT_SECRET``` (this can be whatever you want). Enter the following:
 ```
JWT_SECRET='<whatever secret>'
PORT=8000
 ``` 

* You're all set! run ```nodemon``` in your cloned repository and your server is ready to go.
* Make sure your client is running as well
* Enjoy!