const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-text-analytics');
const { TwitterApi } = require('twitter-api-v2');
const config = require('./config');

const azureClient = new TextAnalyticsClient(
    config.azure.url,
    new AzureKeyCredential(config.azure.key),
);
  
const twitterClient = new TwitterApi(config.twitter.token);

module.exports.getTweets = (req, res, next) => {
    const tweets = [
        {
          id: '1500968794532970499',
          text: 'RT @IAPonomarenko: 3,000 American applications to join Ukraine’s International Legion 🔥🔥🔥',
        },
        {
          id: '1500968794293870592',
          text:
            'RT @ChristopherJM: Day 12 of Russia’s full-on invasion of Ukraine. Where’s President Zelensky?\n'
            + '\n'
            + 'I’m staying in Kyiv. In my office. I’m not…',
        },
        {
          id: '1500968794277105664',
          text: '@Locke81546770 @RealCandaceO The Ukraine wouldn’t qualify as a NATO country yet, due to its contested state.',
        },
        {
          id: '1500968794067554307',
          text: 'RT @morcos_pierre: I think Ukraine will win. Because Russia is completely isolated. Because we have taken considerable sanctions. The pric…',
        },
        {
          id: '1500968794038095876',
          text: 'RT @IAPonomarenko: Russians reportedly demand that Ukraine reduces its military to just 60,000 men (as part of a peace deal), and the 72nd…',
        },
        {
          id: '1500968793924853762',
          text: 'RT @monicagrau: My mom is looking for her friend Maria from Ukraine. I have told her it is impossible to find her having just a picture. Sh…',
        },
        {
          id: '1500968793853632515',
          text: `@RBReich There's no "sovereign democracy" in Ukraine and hasn't been since 2014. Please stop. Options are 1. WW III w/ nuclear power 2. forever war by proxy that destroys Ukaine or 3. diplomatic solution/peace. https://t.co/xUx5G4CFNt https://t.co/DI2e9puMyj`,
        },
        {
          id: '1500968793845026820',
          text: 'RT @BarnettforAZ: Putin keeps talking about Ukraine’s neo Nazis but our media ignores it. Will we get the truth?',
        },
        {
          id: '1500968793593552900',
          text: 'RT @CalltoActivism: BREAKING: Jailed Kremlin critic Alexei Navalny urges Russians to protest against the war in Ukraine in Russian cities a…',
        },
        {
          id: '1500968793564188676',
          text: 'RT @TheRickyDavila: As Putin’s Russia destroys Ukraine and murders its civilians, always keep in mind that the orange criminal who is the f…',
        },
      ];
    req.tweets = tweets;
    next();
}

module.exports.sentimentAnalysis = async (req,res, next) => {
    const textDocumentInputs = req.tweets;
    const results = await azureClient.analyzeSentiment(textDocumentInputs);
    const storedResults = [];

    for (const result of results) {
        if (result.error === undefined) {
          storedResults.push([result.sentiment, result.confidenceScores]);
        } else {
          console.error("Encountered an error:", result.error);
        }
      }
    req.storedResults = storedResults;
    next();
}