const express = require('express');
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json"); /////
const { uuid } = require('uuidv4');

const PORT = process.env.PORT || 3001;

const app = express();

// Middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
}) 

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// API notes
app.get("/api/notes", (req, res) => {
// res.sendFile(path.join(__dirname, './db/db.json'))
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)

    db.push({
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    });

    console.log(db)

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if(err) {
            res.send("Something bad happened")
        }

        res.send("test")
    }
    )

})


app.listen(PORT, () => {
    console.log(`Server is now listening...${PORT}`);
});