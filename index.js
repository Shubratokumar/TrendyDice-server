const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
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
        app.get('/student', async(req,res) => {
          const limit = Number(req.query.limit);
          const pageNumber = Number(req.query.pageNumber);
          const result = await studentsCollection.find().skip(limit*pageNumber).limit(limit).toArray();

          const count = await studentsCollection.estimatedDocumentCount();

          res.send({ data: result, count });
        })

        app.put("/student/:id", async(req, res) => {
          const id = req.params.id;
          const paidStatus = req.body;
          const filter = { _id: ObjectId(id) };
          const options = { upsert: true };
          const updatedDoc = {
            $set:  paidStatus
          }
          const paymentStatus = await studentsCollection.updateOne(filter, updatedDoc, options);
          res.send(paymentStatus);
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