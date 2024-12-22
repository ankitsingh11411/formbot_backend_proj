const Response = require('../models/Response');
const Form = require('../models/Form');

const createResponse = async (req, res) => {
  const { formId } = req.params;
  const { answers, user } = req.body;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const newResponse = new Response({
      form: formId,
      answers,
      user,
    });

    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllResponsesForForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const responses = await Response.find({ form: formId });
    if (!responses) {
      return res
        .status(404)
        .json({ message: 'No responses found for this form' });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getResponseById = async (req, res) => {
  const { responseId } = req.params;

  try {
    const response = await Response.findById(responseId);
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createResponse,
  getAllResponsesForForm,
  getResponseById,
};
