import { React, Component } from 'react';
import '../styles/SearchBar.css'
import { Navbar, Form, FormControl, Button, Nav} from "react-bootstrap";
class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.results(this.state.value);
    }

    render() {
        return(
            <Navbar className='d-flex flex-row' bg="dark" expand="sm" variant="dark">
                    <Navbar.Brand id='app-name'>Twitter Sentiment Analysis</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id='response-navbar-nav'>
                    <Nav id='search' className='d-flex'>
                    <Form id='search-bar' className='d-flex'>
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.value}
                            type='text'
                            placeholder='Search'
                        />
                        <Button id='submit-btn' onClick={this.handleSubmit} variant="outline-info">
                            Search
                        </Button>
                    </Form>
                    </Nav>
                    </Navbar.Collapse>
                    
            </Navbar>
                
        )
    }
}

export default SearchBar;