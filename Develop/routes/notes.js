const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Route loads stored notes and places them on the page.
notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});


notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile("./db/db.json", (err, data) => {
      if (err) {
        throw err;
      } else {
        parsedData = JSON.parse(data);
        parsedData.push(newNote);
        strData = JSON.stringify(parsedData);
        fs.writeFile("./db/db.json", strData, (err) => {
          if (err) {
            throw err;
          } else {
            fs.readFile("./db/db.json", (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.json(JSON.parse(data));
              }
            });
          }
        });
      }
    });
  } else {
    res.error("Error saving note.");
  }
});


notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      parsedData = JSON.parse(data);
      filteredData = parsedData.filter((note) => note.id !== id)
      strData = JSON.stringify(filteredData)
      fs.writeFile("./db/db.json", strData, (err) => {
        if (err) {
          throw err;
        } else {
          fs.readFile("./db/db.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.json(JSON.parse(data));
            }
          });
        }
      });
    }
  });
});

module.exports = notes;

