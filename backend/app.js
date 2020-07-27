const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');
var connectDB = require('./models/Connection');

connectDB();

app.use(express.json({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter);

const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started;"))
