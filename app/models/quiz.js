const Quiz = require("../schemas/quizSchema"); // Assuming you have the quiz schema in a separate file

const addQuiz = async (title, description,mandatory) => {
  try {
    const quiz = new Quiz({ title, description, mandatory });
    const result = await quiz.save();
    return result;
  } catch (err) {
    return false;
  }
};

const deleteQuiz = async (quizId) => {
  try {
    const result = await Quiz.findByIdAndDelete(quizId);
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getQuizesForAdmin = async () => {
  try {
    const result = await Quiz.find();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

async function addOption(quizId, option) {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          options: {
            option,
            status: false,
          },
        },
      },
      { new: true }
    );
    console.log("quiz", quiz);
    return quiz;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function deleteOption(quizId, option) {
  try {
    const result = await Quiz.findByIdAndUpdate(
      quizId,
      { $pull: { options: { option } } },
      { new: true }
    );
    if (!result) {
      throw new Error("Quiz not found");
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const addCorrectOption = async (quizId, option) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      {
        _id: quizId,
        "options.option": option,
      },
      {
        $set: { "options.$.status": true },
      },
      { new: true }
    );
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getQuizes = async () => {
  try {
    const result = await Quiz.find();
    console.log("result", result);
    function transformData(data) {
      for (let i = 0; i < data.length; i++) {
        const options = data[i].options;
        for (let j = 0; j < options.length; j++) {
          delete options[j].status;
        }
      }
      return data;
    }

    const transformedData = transformData(result); // Output:

    return transformedData;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const submitQuiz = async (data) => {
  try {
    async function checkAnswers(answers) {
      const wrongAnswers = [];
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const quiz = await Quiz.findById(answer._id);
        console.log("answer", quiz);
        if (quiz) {
          const option = quiz.options.find((o) => o.option === answer.answer);
          if (option && !option.status) {
            wrongAnswers.push({
                id: quiz?._id,
                title:quiz.title});
          }
        }
      }

      return wrongAnswers;
    }
    const res = await checkAnswers(data.data);
    return res;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  addQuiz,
  addOption,
  addCorrectOption,
  deleteOption,
  deleteQuiz,
  getQuizesForAdmin,
  getQuizes,
  submitQuiz,
};
