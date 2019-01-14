# grocery-buddy-server

Basic API with user AUTH for different user types for a grocery list app. 
The database for grocery items is seeded from a csv from the Open Grocery Database Project (http://www.grocery.com/open-grocery-database-project/)

Before running the server, first install the NPM packages `npm install`

To run the migrations and seeders, install the sequelize CLI `npm install -g sequelize-cli` 

Migrate `sequelize db:migrate`

Seed `sequelize db:seed:all`

Finally, run the server `npm run server`
