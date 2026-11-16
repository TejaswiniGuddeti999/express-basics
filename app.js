const express = require("express");
const app = express()
app.use(express.json());
const pool = require("./db")
// const jwt = require("jsonwebtoken")



app.use( (req, res, next) => {
    console.log([req.method, req.url, new Date().toLocaleTimeString()]);
    next();
})

const checkApiKey = (req, res, next) => {
  if (req.headers["x-api-key"] === "secret123") {
    next();
  }
  else {
    res.status(401).send("Invalid or missing API key");
  }
};



app.get("/", (req, res) => {
    res.send("Nothing much to say")
})


app.get("/users",async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users ORDER BY id");
        res.json(result.rows);
    }catch(err) {
        res.status(500).send("Database error: " + err.message);
    }
});

app.get("/users/:id", async (req,res) => {
    const id = Number(req.params.id);
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length ===0 ){
            res.status(404).send("User doesnt exist")
        }
        else{
            res.json(result.rows[0]);
        }
    } catch(err) {
        res.status(500).send("Database error: "+ err.message)

    }
    

})

app.post("/users",checkApiKey, (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({users:users, message: "User addeed successfully"})
    
})

// add a user
app.get("/users/:id", (req,res) => {

    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id)
    if (!user){
        res.status(404).send("User does not exist")
    }
    else {
        console.log(id);
        console.log(user);
        res.send(user);
    }
    
});

// update a user
app.patch("/users/:id", checkApiKey, (req,res) => {
    const id = Number(req.params.id)
    const updField = req.body
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
        res.status(404).send("User does not exist")
    }
    else {
        users[index] = { ...users[index], ...updField}
        res.status(200).json({
            user: users[index], 
            message: "Edited successfully"
        })
    }
})

// delete a user
app.delete("/users/:id",checkApiKey, (req,res) => {
    const id = Number(req.params.id)
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
        res.status(404).send("User does not exist")
    } 
    else {
        users.splice(index,1)
        res.status(200).send("User deleted successfully")
    }
})




app.listen(4000, () => {
        console.log("Server is running on port 4000");
        }); 