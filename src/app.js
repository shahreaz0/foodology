const path = require("path");
const express = require("express");
const recipeRoutes = require("./routes/recipe");

// express configs
const app = express();
app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.static(path.join("public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middlewares
app.use((req, res, next) => {
	res.locals.capitalize = (str) => {
		if (typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	next();
});

// routes
app.get("/", (req, res) => {
	res.redirect("/recipes");
});

app.use(recipeRoutes);

app.get("*", (req, res) => {
	res.render("404", { pageTitle: "404" });
});

// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
