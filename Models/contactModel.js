const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const validateEmail = (email) => emailRegex.test(email);

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Must Enter First Name'],
    lowercase: true,
    minlength: [2, 'Name too Short'],
    maxlength: [15, 'Name too Long'],
  },
  lastName: {
    type: String,
    required: [true, 'Must Enter Last Name'],
    lowercase: true,
    maxlength: [15, 'Last Name too Long'],
  },
  email: {
    type: String,
    required: [true, 'Must Enter Email Address'],
    trim: true,
    lowercase: true,
    validate: [
      validateEmail,
      'Please use a valid Email Address user@domainname.TLD',
    ],
  },
  phone: {
    type: String,
    minlength: [11, 'Invalid Phone Number'],
    required: true,
  },
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
