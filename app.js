const express = require("express");
const app = express()
app.use(express.json());
const pool = require("./db")



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

// Get all users
app.get("/users",async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users ORDER BY id");
        res.json(result.rows);
    }catch(err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// Get user by ID
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

// Insert new user
app.post("/users", checkApiKey,async(req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    if (!name){
      return res.status(400).send("Please enter your name")
    }
    try {
        const result = await pool.query("INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",[name,age])
        res.status(201).json({data: result.rows[0], message:"User added successfully"})
    } catch(err) {
        res.status(500).send("Database error: "+ err.message)
    }

})

// update a user
app.patch("/users/:id", checkApiKey, async (req,res) => {
    const id = Number(req.params.id);
    const name = req.body.name;
    const age = req.body.age;
    try {
        const result = await pool.query("UPDATE users SET name = COALESCE($1,name) ,age = COALESCE($2,age) WHERE id = $3 RETURNING *",[name, age, id]);
        if (result.rows.length ===0) {
            res.status(404).send("User does not exist");
        }
        else {
            res.status(200).json({data: result.rows[0], message: "Updated successfully!"});
        }
    } catch(err) {
        res.status(500).send("Database error : "+err.message);
    }
});





// delete a user
app.delete("/users/:id",checkApiKey, async (req,res) => {
    const id = Number(req.params.id)
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",[id]);
        if (result.rows.length ===0) {
            res.status(404).send("Could not find the user!")
        }
        else {
            res.status(200).json({data: result.rows[0], message: "User deleted from data base successfully"})
        }
    } catch(err) {
        res.status(500).send("Database error : "+err.message)
    }

})




app.listen(4000, () => {
        console.log("Server is running on port 4000");
        }); 