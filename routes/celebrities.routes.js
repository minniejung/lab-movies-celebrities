// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("./../models/Celebrity.model");

// all your routes here

// GET show all celebrities *STEP0
router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await CelebrityModel.find();
    res.render("celebrities/celebrities", {
      celebrities,

      // same as
      // res.render("celebrities/celebrities", {
      //   celebrities: await CelebrityModel.find(),
      // });

    });
  } catch (error) {
    next(error);
  }
});

// GET create one celebrity with form *STEP1-1
router.get("/celebrities/create", async (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

// POST add one celebrity on mongoose *STEP2-1
router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    console.log(req.body);
    await CelebrityModel.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
    next(error);
  }
});

module.exports = router;
