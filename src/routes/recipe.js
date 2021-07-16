const router = require("express").Router();
const { fetchRecipe, getRecipeDetails } = require("../api/recipe");

// routes
router.get("/recipes", async (req, res) => {
	try {
		const data = await fetchRecipe(req.query.q);
		res.render("recipes/index", {
			pageTitle: "Search Recipes",
			queryStr: req.query.q,
			recipes: data,
		});
	} catch (error) {
		res.render("404", { pageTitle: "404", error });
	}
});

router.get("/recipes/:id", async (req, res) => {
	try {
		const data = await getRecipeDetails(req.params.id);
		res.render("recipes/show", {
			pageTitle: "Recipe",
			data,
		});
	} catch (error) {
		res.render("404", { pageTitle: "404", error });
	}
});

module.exports = router;