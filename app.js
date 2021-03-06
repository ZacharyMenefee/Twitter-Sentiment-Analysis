if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

const express = require('express');
const path = require('path');
const cors = require('cors');
const {getTweets, sentimentAnalysis} = require('./middleware.js');
// const { userValidationRules, validate } = require('./validator.js')

const app = express();

app.use(express.static(path.resolve(__dirname, './frontend/build')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.post("/post", cors(corsOptions), getTweets, sentimentAnalysis, (req, res) => {
  res.status(200).json(req.storedResults);
});

app.get('*', cors(corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname+'./frontend/build/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
