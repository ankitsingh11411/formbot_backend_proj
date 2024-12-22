const Folder = require('../models/Folder');
const Form = require('../models/Form');

const createFolder = async (req, res) => {
  const { name } = req.body;

  try {
    const folder = new Folder({
      name,
      user: req.user,
      forms: [],
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user }).populate('forms');
    res.json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFolder = async (req, res) => {
  const { name } = req.body;

  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    folder.name = name || folder.name;
    await folder.save();
    res.json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    await Form.deleteMany({ _id: { $in: folder.forms } });
    await folder.remove();

    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
};
