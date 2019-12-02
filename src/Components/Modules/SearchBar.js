import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' }
    }
    
    static defaultProps = {
        placeholder: 'Search...'
    };

    formSubmit = (event) => {
        event.preventDefault();

        // Callback prop
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <form onSubmit = {this.formSubmit}>
                <input
                    type = "text"
                    className = "form-group form-control"
                    placeholder = {this.props.placeholder}
                    value = {this.state.term}
                    onChange = {e => this.setState({ term: e.target.value })}
                />
            </form>
        );
    }
}