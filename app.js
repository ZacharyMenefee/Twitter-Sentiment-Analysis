const express = require('express');
const path = require('path');
const cors = require('cors');
const {getTweets, sentimentAnalysis} = require('./middleware')
// const { userValidationRules, validate } = require('./validator.js')

const app = express();
const PORT = process.env.PORT || 4000;

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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
