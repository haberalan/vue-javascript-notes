const Notes = require('../models/notesModel');

const getOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const note = await Notes.findOne({ _id: id, user_id });

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMany = async (req, res) => {
  const user_id = req.user._id;

  try {
    const notes = await Notes.find({ user_id }).sort({ updatedAt: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createOne = async (req, res) => {
  const user_id = req.user._id;
  const { title, text } = req.body;

  try {
    const note = await Notes.createOne(title, text, user_id);

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    const note = await Notes.updateOne(title, text, id, user_id);

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const note = await Notes.deleteOne(id, user_id);

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getOne, getMany, createOne, updateOne, deleteOne };
