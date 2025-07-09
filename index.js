// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
// env config
dotenv.config();

// app instance
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = process.env.MONGO_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
 const parcelCollection = client.db('parcelDB').collection('parcels');


  // ✅ POST API: Create Parcel
  app.post('/parcels', async (req, res) => {
    const newParcel = req.body;
    const result = await parcelCollection.insertOne(newParcel);
    res.send(result);
  });

  // ✅ GET API: All Parcels
  app.get('/parcels', async (req, res) => {
    const parcels = await parcelCollection.find().toArray();
    res.send(parcels);
  });










  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





// simple route
app.get('/', (req, res) => {
  res.send('Parcel Tracker Server is running!');
});

// start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
