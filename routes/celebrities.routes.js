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

// GET celeb detail
router.get("/celebrities/:id", async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    const celebrityDetail = await CelebrityModel.findById(req.params.id);
    console.log(celebrityDetail);
    res.render("celebrities/celebrity-details", { celebrityDetail });
  } catch (error) {
    next(error);
  }
});

// GET - delete
router.get("/celebrities/:id/delete", async (req, res, next) => {
  try {
    await CelebrityModel.findByIdAndRemove(req.params.id);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

// GET - update
router.get("/celebrities/:id/edit", async (req, res, next) => {
  try {
    const celebrityDetail = await CelebrityModel.findById(req.params.id);
    res.render("celebrities/edit-celebrity", { celebrityDetail });
  } catch (error) {
    next(error);
  }
});

// POST - update
router.post("/celebrities/:id/edit", async (req, res, next) => {
  try {
    console.log(req.body);
    await CelebrityModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
