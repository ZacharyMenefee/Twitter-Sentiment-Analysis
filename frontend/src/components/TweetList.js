import { React, Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Tweet from './Tweet';
import { TwitterTweetEmbed} from 'react-twitter-embed';

class TweetList extends Component {
    constructor(props){
        super(props);

        this.state = {tweets: []};

        this.fetchResults = this.fetchResults.bind(this);
    }

    async fetchResults(value) {
        try{
            let res = await axios.post('http://localhost:4000/post', {
                'value': value,
            });
            if (res.status === 200){
                let tweets = res.data;
                this.setState({
                    tweets: [...tweets],
                });
            };
            console.log(this.state.tweets);
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
                <div className='Tweetlist-tweets'>
                    {tweets.map(t => (
                        <div className='Tweetlist-object'>
                        <TwitterTweetEmbed
                            tweetId={t.id}
                        />
                        <Tweet key={t.id}
                        tweet={t.tweet}
                        sentiment={t.sentiment}
                        confidence={t.confidence}
                    
                        />
                        </div>)
                    )}
                </div>
            </div>
        )
    }
}

export default TweetList