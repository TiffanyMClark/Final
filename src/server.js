const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);
// knex has a render issue? build is fine but it wont deploy..
// nneed to run migrations if the database is defined

if (process.env.DATABASE_URL) {
  knex.migrate
    .latest()
    .then((migrations) => {
      console.log("migrations", migrations);
      app.listen(PORT, listener);
    })

    .catch(console.error);
} else {
  app.listen(PORT, listener);
}
