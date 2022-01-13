// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("./../models/Movie.model");

// all your routes here

// GET show all movies *STEP0
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await MovieModel.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    next(error);
  }
});

// GET create one movie with form *STEP1-1
router.get("/movies/create", async (req, res, next) => {
  const celebrities = await CelebrityModel.find();
  res.render("movies/new-movie", { celebrities });
});

// POST add one movie on mongoose *STEP2-1
router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await MovieModel.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET movie detail
router.get("/movies/:id", async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    const movieDetail = await MovieModel.findById(req.params.id).populate(
      "cast"
    );
    // console.log(movieDetail);
    res.render("movies/movie-details", { movieDetail });
  } catch (error) {
    next(error);
  }
});

// GET - delete
router.get("/movies/:id/delete", async (req, res, next) => {
  try {
    await MovieModel.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET - update
router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const celebrities = await CelebrityModel.find();
    const movieDetail = await MovieModel.findById(req.params.id);
    res.render("movies/edit-movie", { movieDetail, celebrities });
  } catch (error) {
    next(error);
  }
});

// POST - update
router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    console.log(req.body);
    await MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
