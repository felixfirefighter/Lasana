const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/passport")(app);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Listening to port ${port}`));
