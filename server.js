const express = require("express");
// const apiRoutes = require("./routes/apiroute");
const app = express();
// const htmlRoutes = require("./routes/htmlroute");
const PORT = process.env.PORT || 3002;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
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

// app.listen(PORT, () =>
//   console.log("App listening at http://localhost:${PORT}")
// );

app.get("../api/notes",(req, res) => {
  fs.readFile("../db/db.json", "utf8", (err, data) => {
    if(err) {
      console.error(err);
    } else {
      let notes = JSON.parse(data)
      res.json(notes)
    }
  })
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request to save notes received`);

  const newNote = req.body;
  newNote.id = uuidv4()
  fs.readFile("../db/db.json", "utf8", (err, data) => {
    if(err) {
      console.error(err);
    } else {
      let parseData = JSON.parse(data);
      parseData.push(newNote)
      fs.writeFileSync("../db/db.json", JSON.stringify(parseData), (err, data) => {
        console.error(err);
      })
    }
  })
});