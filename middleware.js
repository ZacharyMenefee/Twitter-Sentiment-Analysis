const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const { TwitterApi } = require('twitter-api-v2');
const ExpressError = require('./utils/ExpressError');
const config = require('./config');
const { body, validationResult } = require('express-validator');

const azureClient = new TextAnalyticsClient(config.azure.url, new AzureKeyCredential(config.azure.key));
const twitterClient = new TwitterApi(config.twitter.token);


// module.exports.userValidationRules = () => {
//   return [
//     body('value').isAlpha().isLength({ min: 1}),
//   ]
// }

// module.exports.validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if(errors.isEmpty()){
//     return next()
//   }

//   const extractedErrors = []
//   errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

//   return res.status(422).json({
//     errors: extractedErrors,
//   })
// }

module.exports.getTweets = async (req, res, next) => {
    const value = req.body.value;
    const searchObject = await twitterClient.v2.search(`${value}  lang:en -is:retweet`);
    const tweets = searchObject.tweets;
    req.tweets = tweets;
    next();
}

module.exports.sentimentAnalysis = async (req, res, next) => {
    const textDocumentInputs = req.tweets;
    const results = await azureClient.analyzeSentiment(textDocumentInputs);
    const storedResults = [];

    for (const [i, result] of results.entries()) {
        if (result.error === undefined) {
          storedResults.push({id: req.tweets[i].id, tweet: req.tweets[i].text, sentiment: result.sentiment, confidence: result.confidenceScores});
        } else {
          console.error("Encountered an error:", result.error);
        }
      }
    req.storedResults = storedResults;
    next();
}