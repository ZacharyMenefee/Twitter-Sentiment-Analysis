const express = require('express');
const config = require('./config');
const cors = require('cors');
const {getTweets, sentimentAnalysis} = require('./middleware')

const app = express();
const PORT = config.web.port;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};


app.get("/", (req, res) => {
  res.status(200).json({ message: 'Hello from Express Server!' });
});

app.post("/post", cors(corsOptions), getTweets, sentimentAnalysis, (req, res) => {
  res.status(200).json(req.storedResults);
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
