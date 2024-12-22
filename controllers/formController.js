const Form = require('../models/Form');
const Folder = require('../models/Folder');

const createForm = async (req, res) => {
  const { title, elements, folderId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    const newForm = new Form({
      title,
      folder: folderId,
      elements,
    });

    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFormsInFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    const forms = await Form.find({ folder: folderId });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateForm = async (req, res) => {
  const { formId } = req.params;
  const { title, elements } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { title, elements },
      { new: true }
    );
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteForm = async (req, res) => {
  const { formId } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createForm,
  getFormsInFolder,
  updateForm,
  deleteForm,
};
