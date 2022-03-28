import { React, Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Tweet from './Tweet';
import '../styles/TweetList.css'
import { TwitterTweetEmbed} from 'react-twitter-embed';

class TweetList extends Component {
    constructor(props){
        super(props);

        this.state = {tweets: []};

        this.fetchResults = this.fetchResults.bind(this);
    }

    async fetchResults(value) {
        if(this.state.tweets.length > 0){
            this.setState({tweets: []});
        }
        try{
            let res = await axios.post('/post', {
                'value': value,
            });
            if (res.status === 200){
                let tweets = res.data;
                this.setState({
                    tweets: [...tweets],
                });
            };
        }catch(err){
            alert(err)
            console.log(err)
    }
}

    render() {
        let tweets = this.state.tweets;
        return(
            <div>
                <SearchBar results={this.fetchResults}/>
                <div className='d-flex flex-column Tweetlist-tweets'>
                    {tweets.map(t => (
                        <div className='d-flex justify-content-center Tweetlist-object'>
                        <Tweet className='Tweetlist-scores' key={t.id}
                        tweet={t.tweet}
                        sentiment={t.sentiment}
                        confidence={t.confidence}
                        />
                        <div className='embed-container'>
                        <TwitterTweetEmbed
                            tweetId={t.id}
                        />
                            </div>
                        </div>)
                    )}
                </div>
            </div>
        )
    }
}

export default TweetList