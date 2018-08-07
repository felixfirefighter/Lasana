const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/passport")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Listening to port ${port}`));
