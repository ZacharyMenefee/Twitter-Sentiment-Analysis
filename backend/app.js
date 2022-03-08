const express = require('express');
const config = require('./config')
const {getTweets, sentimentAnalysis} = require('./middleware')

const app = express();
const PORT = config.web.port;

app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.status(200).json({ message: 'Hello from Express Server!' });
});

app.post("/find", getTweets, sentimentAnalysis, (req, res) => {
  res.status(200).json(req.storedResults);
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
