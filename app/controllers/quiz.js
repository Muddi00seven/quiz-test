const {
  addQuiz,
  addOption,
  addCorrectOption,
  deleteOption,
  deleteQuiz,
  getQuizesForAdmin,
  getQuizes,
  submitQuiz,
} = require("../models/quiz");

const addQuizController = async (ctx) => {
  try {
    const { title, description, mandatory } = ctx.request.body;
    const result = await addQuiz(title, description, mandatory);
    if (!result) throw "Error";
    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const deleteQuizController = async (ctx) => {
  try {
    const { id } = ctx.request.params;
    console.log("quizId", id);
    const result = await deleteQuiz(id);
    if (!result) throw "Quiz Id not found";

    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "success",
      data: null,
      error: [101],
    };
  }
};

const addOptionController = async (ctx) => {
  const { quizId, option } = ctx.request.body;

  try {
    const result = await addOption(quizId, option);
    if (!result) throw "Quiz Id not found";

    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const deleteOptionController = async (ctx) => {
  const { quizId, option } = ctx.request.body;

  try {
    const result = await deleteOption(quizId, option);
    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const addCorrectOptionController = async (ctx) => {
  const { quizId, option } = ctx.request.body;

  try {
    const result = await addCorrectOption(quizId, option);
    if (!result) throw "quiz not found";
    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const getQuizesForAdminController = async (ctx) => {
  try {
    const result = await getQuizesForAdmin();
    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const getQuizesController = async (ctx) => {
  try {
    const result = await getQuizes();
    ctx.body = {
      response: "success",
      data: result,
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

const submitQuizController = async (ctx) => {
  try {
    const data = ctx.request.body;

    const result = await submitQuiz(data);
    ctx.body = {
      response: "success",
      data: { wrongAnswer: result },
      error: null,
    };
  } catch (err) {
    console.error(err);
    ctx.body = {
      response: "Failed",
      data: null,
      error: [101],
    };
  }
};

module.exports = {
  addQuizController,
  addOptionController,
  addCorrectOptionController,
  deleteOptionController,
  deleteQuizController,
  getQuizesForAdminController,
  getQuizesController,
  submitQuizController,
};
