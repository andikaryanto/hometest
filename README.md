## HOW TO INSTALL
- ### Requirements
    * php 8.1 (i recomend to use laragon if you use windows, easy to setup)
    * nodejs
    * mysql 5 or 8 (i use 8) 
- ### clone the repository
    > git clone git@github.com:andikaryanto/hometest.git
    git checkout home-test
- ### Host your application
    - if you use laragon, just place the whole respository to C://laragon/www/{your app}, laragon will auto create a host for this application
    - use php server
        > *$ php -S localhost:9090* // what ever you want

- ### Change the .env
    i included the .env file so you need to chage database connection
    >   DB_CONNECTION=mysql
        DB_HOST=*{YOUR DATABASE HOST}*
        DB_PORT=*{DATABASE PORT}*
        DB_DATABASE={DATABASE NAME}
        DB_USERNAME={DATABASE USER}
        DB_PASSWORD={DATABASE PASSWORD}
- ### Install yarn / npm
    You need to install nodejs, i use nodejs 16, you can try for 14 (might work). Once nodejs installed, i suggest to use yarn to "run" javascript dependency.
    * ##### install yarn globally
        > *$ npm install -g yarn*
- ### install javascript dependency
    Go to root application and install using
    > *$ yarn install*
- ### Install dependecy using composer
    Go to root application and install using
    > *$ composer install*
- ### Run migration
    > *$ php artisan migrate*
- ### Run query
    i have couple of master data, i dont use seeder, seeder is for the test purpose only.
    open *defaultdata.sql* and run the query
    
- ### Change the react config file 
    Sorry i have not found a way to make it simple.
    Go to *resources\js\Common\Config.jsx* and it should look like:
    > export default {
        api_url: 'http://hometest.test/api', // change this to your application host url
        web_url: 'http://hometest.test' // change this to your application host url
    }

    so i use client side ReactJs to build the UI, now you can change the url as your php server to run. i recommend to use laragon with php 8.1
- ### Build the UI template
    > *$ yarn build*


## How To Play
- ### Application
    Type url application:
    * {base_url} (change with hosted url you run) -> is the root of reservation, customer or admin can login here
    * when you are a customer you can register / login
    * click Sign Up button to register as a customer
    * clicj on Sign In button if you already a customer / admin
    * we have default data for that
        > *andik@test.com:password123* is default admin account
        *zuran@test.com:password123* is default customer account

    #### login to admin dashboard
        you can open a simple dashboard and see reservations have been created there
        > {base_url}/login
        > {base_url}/admin -> is root of admin page

- ### Technical
    i designed the base core of my application with a "package". if you look into composer.json there will be dependency called *andikaryanto11/laravelcommon*
    - #### Dependency used (php)
        * *andikaryanto11/laravelcommon*
        * *andikaryanto11/graphql* // not really need this right now
        * https://github.com/phpspec/prophecy

    - #### Unit Test
        i use https://github.com/phpspec/prophecy to run my unit test

        ##### run the test
        you will find files named {Class}Test.php, those are classes that is used to test the logic
        > *$ vendor/bin/paratest*
- ### How the application works
    it's just simple app i made for the submission test (sorry i dont have much time to complete everything within 2 days)
    
    - #### Customer online reservation
        - Open your {base_url} in browser
        - Login / Register
        - Fill the Date reservation
        - Choose table to be reserved
        - Type reservation for name
        - Click submit button
        this will create a reservation to a customer / user

    - #### Customer Offline reservation
        it's all the same way like online reservation (the same UX will be used)
        - Login as admin user
        - Fill the Date reservation
        - Choose table to be reserved
        - Type reservation for name
        - Click submit button

    - #### Handle race condition
        when a user submit a reservation, it will create a reservation data to 'table_reservations' table, the process is when application processing the data, it will check the 'tables' table is being reserved or not, when it's not UnitOfWork will update the database table 'tables' with is_reserved to true. and in the next request if a user submit reservation will do the same, so when the request try to submit a reserved "tables" data, it throw an error to tell if table is being reserved

    - #### Api Docs
        please checkout *routes\api.php*. i know it's poor doc. but i tried to make my code clean, i separate all api endpoint to a file (DDD design).      
        ##### the pattern:

        * {base_url}/api/table_reservations (GET) -> will reffer to 'getAll' method in controller, using plural name to indicate return of collection of table_reservations table data
        * {base_url}/api/table_reservation (POST) -> will refer to 'store' method (with no path parameter), means it store singular data to a table in this case is table_reservations
        * {base_url}/api/table_reservation/{tableReservation} (GET) -> will refer to 'get' method in controller and will return single row data of table_reservations with ID as /{tableReservation}.
        * {base_url}/api/table_reservation/{tableReservation} (PACTH) -> will refer to 'pacth' method in controller and will pacth single row data of table_reservations with ID as /{tableReservation} and then return it
        * {base_url}/api/table_reservation/{tableReservation} (DELETE) -> will delete the data from table_reservations with ID as /{tableReservation}

        there is other possible naming here because of 'business' the company run, and still it's customable. 

- ### Advance clean code (tried hard) 
    this is what i build:
    everything in this DDD principles, i follow how i create the tables of database
    so every file is following the name of the table
    example:
    - i have table name called "table_reservations" and the other tables, so i will have:
        * TableRerservation (app\Models\TableReservation.php) model
        * TableReservationController (app\Http\Controllers\TableController.php) this is where i handle data after it's "validated" with a
        laravel resource pattern, i usually have get, getAll, store, patch, delete methods for a complete life cycle of a data, it will be the same if we have another tables
        * TableReservationHyratorMiddleware (app\Http\Middleware\Hydrators\TableReservationHydratorMiddleware.php)
         hydrator use usefull when we do http request, what is used for:
            
            - it will hydrate http request post body to an entity in this case is TableReservationModel and will passed it to controller
            - it will hydrate http request get to an entity in this case is TableReservationModel like when /table-reservation/{tableReservation}, it will find the data from a table (/table-reservation/1) with ID 1
            and will pass it to controller
            - it will hydrate http patch request, it will find the data with the ID 1 (/table-reservation/1) and modify the field with in the body from request then pass it to controller
        * TableReservationQuery (app\Queries\TableReservationQuery.php) it is a query builder with Entity / Model base, so when we join with another table, and resulted 2 but the same, it will return distincted Model data.
        * TableReservationRepository (app\Repositories\TableReservationRepository.php)
        * TableReservationRoute (app\Routes\TableReservationRoute.php) this where i put routing within it's Domain Driven
        * TableReservationViewModel (app\ViewModels\TableReservationViewModel.php), this where json resource will be created and returned with its all related table data
        * TableReservationCollection (app\ViewModels\TableReservationCollection.php) same as view model it's just collection of that viewmodel

- ### We might need to talk a lot if we talk about clean code design.
    lets talk :).

- ### The application does not work?
    lest talk more :)


