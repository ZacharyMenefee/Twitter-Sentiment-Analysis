
import { React, Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {value: '', message: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try{
            let res = await axios.post('http://localhost:4000/post', {
                'value': this.state.value
            })
            
            if (res.status === 200){
                console.log(res);
        }
        }catch(err){
            console.log(err)
    }
}

    render() {
        return(
            <div>
            <h1>Twitter Sentiment Analysis</h1>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit"/>
            </form>
            </div>
        )
    }
}

export default SearchBar;