const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;


// middlewares
app.use(cors());
app.use(express.json());

// Database Connection
const uri = `mongodb+srv://shubrato:mbPNYSCJ8MvQ9fEb@cluster0.dhradlz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
      await client.connect();
      const studentsCollection = client.db("TrendyDice").collection("student");

        //  load all students
        app.get('/student', async(req,res)=>{
            const result = await studentsCollection.find().toArray();
            console.log(result);
            res.send(result);
        })

    } finally {

    }
  }
  run().catch(console.dir);

// server testing
app.get("/", (req, res) => {
    res.send("TrendyDice-Intern server is running");
  });
  
  app.listen(port, () => {
    console.log(
      `TrendyDice-Intern server is listening from the port no : ${port}`
    );
  });