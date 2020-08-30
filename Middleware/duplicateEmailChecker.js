const Contact = require('../Models/contactModel');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  try {
    const contact = await Contact.findOne({ email });
    if (contact)
      return res.status(400).json({
        error: true,
        message: 'Contact with that email already exists.',
        id: contact._id,
      });
    next();
  } catch (error) {
    console.log('from Middleware:::', error);
    res
      .status(400)
      .json({ error: true, message: 'Server Error Try Again Later' });
  }
};
