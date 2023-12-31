const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ztxo0js.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("connectedLearning").collection("users");
    const bookingCollection = client
      .db("connectedLearning")
      .collection("bookings");
    const courseCollection = client
      .db("connectedLearning")
      .collection("courses");

    // get all users
    app.get("/users", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });
    // users create
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.status(400).send({ message: "User already exists!" });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });

    // get all course
    app.get("/courses", async (req, res) => {
      const result = await courseCollection.find({}).toArray();
      res.send(result);
    });
    // courses add
    app.post("/courses", async (req, res) => {
      const course = req.body;
      const result = await courseCollection.insertOne(course);
      res.send(result);
    });

    // get all courses
    app.get("/bookings", async (req, res) => {
      const result = await bookingCollection.find({}).toArray();
      res.send(result);
    });
    // booking
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("connected learning server is running.....");
});
app.listen(port, () => {
  console.log(`connected learning server is running on PORT ${port}`);
});
