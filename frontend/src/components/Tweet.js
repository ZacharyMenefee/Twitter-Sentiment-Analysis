import '../styles/Tweet.css'
import Accordion from 'react-bootstrap/Accordion'
import { Component } from 'react';

class Tweet extends Component{

    getEmoji(){
        if(this.props.sentiment === 'positive'){
            return 'em em-smiley';
        }else if (this.props.sentiment === 'negative'){
            return 'em em-angry';
        }else {
            return 'em em-neutral_face';
        }
    }
    render(){
        return(
            <div className="Tweet d-flex flex-column align-items-center justify-content-center">
                    <h2>Overall Sentiment</h2>
                    <i id='icon' className={this.getEmoji()}/>
                <Accordion eventKey='0'>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Show Detailed Results </Accordion.Header>
                    <Accordion.Body>
                            <div>Positive: {this.props.confidence.positive}</div>
                            <div>Negative: {this.props.confidence.negative}</div>
                            <div>Neutral: {this.props.confidence.neutral}</div>
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        )
    }
}

export default Tweet;