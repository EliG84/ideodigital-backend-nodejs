const express = require('express');
const cors = require('cors');
const atlasConnect = require('./Atlas/atlasConnect');

const port = process.env.PORT || 3001;
const app = express();

atlasConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const contactsRouter = require('./Routes/contactsRouter');

app.use('/contacts', contactsRouter);

app.listen(port, () => {
  console.log(`node connected on port ${port}`);
});
