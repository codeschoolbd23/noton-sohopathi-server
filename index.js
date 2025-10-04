const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("নতুন সহপাঠি সার্ভার চলমান!");
});
const password = encodeURIComponent(`${process.env.DB_PASS}`);
const user = encodeURIComponent(`${process.env.DB_USER}`);
const uri = `mongodb+srv://${user}:${password}@sohopathicluster.kwnsrvo.mongodb.net/?retryWrites=true&w=majority&appName=SohopathiCluster`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const database = client.db("sohopathi");
    const library = database.collection("library");
    const questionpaper = database.collection("questionpaper");
    const profileCollection = database.collection("profileData");
    const lecturesheet = database.collection("lecturesheet");
    /*Library section*/ 
    app.get("/library", async (req, res) => {
      const query = {};
      const cursor = library.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.delete("/library", async (req, res) => {
      const query = {};

      const result = await library.deleteMany(query);
      res.send(result);
    });
    app.delete("/library/:email", async (req, res) => {
      const query = req.body.userEmail;
      console.log(params);
      const result = await library.deleteMany(query);
      res.send(result);
    });
    app.get("/library/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await library.findOne(query);
      res.send(result);
    });
    app.delete("/library/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await library.deleteOne(query);
      res.send(result);
    });
    app.post("/library", async (req, res) => {
      const user = req.body;
      const result = await library.insertOne(user);
      console.log(result);
      res.send(result);
    });
    app.patch("/library/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const information = req.body;
      const updatePostData = {
        $set: {
          id: information.id,
          uid: information.uid,
          userClass: information.userClass,
          bookName: information.bookName,
          version: information.version,
          viewLink: information.viewLink,         
          author: information.author,
          session: information.session
        },
      };
      const result = await library.updateOne(filter, updatePostData);
      res.send(result);
    });

    /*Lecturesheet section*/ 
    app.get("/lecturesheet", async (req, res) => {
      const query = {};
      const cursor = lecturesheet.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.delete("/lecturesheet", async (req, res) => {
      const query = {};

      const result = await lecturesheet.deleteMany(query);
      res.send(result);
    });
    app.delete("/lecturesheet/:email", async (req, res) => {
      const query = req.body.userEmail;
      console.log(params);
      const result = await lecturesheet.deleteMany(query);
      res.send(result);
    });
    app.get("/lecturesheet/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await lecturesheet.findOne(query);
      res.send(result);
    });
    app.delete("/lecturesheet/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await lecturesheet.deleteOne(query);
      res.send(result);
    });
    app.post("/lecturesheet", async (req, res) => {
      const user = req.body;
      const result = await lecturesheet.insertOne(user);
      console.log(result);
      res.send(result);
    });
    app.patch("/lecturesheet/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const information = req.body;
      const updatePostData = {
        $set: {
          id: information.id,
          uid: information.uid,
          userClass: information.userClass,
          bookName: information.bookName,
          version: information.version,
          viewLink: information.viewLink,
          author: information.author,
          session: information.session,
        },
      };
      const result = await lecturesheet.updateOne(filter, updatePostData);
      res.send(result);
    });

    /*Question paper section*/ 
    app.get("/questionpaper", async (req, res) => {
      const query = {};
      const cursor = questionpaper.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.delete("/questionpaper", async (req, res) => {
      const query = {};

      const result = await questionpaper.deleteMany(query);
      res.send(result);
    });
    app.delete("/questionpaper/:email", async (req, res) => {
      const query = req.body.userEmail;
      console.log(params);
      const result = await questionpaper.deleteMany(query);
      res.send(result);
    });
    app.get("/questionpaper/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await questionpaper.findOne(query);
      res.send(result);
    });
    app.delete("/questionpaper/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await questionpaper.deleteOne(query);
      res.send(result);
    });
    app.post("/questionpaper", async (req, res) => {
      const user = req.body;
      const result = await questionpaper.insertOne(user);
      console.log(result);
      res.send(result);
    });
    app.patch("/questionpaper/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const information = req.body;
      const updatePostData = {
        $set: {
          id: information.id,
          uid: information.uid,
          userClass: information.userClass,
          bookName: information.bookName,
          version: information.version,
          viewLink: information.viewLink,
          author: information.author,
          session: information.session,
        },
      };
      const result = await questionpaper.updateOne(filter, updatePostData);
      res.send(result);
    });

    // user profile data
    app.get("/profile", async (req, res) => {
      const query = {};
      const cursor = profileCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await profileCollection.findOne(query);
      res.send(result);
    });
    app.delete("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await profileCollection.deleteOne(query);
      res.send(result);
    });
    app.post("/profile", async (req, res) => {
      const user = req.body;
      const result = await profileCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });
    app.patch("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const information = req.body;
      const updateProfileData = {
        $set: {
          linkedin: information.linkedin,
          instagram: information.instagram,
          contact: information.contact,
          whatsapp: information.whatsapp,
          facebook: information.facebook,
          youtube: information.youtube,
          twitter: information.twitter,
          website: information.website,
          github: information.github,
          user: information.user,
          email: information.email,
          uid: information.uid,
          photo: information.photo,
        },
      };
      const result = await profileCollection.updateOne(
        filter,
        updateProfileData
      );
      res.send(result);
    });
  } finally {
    // await client.close();
    app.get("/*", async (req, res) => {
      res.send("সহপাঠি সার্ভারে আপনি যেটা খুজচ্ছেন, হয়তু সেটা ডেভেলপ হচ্ছে!");
    });
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`নতুন সহপাঠি সার্ভার চলমান পোর্ট= ${port}`);
});
