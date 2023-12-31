import AnswerModal from "../Models/AnswerModal.js";
import QuestionModel from "../Models/QuestionModel.js";
import quizModel from "../Models/quizModel.js";


export const createQuestion = async (req, res) => {
  try {
    const { category, categoryImg, question, opt1, opt2, opt3, opt4, answer } =
      req.body.questionData;
    const result = await quizModel.findOne({ category: category });
    const element = new QuestionModel({
      question,
      opt1,
      opt2,
      opt3,
      opt4,
      answer,
      category,
    });
    if (!result) {
      const quiz = new quizModel({
        category,
        categoryImg,
        userId: req.userId,
      });
      await quiz.save();
    }
    await element.save();
    return res.status(200).json({ success: true, message: "quiz created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const GetCategories = async (req, res) => {
  try {
    const allCategory = await quizModel.find({});
    return res.json({ success: true, category: allCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

export const getData = async (req, res) => {
  try {
    const { page, limit = 1, category } = req.body;
    if (!page || !category)
      return res.status(404).json({ success: false, message: error.message });

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const catData = await QuestionModel.find({ category: category })
      .skip(skip)
      .limit(limitValue);
    if (catData) {
      return res.status(200).json({ success: true, result: catData });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const categoryQuestions = async (req, res) => {
  try {
    const { category } = req.body;
    const questions = await QuestionModel.find({ category: category });
    return res.status(200).json({ success: true, questions });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const checkAnswer = async (req, res) => {
  try {
    const { loggedUserId, questionId, submittedAnswer } = req.body;
    if (!loggedUserId || !questionId || !submittedAnswer)
      return res.status(404).json({ success: false, message: "Data missing" });
    const answers = new AnswerModal({
      loggedUserId,
      questionId,
      submittedAnswer,
    });
    await answers.save();
    return res.status(200).json({ success: true, answers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnswerByUser = async (req, res) => {
  try {
    const answer = await AnswerModal.find({ userId: req.userId });
    return res.status(200).json({ success: true, answer });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

