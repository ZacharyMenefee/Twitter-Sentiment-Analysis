const { Component } = require("react");

class Tweet extends Component{
    render(){
        return(
            <div className="Tweet">
                <div className="Tweet-text">{this.props.tweet}</div>
                <div className="Tweet-sentiment">{this.props.sentiment}</div>
                <div className="Tweet-confidence">positive: {this.props.confidence.positive}</div>
                <div className="Tweet-confidence">negative: {this.props.confidence.negative}</div>
                <div className="Tweet-confidence">neutral: {this.props.confidence.neutral}</div>
            </div>
        )
    }
}

export default Tweet;