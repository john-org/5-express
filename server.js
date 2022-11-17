const express = require("express");
const mongoose = require("mongoose");
const recipeControllers = require("./api/recipe.controllers");

const fileUpload = require("express-fileupload");

const app = express();

const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017";

// our first route
// app.get("/", function (req, res) {
//   res.send("Hello from the backend.");
// });

// our second route
// app.get("/music", function (req, res) {
//   res.send(`
//       <h1>music</h1>
//       <p>Commentary on Music will go here.</p>
//       `);
// });

// our second route with variable parameter
// app.get("/music/:type", function (req, res) {
//   let type = req.params.type;
//   res.send(`
//       <h1>Music - ${type.toUpperCase()}</h1>
//       <p>Commentary on ${type} music will go here.</p>
//       `);
// });

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// in recipe.model
// const RecipeSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: String,
// });

// const Recipe = mongoose.model("Recipe", RecipeSchema);

// Index.html entry
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/static/index.html");
// });

// Middleware (app.use)
// Specify where the 'static' folder is
app.use(express.static("public"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// Display Recipes
// Using the one below
// app.get("/api/recipes", function (req, res) {
//   Recipe.find({}, function (err, results) {
//     return res.send(results);
//   });
// });

app.get("/api/recipes", recipeControllers.findAll);
app.get("/api/recipes/:id", recipeControllers.findById);
app.post("/api/recipes", recipeControllers.add);
app.put("/api/recipes/:id", recipeControllers.update);
app.delete("/api/recipes/:id", recipeControllers.delete);
app.get("/api/import", recipeControllers.import);
app.get("/api/killall", recipeControllers.killall);

app.post("/api/upload", recipeControllers.upload);

// Pass some data to the database using model.create(), a shortcut for saving one or more documents to the database:
// app.get("/api/import", (req, res) => {
//   Recipe.create(
//     {
//       title: "Lasagna",
//       description:
//         "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
//       image: "lasagna.png",
//     },
//     {
//       title: "Pho-Chicken Noodle Soup",
//       description:
//         'Pho (pronounced "fuh") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
//       image: "pho.png",
//     },
//     {
//       title: "Guacamole",
//       description:
//         "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
//       image: "guacamole.png",
//     },
//     {
//       title: "Hamburger",
//       description:
//         "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
//       image: "hamburger.png",
//     },
//     function (err) {
//       if (err) return console.log(err);
//       return res.sendStatus(201);
//     }
//   );
// });

// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
