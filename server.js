const express = require("express");
// const apiRoutes = require("./routes/apiroute");
const app = express();
// const htmlRoutes = require("./routes/htmlroute");
const PORT = process.env.PORT || 3002;
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/", htmlRoutes);
// app.use("/", apiRoutes);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log("App listening at http://localhost:${PORT}")
);
