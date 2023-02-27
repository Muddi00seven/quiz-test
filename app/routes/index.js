const koaRouter = require("koa-router");
const {
  addQuizController,
  addOptionController,
  deleteOptionController,
  deleteQuizController,
  getQuizesForAdminController,
  addCorrectOptionController,
  getQuizesController,
  submitQuizController,
} = require("../controllers/quiz");

const router = new koaRouter();

//admin routes

router.post("/add-quiz", addQuizController);
router.post("/add-option", addOptionController);
router.post("/delete-option", deleteOptionController);
router.put("/delete-quiz/:id", deleteQuizController);
router.get("/get-admin-quizes", getQuizesForAdminController);
router.post("/add-correct-option", addCorrectOptionController);
router.get("/get-quizes", getQuizesController);
router.post("/submit-quiz", submitQuizController);

module.exports = { router };
