const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  try {
    await mongoose.connect(config.get('atlasUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Atlas!');
  } catch (error) {
    console.log('From Atlas::::', error);
  }
};
