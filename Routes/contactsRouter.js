const express = require('express');
const router = express.Router();
const Contact = require('../Models/contactModel');
const duplicateEmailChecker = require('../Middleware/duplicateEmailChecker');

router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find();
    const total = await Contact.find().countDocuments();
    res.status(200).json({ error: false, contacts, total });
  } catch (error) {
    console.log('From get All::::', error);
    res
      .status(400)
      .json({ error: true, message: 'Server Issue, Try again later.' });
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Contact.find().countDocuments();
    res.status(200).json({ error: false, total });
  } catch (error) {
    console.log('From get All::::', error);
    res
      .status(400)
      .json({ error: true, message: 'Server Issue, Try again later.' });
  }
});

router.get('/single/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact)
      return res
        .status(400)
        .json({ error: true, message: 'Contact ID not Found in Database' });
    res.status(200).json({ error: false, contact });
  } catch (error) {
    console.log('From get Single::::', error);
    res.status(400).json({
      error: true,
      message: 'Server Issue or Invalid ID sent, Try again.',
    });
  }
});

router.post('/add', duplicateEmailChecker, async (req, res) => {
  try {
    await Contact.create(req.body);
    const contacts = await Contact.find();
    const total = await Contact.find().countDocuments();
    res.status(200).json({ error: false, contacts, total });
  } catch (error) {
    console.log('From get Add::::', error);
    res.status(400).json({ error: true, message: error.message });
  }
});

router.post('/update', async (req, res) => {
  const { _id } = req.body;
  try {
    const current = await Contact.findById(_id);
    if (!current)
      return res
        .json(400)
        .json({ error: true, message: 'Could not find a contact to update' });
    await Contact.findOneAndUpdate({ _id }, req.body, {
      useFindAndModify: false,
      runValidators: true,
    });
    const contacts = await Contact.find();
    res.status(200).json({ error: false, contacts });
  } catch (error) {
    console.log('From get Update::::', error);
    res.status(400).json({
      error: true,
      message: error.message,
      _id,
    });
  }
});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact)
      return res
        .status(400)
        .json({ error: true, message: 'Could not find contact to delete.' });
    await Contact.findByIdAndRemove(id, { useFindAndModify: false });
    const contacts = await Contact.find();
    const total = await Contact.find().countDocuments();
    res.status(200).json({ error: false, contacts, total });
  } catch (error) {
    console.log('From get Delete::::', error);
    res.status(400).json({
      error: true,
      message: 'Server Issue, Or invalid ID, Try Again.',
    });
  }
});

module.exports = router;
